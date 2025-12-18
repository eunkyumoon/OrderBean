/**
 * Cart 컴포넌트 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../../../src/components/Cart';

const mockCartItems = [
  {
    id: 1,
    menu_id: 1,
    menu_name: '아메리카노(ICE)',
    quantity: 1,
    price: 4500,
    customizations: { extra_shot: true }
  },
  {
    id: 2,
    menu_id: 2,
    menu_name: '아메리카노(HOT)',
    quantity: 2,
    price: 8000,
    customizations: {}
  }
];

describe('Cart 컴포넌트', () => {
  const mockOnOrder = jest.fn();
  const mockOnRemoveItem = jest.fn();

  beforeEach(() => {
    mockOnOrder.mockClear();
    mockOnRemoveItem.mockClear();
  });

  it('장바구니 제목을 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText('장바구니')).toBeInTheDocument();
  });

  it('장바구니 항목들을 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText(/아메리카노\(ICE\)/)).toBeInTheDocument();
    expect(screen.getByText(/아메리카노\(HOT\)/)).toBeInTheDocument();
  });

  it('각 항목의 수량을 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText(/X 1/)).toBeInTheDocument();
    expect(screen.getByText(/X 2/)).toBeInTheDocument();
  });

  it('각 항목의 가격을 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText('4,500원')).toBeInTheDocument();
    expect(screen.getByText('8,000원')).toBeInTheDocument();
  });

  it('총 금액을 계산하여 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText(/총 금액: 12,500원/)).toBeInTheDocument();
  });

  it('주문하기 버튼을 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });

  it('주문하기 버튼 클릭 시 onOrder를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    
    const orderButton = screen.getByText('주문하기');
    await user.click(orderButton);
    
    expect(mockOnOrder).toHaveBeenCalledTimes(1);
  });

  it('장바구니가 비어있을 때 빈 상태 메시지를 표시해야 한다', () => {
    render(<Cart items={[]} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText(/장바구니가 비어있습니다/)).toBeInTheDocument();
  });

  it('옵션이 있는 항목은 옵션 정보를 표시해야 한다', () => {
    render(<Cart items={mockCartItems} onOrder={mockOnOrder} onRemoveItem={mockOnRemoveItem} />);
    expect(screen.getByText(/샷 추가/)).toBeInTheDocument();
  });
});

