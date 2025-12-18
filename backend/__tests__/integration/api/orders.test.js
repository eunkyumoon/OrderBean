/**
 * 주문 API 통합 테스트
 */
const request = require('supertest');
const app = require('../../../src/index');
const { createTestUser, getAuthToken, getAdminToken, createTestStore, createTestMenu } = require('../../helpers');

describe('Order API Integration', () => {
  let authToken;
  let userId;
  let storeId;
  let menuId;
  
  beforeAll(async () => {
    // 테스트 사용자 생성
    const user = await createTestUser({
      email: 'test@orderbean.com',
      password: 'test1234',
      name: '테스트 사용자'
    });
    userId = user.id;
    authToken = await getAuthToken(user);
    
    // 테스트 매장 생성
    const store = await createTestStore({
      name: '테스트 매장',
      address: '서울시 강남구'
    });
    storeId = store.id;
    
    // 테스트 메뉴 생성
    const menu = await createTestMenu({
      name: '테스트 커피',
      price: 4500,
      category: 'coffee'
    });
    menuId = menu.id;
  });
  
  describe('POST /api/v1/orders', () => {
    test('주문 생성 성공', async () => {
      const orderData = {
        store_id: storeId,
        items: [
          {
            menu_id: menuId,
            quantity: 2,
            customizations: {
              shots: 2,
              milk: '오트밀크'
            }
          }
        ],
        payment_method: 'card',
        payment_info: {
          card_id: 1
        }
      };
      
      const response = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.order).toBeDefined();
      expect(response.body.data.order.status).toBe('접수');
      expect(response.body.data.order.total_price).toBeGreaterThan(0);
    });
    
    test('인증 없이 주문 생성 시 401 에러', async () => {
      const orderData = {
        store_id: storeId,
        items: [
          {
            menu_id: menuId,
            quantity: 1
          }
        ]
      };
      
      await request(app)
        .post('/api/v1/orders')
        .send(orderData)
        .expect(401);
    });
    
    test('잘못된 주문 데이터로 생성 시 400 에러', async () => {
      const invalidOrderData = {
        store_id: storeId,
        items: [] // 빈 배열
      };
      
      await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidOrderData)
        .expect(400);
    });
    
    test('존재하지 않는 메뉴 주문 시 404 에러', async () => {
      const orderData = {
        store_id: storeId,
        items: [
          {
            menu_id: 99999, // 존재하지 않는 메뉴
            quantity: 1
          }
        ]
      };
      
      await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData)
        .expect(404);
    });
  });
  
  describe('GET /api/v1/orders', () => {
    test('주문 목록 조회 성공', async () => {
      const response = await request(app)
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.orders).toBeDefined();
      expect(Array.isArray(response.body.data.orders)).toBe(true);
      expect(response.body.data.pagination).toBeDefined();
    });
    
    test('상태별 필터링', async () => {
      const status = encodeURIComponent('접수');
      const response = await request(app)
        .get(`/api/v1/orders?status=${status}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      response.body.data.orders.forEach(order => {
        expect(order.status).toBe('접수');
      });
    });
    
    test('페이지네이션', async () => {
      const response = await request(app)
        .get('/api/v1/orders?page=1&limit=5')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(5);
    });
  });
  
  describe('GET /api/v1/orders/:id', () => {
    test('주문 상세 조회 성공', async () => {
      // 먼저 주문 생성
      const orderData = {
        store_id: storeId,
        items: [
          {
            menu_id: menuId,
            quantity: 1
          }
        ],
        payment_method: 'card'
      };
      
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData);
      
      const orderId = createResponse.body.data.order.id;
      
      // 주문 조회
      const response = await request(app)
        .get(`/api/v1/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.order.id).toBe(orderId);
      expect(response.body.data.order.items).toBeDefined();
    });
    
    test('존재하지 않는 주문 조회 시 404 에러', async () => {
      await request(app)
        .get('/api/v1/orders/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
    
    test('다른 사용자의 주문 조회 시 403 에러', async () => {
      // 다른 사용자 생성
      const otherUser = await createTestUser({
        email: 'other@orderbean.com',
        password: 'test1234'
      });
      const otherToken = await getAuthToken(otherUser);
      
      // 다른 사용자의 주문 생성
      const orderData = {
        store_id: storeId,
        items: [{ menu_id: menuId, quantity: 1 }],
        payment_method: 'card'
      };
      
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${otherToken}`)
        .send(orderData);
      
      const orderId = createResponse.body.data.order.id;
      
      // 다른 사용자의 주문을 조회 시도
      await request(app)
        .get(`/api/v1/orders/${orderId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(403);
    });
  });
  
  describe('PATCH /api/v1/admin/orders/:id/status', () => {
    test('주문 상태 업데이트 (관리자)', async () => {
      // 주문 생성
      const orderData = {
        store_id: storeId,
        items: [{ menu_id: menuId, quantity: 1 }],
        payment_method: 'card'
      };
      
      const createResponse = await request(app)
        .post('/api/v1/orders')
        .set('Authorization', `Bearer ${authToken}`)
        .send(orderData);
      
      const orderId = createResponse.body.data.order.id;
      
      // 관리자 토큰
      const adminToken = await getAdminToken();
      
      const response = await request(app)
        .patch(`/api/v1/admin/orders/${orderId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: '제조 중' })
        .expect(200);
      
      expect(response.body.data.order.status).toBe('제조 중');
    });
  });
});

