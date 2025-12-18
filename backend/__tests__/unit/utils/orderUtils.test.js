/**
 * 주문 관련 유틸리티 함수 테스트
 */
const {
  calculateTotalPrice,
  validateOrderItems,
  formatOrderStatus,
  calculateCustomizationPrice
} = require('../../../src/utils/orderUtils');

describe('Order Utils', () => {
  describe('calculateTotalPrice', () => {
    test('정상적인 주문 항목의 총액 계산', () => {
      const items = [
        { price: 5000, quantity: 2 },
        { price: 3000, quantity: 1 }
      ];
      
      expect(calculateTotalPrice(items)).toBe(13000);
    });
    
    test('빈 배열일 때 0 반환', () => {
      expect(calculateTotalPrice([])).toBe(0);
    });
    
    test('수량이 0인 항목 처리', () => {
      const items = [
        { price: 5000, quantity: 0 }
      ];
      expect(calculateTotalPrice(items)).toBe(0);
    });
    
    test('음수 가격 처리 (에러 발생)', () => {
      const items = [
        { price: -1000, quantity: 1 }
      ];
      expect(() => calculateTotalPrice(items)).toThrow('가격은 0 이상이어야 합니다');
    });
    
    test('큰 수량 처리', () => {
      const items = [
        { price: 1000, quantity: 100 }
      ];
      expect(calculateTotalPrice(items)).toBe(100000);
    });
  });
  
  describe('validateOrderItems', () => {
    test('유효한 주문 항목 검증', () => {
      const items = [
        {
          menu_id: 1,
          quantity: 2,
          customizations: {
            shots: 2,
            milk: '오트밀크'
          }
        }
      ];
      
      expect(() => validateOrderItems(items)).not.toThrow();
    });
    
    test('수량이 0인 항목 검증 실패', () => {
      const items = [
        {
          menu_id: 1,
          quantity: 0
        }
      ];
      
      expect(() => validateOrderItems(items)).toThrow('수량은 1 이상이어야 합니다');
    });
    
    test('메뉴 ID가 없는 항목 검증 실패', () => {
      const items = [
        {
          quantity: 1
        }
      ];
      
      expect(() => validateOrderItems(items)).toThrow('메뉴 ID는 필수입니다');
    });
    
    test('빈 배열 검증 실패', () => {
      expect(() => validateOrderItems([])).toThrow('주문 항목이 없습니다');
    });
  });
  
  describe('formatOrderStatus', () => {
    test('주문 상태 포맷팅', () => {
      expect(formatOrderStatus('접수')).toBe('접수');
      expect(formatOrderStatus('제조 중')).toBe('제조 중');
      expect(formatOrderStatus('제조 완료')).toBe('제조 완료');
      expect(formatOrderStatus('픽업 완료')).toBe('픽업 완료');
      expect(formatOrderStatus('취소')).toBe('취소');
    });
    
    test('잘못된 상태 값 처리', () => {
      expect(() => formatOrderStatus('invalid')).toThrow('유효하지 않은 주문 상태입니다');
    });
  });
  
  describe('calculateCustomizationPrice', () => {
    test('커스터마이징 가격 계산', () => {
      const basePrice = 4500;
      const customizations = {
        shots: 2, // 기본 1개, 추가 1개 = 500원
        syrup: {
          pumps: 2 // 2펌프 = 600원
        }
      };
      
      const additionalPrice = calculateCustomizationPrice(customizations);
      expect(additionalPrice).toBe(1100); // 500 + 600
    });
    
    test('커스터마이징 없는 경우 0 반환', () => {
      const customizations = {};
      expect(calculateCustomizationPrice(customizations)).toBe(0);
    });
    
    test('최대 샷 수 제한', () => {
      const customizations = {
        shots: 10 // 최대 5개
      };
      
      expect(() => calculateCustomizationPrice(customizations)).toThrow('샷은 최대 5개까지 추가할 수 있습니다');
    });
  });
});

