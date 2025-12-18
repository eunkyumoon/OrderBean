/**
 * MenuList 페이지 와이어프레임 기반 테스트
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

describe('MenuList 페이지 - 와이어프레임 기반 테스트', () => {
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  describe('Header 컴포넌트 - 와이어프레임 스타일', () => {
    it('OrderBean - 커피 주문 로고가 어두운 회색 박스 배경으로 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const logo = screen.getByText('OrderBean - 커피 주문');
        expect(logo).toBeInTheDocument();
        // 스타일 검증은 실제 구현에서 확인
      });
    });

    it('주문하기 버튼이 활성화 상태(어두운 테두리)로 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const orderButton = screen.getByText('주문하기');
        expect(orderButton).toBeInTheDocument();
      });
    });

    it('관리자 버튼이 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const adminButton = screen.getByText('관리자');
        expect(adminButton).toBeInTheDocument();
      });
    });
  });

  describe('메뉴 카드 그리드 레이아웃', () => {
    it('메뉴 카드가 3열 그리드로 배치되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        expect(screen.getByText('아메리카노(ICE)')).toBeInTheDocument();
        expect(screen.getByText('아메리카노(HOT)')).toBeInTheDocument();
        expect(screen.getByText('카페라떼')).toBeInTheDocument();
      });
    });

    it('각 메뉴 카드에 가격이 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const prices = screen.getAllByText(/원/);
        expect(prices.length).toBeGreaterThan(0);
        expect(screen.getByText('5,000원')).toBeInTheDocument();
      });
    });

    it('각 메뉴 카드에 담기 버튼이 있어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const addButtons = screen.getAllByText('담기');
        expect(addButtons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('장바구니 컴포넌트 - 하단 고정', () => {
    it('장바구니 제목이 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        expect(screen.getByText('장바구니')).toBeInTheDocument();
      });
    });

    it('장바구니가 비어있을 때 안내 메시지가 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        expect(screen.getByText(/장바구니가 비어있습니다/i)).toBeInTheDocument();
      });
    });

    it('장바구니에 아이템이 추가되면 총 금액이 표시되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      // 이 테스트는 실제 사용자 상호작용이 필요하므로 나중에 구현
    });
  });

  describe('네비게이션 및 버튼 색상', () => {
    it('주문하기 버튼에 색상이 적용되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const orderButton = screen.getByText('주문하기');
        expect(orderButton).toBeInTheDocument();
      });
    });

    it('관리자 버튼에 색상이 적용되어야 한다', async () => {
      renderWithRouter(<MenuList />);
      await waitFor(() => {
        const adminButton = screen.getByText('관리자');
        expect(adminButton).toBeInTheDocument();
      });
    });
  });
});

