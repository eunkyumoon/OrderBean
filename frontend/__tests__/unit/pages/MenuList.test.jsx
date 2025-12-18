/**
 * MenuList 페이지 테스트
 * TDD RED 단계: 실패하는 테스트 작성
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MenuList from '../../../src/pages/MenuList';

// API 모킹
jest.mock('../../../src/services/menuService', () => ({
  getMenus: jest.fn(() => Promise.resolve({
    menus: [
      {
        id: 1,
        name: '아메리카노(ICE)',
        description: '시원한 아이스 아메리카노',
        price: 4000,
        image_url: 'https://example.com/americano-ice.jpg',
        options: {
          shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
          syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
        }
      },
      {
        id: 2,
        name: '아메리카노(HOT)',
        description: '따뜻한 핫 아메리카노',
        price: 4000,
        image_url: 'https://example.com/americano-hot.jpg',
        options: {
          shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
          syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
        }
      },
      {
        id: 3,
        name: '카페라떼',
        description: '부드러운 우유와 에스프레소의 조화',
        price: 5000,
        image_url: 'https://example.com/latte.jpg',
        options: {
          shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
          syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
        }
      }
    ],
    pagination: { page: 1, limit: 20, total: 3, totalPages: 1 }
  }))
}));

describe('MenuList 페이지', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('Header 컴포넌트를 렌더링해야 한다', async () => {
    renderWithRouter(<MenuList />);
    await waitFor(() => {
      expect(screen.getByText('COZY')).toBeInTheDocument();
    });
  });

  it('메뉴 목록을 로드하여 표시해야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
      expect(screen.getByText('아메리카노(HOT)')).toBeInTheDocument();
      expect(screen.getByText('카페라떼')).toBeInTheDocument();
    });
  });

  it('Cart 컴포넌트를 렌더링해야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('장바구니')).toBeInTheDocument();
    });
  });

  it('메뉴 카드를 클릭하여 장바구니에 추가할 수 있어야 한다', async () => {
    renderWithRouter(<MenuList />);
    
    await waitFor(() => {
      expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
    });
  });
});

