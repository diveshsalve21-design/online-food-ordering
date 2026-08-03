"""
Order service for business logic related to orders
"""
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models.Orders import Order
from models.Order_items import OrderItem
from models.carts import Cart
from models.Carts_Items import CartItem
from models.payments import Payment
from models.Enums import OrderStatus, PaymentStatus


def create_order_from_cart(
    db: Session,
    user_id: UUID,
    cart_id: UUID,
    delivery_address_id: UUID = None,
    payment_method: str = "CASH_ON_DELIVERY",
    notes: str = None
) -> Order:
    """Create an order from the cart contents."""
    # Get cart and verify it belongs to user
    cart = db.get(Cart, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found"
        )
    
    if cart.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cart does not belong to this user"
        )
    
    # Get cart items
    cart_items = db.query(CartItem).filter(CartItem.cart_id == cart_id).all()
    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty"
        )
    
    # Calculate total amount
    total_amount = sum(item.unit_price * item.quantity for item in cart_items)
    
    # Create order
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        status=OrderStatus.PENDING,
        payment_method=payment_method,
        delivery_address_id=delivery_address_id,
        notes=notes
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    
    # Create order items from cart items
    for cart_item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=cart_item.menu_item_id,
            quantity=cart_item.quantity,
            unit_price=cart_item.unit_price,
            notes=cart_item.notes
        )
        db.add(order_item)
    
    db.commit()
    
    # Clear the cart
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    cart.total_amount = 0.0
    db.commit()
    
    return order


def get_order_by_id(db: Session, order_id: UUID, user_id: UUID = None) -> Order:
    """Get order by ID with optional user verification."""
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    if user_id and order.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this order"
        )
    
    return order


def update_order_status(
    db: Session,
    order_id: UUID,
    new_status: OrderStatus,
    user_id: UUID = None
) -> Order:
    """Update the status of an order."""
    order = get_order_by_id(db, order_id, user_id)
    
    # Validate status transitions
    valid_transitions = {
        OrderStatus.PENDING: [OrderStatus.ACCEPTED, OrderStatus.CANCELLED],
        OrderStatus.ACCEPTED: [OrderStatus.PREPARING],
        OrderStatus.PREPARING: [OrderStatus.READY],
        OrderStatus.READY: [OrderStatus.OUT_FOR_DELIVERY],
        OrderStatus.OUT_FOR_DELIVERY: [OrderStatus.DELIVERED],
    }
    
    if order.status in valid_transitions:
        if new_status not in valid_transitions[order.status]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot transition from {order.status.value} to {new_status.value}"
            )
    
    order.status = new_status
    if new_status == OrderStatus.DELIVERED:
        order.delivered_at = datetime.utcnow()
    
    db.commit()
    db.refresh(order)
    return order


def cancel_order(db: Session, order_id: UUID, user_id: UUID = None) -> Order:
    """Cancel an order."""
    order = get_order_by_id(db, order_id, user_id)
    
    if order.status not in [OrderStatus.PENDING, OrderStatus.ACCEPTED]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order can only be cancelled in PENDING or ACCEPTED status"
        )
    
    order.status = OrderStatus.CANCELLED
    db.commit()
    db.refresh(order)
    return order


def get_orders_by_user(db: Session, user_id: UUID, skip: int = 0, limit: int = 100) -> list:
    """Get all orders for a specific user."""
    return db.query(Order).filter(
        Order.user_id == user_id
    ).order_by(
        Order.created_at.desc()
    ).offset(skip).limit(limit).all()


def get_all_orders(db: Session, skip: int = 0, limit: int = 100) -> list:
    """Get all orders (admin only)."""
    return db.query(Order).order_by(
        Order.created_at.desc()
    ).offset(skip).limit(limit).all()
