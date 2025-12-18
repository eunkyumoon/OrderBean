/**
 * Header 컴포넌트 색상 테스트
 * TDD RED 단계: 네비게이션과 버튼의 색상 테스트 작성
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../src/components/Header';

describe('Header 컴포넌트 - 색상 테스트 (TDD RED)', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('주문하기 버튼에 임의의 색상이 적용되어야 한다', () => {
    renderWithRouter(<Header />);
    const orderButton = screen.getByText('주문하기');
    expect(orderButton).toBeInTheDocument();
    
    // 버튼에 색상이 적용되었는지 확인 (배경색 또는 테두리색)
    const computedStyle = window.getComputedStyle(orderButton);
    const backgroundColor = computedStyle.backgroundColor;
    const borderColor = computedStyle.borderColor;
    
    // 색상이 기본값(transparent, rgb(0,0,0) 등)이 아닌지 확인
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');
  });

  it('관리자 버튼에 임의의 색상이 적용되어야 한다', () => {
    renderWithRouter(<Header />);
    const adminButton = screen.getByText('관리자');
    expect(adminButton).toBeInTheDocument();
    
    const computedStyle = window.getComputedStyle(adminButton);
    const backgroundColor = computedStyle.backgroundColor;
    
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');
  });

  it('주문하기 버튼과 관리자 버튼의 색상이 다를 수 있다', () => {
    renderWithRouter(<Header />);
    const orderButton = screen.getByText('주문하기');
    const adminButton = screen.getByText('관리자');
    
    const orderStyle = window.getComputedStyle(orderButton);
    const adminStyle = window.getComputedStyle(adminButton);
    
    // 두 버튼의 색상이 다를 수 있음 (같을 수도 있지만 스타일이 적용되어야 함)
    expect(orderStyle.backgroundColor).toBeTruthy();
    expect(adminStyle.backgroundColor).toBeTruthy();
  });
});

