"""
Payment service for business logic related to payments
"""
from uuid import UUID
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models.payments import Payment
from models.Orders import Order
from models.Enums import PaymentStatus, PaymentMethod


def create_payment(
    db: Session,
    order_id: UUID,
    payment_method: str,
    amount: float,
    user_id: UUID = None
) -> Payment:
    """Create a new payment record."""
    # Verify order exists and belongs to user
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    if user_id and order.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to make payment for this order"
        )
    
    # Check if payment already exists for this order
    existing_payment = db.query(Payment).filter(Payment.order_id == order_id).first()
    if existing_payment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment already exists for this order"
        )
    
    # Create payment
    payment = Payment(
        order_id=order_id,
        amount=amount,
        method=payment_method,
        status=PaymentStatus.PENDING
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment


def process_payment(
    db: Session,
    payment_id: UUID,
    success: bool = True,
    transaction_id: str = None
) -> Payment:
    """Process a payment (simulate payment gateway response)."""
    payment = db.get(Payment, payment_id)
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    if payment.status != PaymentStatus.PENDING:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Payment already processed with status: {payment.status.value}"
        )
    
    # Update payment status
    if success:
        payment.status = PaymentStatus.SUCCESS
        payment.transaction_id = transaction_id or f"TXN_{datetime.utcnow().timestamp()}"
        payment.paid_at = datetime.utcnow()
        
        # Update order status
        order = db.get(Order, payment.order_id)
        if order and order.status.value == "Pending":
            from models.Enums import OrderStatus
            order.status = OrderStatus.ACCEPTED
    else:
        payment.status = PaymentStatus.FAILED
    
    db.commit()
    db.refresh(payment)
    return payment


def get_payment_by_order(db: Session, order_id: UUID) -> Payment:
    """Get payment by order ID."""
    payment = db.query(Payment).filter(Payment.order_id == order_id).first()
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found for this order"
        )
    return payment


def refund_payment(db: Session, payment_id: UUID, reason: str = None) -> Payment:
    """Refund a payment."""
    payment = db.get(Payment, payment_id)
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    if payment.status != PaymentStatus.SUCCESS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only successful payments can be refunded"
        )
    
    payment.status = PaymentStatus.REFUNDED
    payment.refund_reason = reason
    payment.refunded_at = datetime.utcnow()
    
    # Update order status
    order = db.get(Order, payment.order_id)
    if order:
        from models.Enums import OrderStatus
        order.status = OrderStatus.CANCELLED
    
    db.commit()
    db.refresh(payment)
    return payment


def get_payments_by_user(db: Session, user_id: UUID, skip: int = 0, limit: int = 100) -> list:
    """Get all payments for a specific user."""
    # Get user's orders first
    user_orders = db.query(Order).filter(Order.user_id == user_id).all()
    order_ids = [order.id for order in user_orders]
    
    if not order_ids:
        return []
    
    return db.query(Payment).filter(
        Payment.order_id.in_(order_ids)
    ).offset(skip).limit(limit).all()
