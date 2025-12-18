/**
 * Header 컴포넌트 와이어프레임 기반 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../src/components/Header';

describe('Header 컴포넌트 - 와이어프레임 기반 테스트', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('OrderBean - 커피 주문 로고가 표시되어야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('OrderBean - 커피 주문')).toBeInTheDocument();
  });

  it('주문하기 버튼이 표시되어야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });

  it('관리자 버튼이 표시되어야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('관리자')).toBeInTheDocument();
  });

  it('주문하기 버튼이 활성화 상태로 표시되어야 한다 (현재 페이지)', () => {
    renderWithRouter(<Header currentPage="order" />);
    const orderButton = screen.getByText('주문하기');
    expect(orderButton).toBeInTheDocument();
  });
});

