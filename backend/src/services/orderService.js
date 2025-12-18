/**
 * 주문 서비스
 * 주문 관련 비즈니스 로직 처리
 */

const menuService = require('./menuService');
const paymentService = require('./paymentService');
const { calculateTotalPrice, validateOrderItems, formatOrderStatus } = require('../utils/orderUtils');

// 임시 주문 데이터 (실제 구현 시 DB 사용)
const mockOrders = [];
let orderIdCounter = 1;

/**
 * 주문 생성
 * @param {number} userId - 사용자 ID
 * @param {Object} orderData - 주문 데이터
 * @returns {Promise<Object>} 생성된 주문
 */
async function createOrder(userId, orderData) {
  const { store_id, items, payment_method, payment_info } = orderData;
  
  // 주문 항목 검증
  validateOrderItems(items);
  
  // 메뉴 확인 및 가격 계산
  let totalPrice = 0;
  const orderItems = [];
  
  for (const item of items) {
    const menu = await menuService.getMenuById(item.menu_id);
    
    // 판매 가능 여부 확인
    if (!menu.is_available) {
      throw new Error('판매 중지된 메뉴입니다');
    }
    
    // 항목 가격 계산
    const itemPrice = menu.price * item.quantity;
    totalPrice += itemPrice;
    
    orderItems.push({
      menu_id: menu.id,
      menu_name: menu.name,
      quantity: item.quantity,
      customizations: item.customizations || {},
      price: itemPrice
    });
  }
  
  // 결제 처리
  if (payment_method) {
    const paymentResult = await paymentService.processPayment({
      amount: totalPrice,
      payment_method: payment_method,
      ...payment_info
    });
    
    if (!paymentResult.success) {
      throw new Error('결제 처리에 실패했습니다');
    }
  }
  
  // 주문 생성
  const order = {
    id: orderIdCounter++,
    user_id: userId,
    store_id: store_id,
    status: '접수',
    total_price: totalPrice,
    items: orderItems,
    payment_method: payment_method,
    payment_status: payment_method ? 'completed' : 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockOrders.push(order);
  return order;
}

/**
 * 주문 상태 업데이트
 * @param {number} orderId - 주문 ID
 * @param {string} newStatus - 새로운 상태
 * @returns {Promise<Object>} 업데이트된 주문
 */
async function updateOrderStatus(orderId, newStatus) {
  // 상태 유효성 검증
  formatOrderStatus(newStatus);
  
  const order = mockOrders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    throw new Error('주문을 찾을 수 없습니다');
  }
  
  order.status = newStatus;
  order.updated_at = new Date().toISOString();
  
  return order;
}

/**
 * 사용자 주문 목록 조회
 * @param {number} userId - 사용자 ID
 * @param {Object} filters - 필터 옵션
 * @returns {Promise<Object>} 주문 목록 및 페이지네이션
 */
async function getUserOrders(userId, filters = {}) {
  const { status, page = 1, limit = 20 } = filters;
  
  let userOrders = mockOrders.filter(o => o.user_id === userId);
  
  // 상태 필터링
  if (status) {
    userOrders = userOrders.filter(o => o.status === status);
  }
  
  // 페이지네이션
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = userOrders.slice(startIndex, endIndex);
  
  return {
    items: paginatedOrders,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: userOrders.length,
      totalPages: Math.ceil(userOrders.length / limit)
    }
  };
}

/**
 * 주문 상세 조회
 * @param {number} orderId - 주문 ID
 * @param {number} userId - 사용자 ID (권한 확인용)
 * @returns {Promise<Object>} 주문 정보
 */
async function getOrderById(orderId, userId) {
  const order = mockOrders.find(o => o.id === parseInt(orderId));
  
  if (!order) {
    throw new Error('주문을 찾을 수 없습니다');
  }
  
  // 권한 확인 (사용자는 자신의 주문만 조회 가능)
  if (order.user_id !== userId) {
    throw new Error('주문을 조회할 권한이 없습니다');
  }
  
  return order;
}

/**
 * 주문 취소
 * @param {number} orderId - 주문 ID
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} 취소된 주문
 */
async function cancelOrder(orderId, userId) {
  const order = await getOrderById(orderId, userId);
  
  // 취소 가능한 상태 확인
  if (order.status === '제조 중' || order.status === '제조 완료') {
    throw new Error('제조가 시작된 주문은 취소할 수 없습니다');
  }
  
  // 환불 처리
  if (order.payment_status === 'completed') {
    await paymentService.refundPayment(order.payment_method, order.total_price);
  }
  
  // 주문 상태 변경
  return await updateOrderStatus(orderId, '취소');
}

module.exports = {
  createOrder,
  updateOrderStatus,
  getUserOrders,
  getOrderById,
  cancelOrder
};

