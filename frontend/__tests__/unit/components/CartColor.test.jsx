/**
 * Cart 컴포넌트 색상 테스트
 * TDD RED 단계: 주문하기 버튼의 색상 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../../../src/components/Cart';

describe('Cart 컴포넌트 - 색상 테스트 (TDD RED)', () => {
  it('주문하기 버튼에 임의의 색상이 적용되어야 한다', () => {
    const items = [
      {
        id: 1,
        menu_id: 1,
        menu_name: '아메리카노(ICE)',
        quantity: 1,
        price: 4000,
        customizations: {}
      }
    ];
    
    render(<Cart items={items} onOrder={jest.fn()} onRemoveItem={jest.fn()} />);
    const orderButton = screen.getByText('주문하기');
    expect(orderButton).toBeInTheDocument();
    
    const computedStyle = window.getComputedStyle(orderButton);
    const backgroundColor = computedStyle.backgroundColor;
    
    // 색상이 적용되었는지 확인
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');
    expect(backgroundColor).not.toBe('rgb(0, 0, 0)');
  });
});

