/**
 * Cart 컴포넌트
 * TDD GREEN 단계: 와이어프레임 기반 스타일링 적용
 */

import React from 'react';
import { formatCustomizations } from '../utils/customizationUtils';
import { calculateTotalPrice } from '../utils/priceUtils';
import '../styles/App.css';

const Cart = ({ items, onOrder, onRemoveItem }) => {
  const totalPrice = calculateTotalPrice(items);

  const handleRemoveItem = (itemId) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">장바구니</h2>
        <div className="cart-content">
          <div className="cart-left">
            <p className="cart-empty">장바구니가 비어있습니다</p>
          </div>
          <div className="cart-right">
            <div className="cart-total">
              <span className="cart-total-label">총 금액:</span>
              <span className="cart-total-price">0원</span>
            </div>
            <button 
              className="cart-order-button" 
              onClick={onOrder}
              disabled={true}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">장바구니</h2>
      <div className="cart-content">
        <div className="cart-left">
          <div className="cart-items">
            {items.map((item) => {
              const customizationDisplay = formatCustomizations(item.customizations);
              
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    {item.menu_name}{customizationDisplay} X {item.quantity}
                  </div>
                  <div className="cart-item-price">
                    {(item.price * item.quantity).toLocaleString()}원
                  </div>
                  {onRemoveItem && (
                    <button 
                      className="cart-item-remove"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="항목 제거"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-right">
          <div className="cart-total">
            <span className="cart-total-label">총 금액:</span>
            <span className="cart-total-price">{totalPrice.toLocaleString()}원</span>
          </div>
          <button 
            className="cart-order-button" 
            onClick={onOrder}
            disabled={items.length === 0}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

