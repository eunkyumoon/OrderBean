/**
 * MenuCard 컴포넌트 색상 테스트
 * TDD RED 단계: 담기 버튼의 색상 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuCard from '../../../src/components/MenuCard';

const mockMenu = {
  id: 1,
  name: '아메리카노(ICE)',
  description: '시원한 아이스 아메리카노',
  price: 4000,
  options: {
    shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
    syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
  }
};

describe('MenuCard 컴포넌트 - 색상 테스트 (TDD RED)', () => {
  it('담기 버튼에 임의의 색상이 적용되어야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={jest.fn()} />);
    const addButton = screen.getByText('담기');
    expect(addButton).toBeInTheDocument();
    
    const computedStyle = window.getComputedStyle(addButton);
    const backgroundColor = computedStyle.backgroundColor;
    const borderColor = computedStyle.borderColor;
    
    // 색상이 적용되었는지 확인
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');
  });
});

