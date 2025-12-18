/**
 * 주문 서비스 단위 테스트
 */
const orderService = require('../../../src/services/orderService');
const menuService = require('../../../src/services/menuService');
const paymentService = require('../../../src/services/paymentService');

// 모킹
jest.mock('../../../src/services/menuService');
jest.mock('../../../src/services/paymentService');

describe('Order Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('createOrder', () => {
    test('주문 생성 성공', async () => {
      const userId = 1;
      const orderData = {
        store_id: 1,
        items: [
          {
            menu_id: 1,
            quantity: 2,
            customizations: {
              shots: 2,
              milk: '오트밀크'
            }
          }
        ],
        payment_method: 'card'
      };
      
      // 모킹 설정
      menuService.getMenuById.mockResolvedValue({
        id: 1,
        name: '카페 라떼',
        price: 4500,
        is_available: true
      });
      
      paymentService.processPayment.mockResolvedValue({
        success: true,
        transaction_id: 'txn_123'
      });
      
      const order = await orderService.createOrder(userId, orderData);
      
      expect(order).toHaveProperty('id');
      expect(order.user_id).toBe(userId);
      expect(order.store_id).toBe(orderData.store_id);
      expect(order.status).toBe('접수');
      expect(order.total_price).toBeGreaterThan(0);
    });
    
    test('판매 불가능한 메뉴 주문 시 에러', async () => {
      const userId = 1;
      const orderData = {
        store_id: 1,
        items: [
          {
            menu_id: 1,
            quantity: 1
          }
        ]
      };
      
      menuService.getMenuById.mockResolvedValue({
        id: 1,
        name: '판매 중지 메뉴',
        price: 4500,
        is_available: false
      });
      
      await expect(orderService.createOrder(userId, orderData))
        .rejects.toThrow('판매 중지된 메뉴입니다');
    });
    
    test('결제 실패 시 주문 생성 실패', async () => {
      const userId = 1;
      const orderData = {
        store_id: 1,
        items: [
          {
            menu_id: 1,
            quantity: 1
          }
        ],
        payment_method: 'card'
      };
      
      menuService.getMenuById.mockResolvedValue({
        id: 1,
        price: 4500,
        is_available: true
      });
      
      paymentService.processPayment.mockResolvedValue({
        success: false,
        error: '카드 승인 실패'
      });
      
      await expect(orderService.createOrder(userId, orderData))
        .rejects.toThrow('결제 처리에 실패했습니다');
    });
  });
  
  describe('updateOrderStatus', () => {
    test('주문 상태 업데이트 성공', async () => {
      const orderId = 1;
      const newStatus = '제조 중';
      
      const updatedOrder = await orderService.updateOrderStatus(orderId, newStatus);
      
      expect(updatedOrder.status).toBe(newStatus);
      expect(updatedOrder.updated_at).toBeDefined();
    });
    
    test('유효하지 않은 상태 값으로 업데이트 시 에러', async () => {
      const orderId = 1;
      const invalidStatus = '잘못된 상태';
      
      await expect(orderService.updateOrderStatus(orderId, invalidStatus))
        .rejects.toThrow('유효하지 않은 주문 상태입니다');
    });
    
    test('존재하지 않는 주문 업데이트 시 에러', async () => {
      const nonExistentOrderId = 99999;
      const newStatus = '제조 중';
      
      await expect(orderService.updateOrderStatus(nonExistentOrderId, newStatus))
        .rejects.toThrow('주문을 찾을 수 없습니다');
    });
  });
  
  describe('getUserOrders', () => {
    test('사용자 주문 목록 조회', async () => {
      const userId = 1;
      const filters = {
        page: 1,
        limit: 10
      };
      
      const orders = await orderService.getUserOrders(userId, filters);
      
      expect(Array.isArray(orders.items)).toBe(true);
      expect(orders.pagination).toBeDefined();
      expect(orders.pagination.page).toBe(filters.page);
    });
    
    test('상태별 필터링', async () => {
      const userId = 1;
      const filters = {
        status: '제조 완료',
        page: 1,
        limit: 10
      };
      
      const orders = await orderService.getUserOrders(userId, filters);
      
      orders.items.forEach(order => {
        expect(order.status).toBe('제조 완료');
      });
    });
  });
  
  describe('cancelOrder', () => {
    test('주문 취소 성공', async () => {
      const userId = 1;
      
      // paymentService 모킹 재설정
      paymentService.processPayment.mockResolvedValue({
        success: true,
        transaction_id: 'txn_123'
      });
      paymentService.refundPayment.mockResolvedValue({
        success: true,
        refund_id: 'refund_123'
      });
      
      // 먼저 주문 생성 (상태는 '접수')
      const order = await orderService.createOrder(userId, {
        store_id: 1,
        items: [
          {
            menu_id: 1,
            quantity: 1
          }
        ],
        payment_method: 'card',
        payment_info: {
          card_id: 1
        }
      });
      
      const cancelledOrder = await orderService.cancelOrder(order.id, userId);
      
      expect(cancelledOrder.status).toBe('취소');
      expect(paymentService.refundPayment).toHaveBeenCalled();
    });
    
    test('이미 제조 중인 주문 취소 시 에러', async () => {
      const orderId = 1;
      const userId = 1;
      
      // 제조 중 상태로 설정
      await orderService.updateOrderStatus(orderId, '제조 중');
      
      await expect(orderService.cancelOrder(orderId, userId))
        .rejects.toThrow('제조가 시작된 주문은 취소할 수 없습니다');
    });
  });
});

