/**
 * 가격 계산 유틸리티 함수
 * 커스터마이제이션 옵션을 포함한 최종 가격 계산
 */

import { CUSTOMIZATION_PRICES } from '../constants';

/**
 * 기본 가격과 커스터마이제이션 옵션을 기반으로 최종 가격 계산
 * @param {number} basePrice - 기본 메뉴 가격
 * @param {Object} customizations - 커스터마이제이션 옵션 객체
 * @returns {number} 계산된 최종 가격
 */
export const calculateItemPrice = (basePrice, customizations = {}) => {
  let total = basePrice;
  
  if (customizations.extra_shot) {
    total += CUSTOMIZATION_PRICES.EXTRA_SHOT;
  }
  
  if (customizations.extra_syrup) {
    total += CUSTOMIZATION_PRICES.EXTRA_SYRUP;
  }
  
  return total;
};

/**
 * 장바구니 항목들의 총 가격 계산
 * @param {Array} items - 장바구니 항목 배열
 * @returns {number} 총 가격
 */
export const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * 장바구니 항목들의 총 수량 계산
 * @param {Array} items - 장바구니 항목 배열
 * @returns {number} 총 수량
 */
export const calculateTotalQuantity = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

