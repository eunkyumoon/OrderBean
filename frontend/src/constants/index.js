/**
 * 상수 정의
 * 애플리케이션 전역에서 사용되는 상수들을 중앙 관리
 */

// 커스터마이제이션 가격 상수
export const CUSTOMIZATION_PRICES = {
  EXTRA_SHOT: 500,
  EXTRA_SYRUP: 0,
};

// 주문 상태 상수
export const ORDER_STATUS = {
  PENDING: '접수 대기',
  RECEIVED: '접수',
  MAKING: '제조 중',
  COMPLETED: '제조 완료',
};

// 라우트 경로 상수
export const ROUTES = {
  HOME: '/',
  MENUS: '/menus',
  ADMIN: '/admin',
  TEST: '/test',
};

// 커스터마이제이션 라벨
export const CUSTOMIZATION_LABELS = {
  EXTRA_SHOT: '샷 추가',
  EXTRA_SYRUP: '시럽 추가',
};

