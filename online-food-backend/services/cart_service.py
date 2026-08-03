"""
Cart service for business logic related to carts
"""
from uuid import UUID
from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException, status

from models.carts import Cart
from models.Carts_Items import CartItem
from models.menu_items import MenuItem
from schemas.carts import CartCreate, CartUpdate
from schemas.cart_items import CartItemCreate


def get_cart_by_user_id(db: Session, user_id: UUID) -> Cart:
    """Get cart by user ID with all cart items loaded."""
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found for this user"
        )
    return cart


def create_cart_for_user(db: Session, user_id: UUID) -> Cart:
    """Create a new cart for a user."""
    # Check if cart already exists
    existing_cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if existing_cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a cart"
        )
    
    cart = Cart(user_id=user_id, total_amount=0.0)
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart


def add_item_to_cart(
    db: Session, 
    cart_id: UUID, 
    item_id: UUID, 
    quantity: int = 1,
    notes: str = None
) -> CartItem:
    """Add an item to the cart or update quantity if it already exists."""
    cart = db.get(Cart, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found"
        )
    
    # Check if item already in cart
    existing_item = db.query(CartItem).filter(
        CartItem.cart_id == cart_id,
        CartItem.menu_item_id == item_id
    ).first()
    
    if existing_item:
        # Update quantity
        existing_item.quantity += quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item
    else:
        # Create new cart item
        menu_item = db.get(MenuItem, item_id)
        if not menu_item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Menu item not found"
            )
        
        cart_item = CartItem(
            cart_id=cart_id,
            menu_item_id=item_id,
            quantity=quantity,
            unit_price=menu_item.price,
            notes=notes
        )
        db.add(cart_item)
        db.commit()
        db.refresh(cart_item)
        
        # Update cart total
        update_cart_total(db, cart_id)
        return cart_item


def update_cart_item_quantity(
    db: Session,
    cart_item_id: UUID,
    quantity: int
) -> CartItem:
    """Update the quantity of a cart item."""
    if quantity <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quantity must be greater than 0"
        )
    
    cart_item = db.get(CartItem, cart_item_id)
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )
    
    cart_item.quantity = quantity
    db.commit()
    db.refresh(cart_item)
    
    # Update cart total
    update_cart_total(db, cart_item.cart_id)
    return cart_item


def remove_item_from_cart(db: Session, cart_item_id: UUID) -> bool:
    """Remove an item from the cart."""
    cart_item = db.get(CartItem, cart_item_id)
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found"
        )
    
    cart_id = cart_item.cart_id
    db.delete(cart_item)
    db.commit()
    
    # Update cart total
    update_cart_total(db, cart_id)
    return True


def update_cart_total(db: Session, cart_id: UUID) -> float:
    """Recalculate and update the cart total amount."""
    cart = db.get(Cart, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found"
        )
    
    cart_items = db.query(CartItem).filter(CartItem.cart_id == cart_id).all()
    total = sum(item.unit_price * item.quantity for item in cart_items)
    
    cart.total_amount = total
    db.commit()
    db.refresh(cart)
    return total


def clear_cart(db: Session, cart_id: UUID) -> bool:
    """Clear all items from the cart."""
    cart = db.get(Cart, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart not found"
        )
    
    # Delete all cart items
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    
    # Update cart total
    cart.total_amount = 0.0
    db.commit()
    return True
