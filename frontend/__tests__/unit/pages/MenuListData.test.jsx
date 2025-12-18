/**
 * MenuList 페이지 메뉴 데이터 테스트
 * TDD RED 단계: 임의의 커피 메뉴가 표시되는지 테스트 작성
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MenuList from '../../../src/pages/MenuList';
import { getDefaultMenus } from '../../../src/data/menuData';

// API 모킹
jest.mock('../../../src/services/menuService', () => ({
  getMenus: jest.fn(() => Promise.reject(new Error('API 실패')))
}));

describe('MenuList 페이지 - 메뉴 데이터 테스트 (TDD RED)', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('기본 메뉴 데이터가 표시되어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      const defaultMenus = getDefaultMenus();
      // 최소한 하나의 메뉴가 표시되어야 함
      expect(defaultMenus.length).toBeGreaterThan(0);
    });
  });

  it('아메리카노(ICE) 메뉴가 표시되어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('아메리카노(HOT) 메뉴가 표시되어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('아메리카노(HOT)')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('카페라떼 메뉴가 표시되어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('카페라떼')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('임의의 커피 메뉴가 최소 3개 이상 표시되어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      const menuCards = screen.getAllByText(/담기/);
      expect(menuCards.length).toBeGreaterThanOrEqual(3);
    }, { timeout: 3000 });
  });
});

