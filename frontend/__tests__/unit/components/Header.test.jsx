/**
 * Header 컴포넌트 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../src/components/Header';

describe('Header 컴포넌트', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('COZY 로고를 표시해야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('COZY')).toBeInTheDocument();
  });

  it('주문하기 버튼을 표시해야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('주문하기')).toBeInTheDocument();
  });

  it('관리자 버튼을 표시해야 한다', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('관리자')).toBeInTheDocument();
  });

  it('주문하기 버튼 클릭 시 주문 페이지로 이동해야 한다', () => {
    renderWithRouter(<Header />);
    const orderButton = screen.getByText('주문하기');
    expect(orderButton.closest('a')).toHaveAttribute('href', '/');
  });

  it('관리자 버튼 클릭 시 관리자 페이지로 이동해야 한다', () => {
    renderWithRouter(<Header />);
    const adminButton = screen.getByText('관리자');
    expect(adminButton.closest('a')).toHaveAttribute('href', '/admin');
  });
});

