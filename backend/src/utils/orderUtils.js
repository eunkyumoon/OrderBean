/**
 * 주문 관련 유틸리티 함수
 */

/**
 * 주문 항목의 총액을 계산합니다.
 * @param {Array<{price: number, quantity: number}>} items - 주문 항목 배열
 * @returns {number} 총액
 */
function calculateTotalPrice(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }
  
  return items.reduce((total, item) => {
    if (item.price < 0) {
      throw new Error('가격은 0 이상이어야 합니다');
    }
    return total + (item.price * (item.quantity || 0));
  }, 0);
}

/**
 * 주문 항목의 유효성을 검증합니다.
 * @param {Array} items - 주문 항목 배열
 * @throws {Error} 유효하지 않은 항목이 있을 경우
 */
function validateOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('주문 항목이 없습니다');
  }
  
  items.forEach((item, index) => {
    if (!item.menu_id) {
      throw new Error('메뉴 ID는 필수입니다');
    }
    
    if (!item.quantity || item.quantity <= 0) {
      throw new Error('수량은 1 이상이어야 합니다');
    }
  });
}

/**
 * 주문 상태를 포맷팅합니다.
 * @param {string} status - 주문 상태
 * @returns {string} 포맷팅된 주문 상태
 */
function formatOrderStatus(status) {
  const validStatuses = ['접수', '제조 중', '제조 완료', '픽업 완료', '취소'];
  
  if (!validStatuses.includes(status)) {
    throw new Error('유효하지 않은 주문 상태입니다');
  }
  
  return status;
}

/**
 * 커스터마이징 옵션의 추가 가격을 계산합니다.
 * @param {Object} customizations - 커스터마이징 옵션
 * @returns {number} 추가 가격
 */
function calculateCustomizationPrice(customizations) {
  if (!customizations || typeof customizations !== 'object') {
    return 0;
  }
  
  let additionalPrice = 0;
  
  // 샷 추가 가격 (기본 1개, 추가분만 계산)
  if (customizations.shots && typeof customizations.shots === 'number') {
    if (customizations.shots > 5) {
      throw new Error('샷은 최대 5개까지 추가할 수 있습니다');
    }
    // 기본 1개를 제외한 추가 샷 가격 (추가 샷당 500원)
    const additionalShots = Math.max(0, customizations.shots - 1);
    additionalPrice += additionalShots * 500;
  }
  
  // 시럽 펌프 가격 (펌프당 300원)
  if (customizations.syrup && customizations.syrup.pumps) {
    const pumps = customizations.syrup.pumps || 0;
    additionalPrice += pumps * 300;
  }
  
  return additionalPrice;
}

module.exports = {
  calculateTotalPrice,
  validateOrderItems,
  formatOrderStatus,
  calculateCustomizationPrice
};

