/**
 * MenuCard 컴포넌트 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuCard from '../../../src/components/MenuCard';

const mockMenu = {
  id: 1,
  name: '아메리카노(ICE)',
  description: '시원한 아이스 아메리카노',
  price: 4000,
  image_url: 'https://example.com/americano-ice.jpg',
  options: {
    shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
    syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
  }
};

describe('MenuCard 컴포넌트', () => {
  const mockOnAddToCart = jest.fn();

  beforeEach(() => {
    mockOnAddToCart.mockClear();
  });

  it('메뉴 이름을 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
  });

  it('메뉴 가격을 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('4,000원')).toBeInTheDocument();
  });

  it('메뉴 설명을 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('시원한 아이스 아메리카노')).toBeInTheDocument();
  });

  it('샷 추가 옵션 체크박스를 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByLabelText(/샷 추가/)).toBeInTheDocument();
  });

  it('시럽 추가 옵션 체크박스를 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByLabelText(/시럽 추가/)).toBeInTheDocument();
  });

  it('담기 버튼을 표시해야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    expect(screen.getByText('담기')).toBeInTheDocument();
  });

  it('담기 버튼 클릭 시 onAddToCart를 호출해야 한다', async () => {
    const user = userEvent.setup();
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    
    const addButton = screen.getByText('담기');
    await user.click(addButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it('옵션 선택 후 담기 버튼 클릭 시 선택한 옵션을 전달해야 한다', async () => {
    const user = userEvent.setup();
    render(<MenuCard menu={mockMenu} onAddToCart={mockOnAddToCart} />);
    
    const shotCheckbox = screen.getByLabelText(/샷 추가/);
    await user.click(shotCheckbox);
    
    const addButton = screen.getByText('담기');
    await user.click(addButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        menu_id: 1,
        customizations: expect.objectContaining({
          extra_shot: true
        })
      })
    );
  });
});
