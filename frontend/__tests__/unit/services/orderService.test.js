/**
 * 주문 서비스 테스트
 */
import { createOrder, getOrders, getOrderById, cancelOrder } from '../../../src/services/orderService';

// fetch 모킹
global.fetch = jest.fn();

describe('Order Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  
  describe('createOrder', () => {
    test('주문 생성 성공', async () => {
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
      
      const mockResponse = {
        success: true,
        data: {
          order: {
            id: 101,
            status: '접수',
            total_price: 10600
          }
        }
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await createOrder(orderData);
      
      expect(fetch).toHaveBeenCalledWith('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': expect.stringContaining('Bearer')
        },
        body: JSON.stringify(orderData)
      });
      
      expect(result.success).toBe(true);
      expect(result.data.order.id).toBe(101);
    });
    
    test('주문 생성 실패 시 에러 처리', async () => {
      const orderData = {
        store_id: 1,
        items: []
      };
      
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          error: {
            message: '주문 항목이 없습니다'
          }
        })
      });
      
      await expect(createOrder(orderData)).rejects.toThrow('주문 생성 실패');
    });
  });
  
  describe('getOrders', () => {
    test('주문 목록 조회 성공', async () => {
      const mockResponse = {
        success: true,
        data: {
          orders: [
            {
              id: 101,
              status: '접수',
              total_price: 10600
            }
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 1
          }
        }
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await getOrders({ page: 1, limit: 20 });
      
      expect(fetch).toHaveBeenCalledWith('/api/v1/orders?page=1&limit=20', {
        headers: {
          'Authorization': expect.stringContaining('Bearer')
        }
      });
      
      expect(result.data.orders).toHaveLength(1);
    });
    
    test('상태별 필터링', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orders: [],
            pagination: {}
          }
        })
      });
      
      await getOrders({ status: '제조 완료' });
      
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('status=제조 완료'),
        expect.any(Object)
      );
    });
  });
  
  describe('getOrderById', () => {
    test('주문 상세 조회 성공', async () => {
      const orderId = 101;
      const mockResponse = {
        success: true,
        data: {
          order: {
            id: orderId,
            status: '접수',
            items: []
          }
        }
      };
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });
      
      const result = await getOrderById(orderId);
      
      expect(fetch).toHaveBeenCalledWith(`/api/v1/orders/${orderId}`, {
        headers: {
          'Authorization': expect.stringContaining('Bearer')
        }
      });
      
      expect(result.data.order.id).toBe(orderId);
    });
  });
  
  describe('cancelOrder', () => {
    test('주문 취소 성공', async () => {
      const orderId = 101;
      
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            order: {
              id: orderId,
              status: '취소'
            }
          }
        })
      });
      
      const result = await cancelOrder(orderId);
      
      expect(fetch).toHaveBeenCalledWith(`/api/v1/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': expect.stringContaining('Bearer')
        }
      });
      
      expect(result.data.order.status).toBe('취소');
    });
  });
});

