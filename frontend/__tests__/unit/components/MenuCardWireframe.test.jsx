/**
 * MenuCard 컴포넌트 와이어프레임 기반 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('MenuCard 컴포넌트 - 와이어프레임 기반 테스트', () => {
  it('메뉴명이 표시되어야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={jest.fn()} />);
    expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
  });

  it('가격이 표시되어야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={jest.fn()} />);
    expect(screen.getByText('4,000원')).toBeInTheDocument();
  });

  it('담기 버튼이 표시되어야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={jest.fn()} />);
    expect(screen.getByText('담기')).toBeInTheDocument();
  });

  it('샷 추가 옵션이 표시되어야 한다', () => {
    render(<MenuCard menu={mockMenu} onAddToCart={jest.fn()} />);
    expect(screen.getByText(/샷 추가/i)).toBeInTheDocument();
  });
});

