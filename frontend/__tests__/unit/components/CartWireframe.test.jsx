/**
 * Cart 컴포넌트 와이어프레임 기반 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../../../src/components/Cart';

describe('Cart 컴포넌트 - 와이어프레임 기반 테스트', () => {
  it('장바구니 제목이 표시되어야 한다', () => {
    render(<Cart items={[]} onOrder={jest.fn()} onRemoveItem={jest.fn()} />);
    expect(screen.getByText('장바구니')).toBeInTheDocument();
  });

  it('장바구니가 비어있을 때 안내 메시지가 표시되어야 한다', () => {
    render(<Cart items={[]} onOrder={jest.fn()} onRemoveItem={jest.fn()} />);
    expect(screen.getByText(/장바구니가 비어있습니다/i)).toBeInTheDocument();
  });

  it('장바구니에 아이템이 있으면 총 금액이 표시되어야 한다', () => {
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
    expect(screen.getByText(/총 금액/i)).toBeInTheDocument();
    const prices = screen.getAllByText(/4,000원/);
    expect(prices.length).toBeGreaterThan(0);
  });

  it('주문하기 버튼이 표시되어야 한다', () => {
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
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });
});

