/**
 * 메뉴 API 통합 테스트
 */
const request = require('supertest');
const app = require('../../../src/index');
const { getAdminToken } = require('../../helpers');

describe('Menu API Integration', () => {
  describe('GET /api/v1/menus', () => {
    test('메뉴 목록 조회 성공', async () => {
      const response = await request(app)
        .get('/api/v1/menus')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.menus).toBeDefined();
      expect(Array.isArray(response.body.data.menus)).toBe(true);
      expect(response.body.data.pagination).toBeDefined();
    });
    
    test('카테고리별 필터링', async () => {
      const response = await request(app)
        .get('/api/v1/menus?category=coffee')
        .expect(200);
      
      response.body.data.menus.forEach(menu => {
        expect(menu.category).toBe('coffee');
      });
    });
    
    test('검색 키워드로 필터링', async () => {
      const searchKeyword = encodeURIComponent('라떼');
      const response = await request(app)
        .get(`/api/v1/menus?search=${searchKeyword}`)
        .expect(200);
      
      response.body.data.menus.forEach(menu => {
        expect(menu.name.toLowerCase()).toContain('라떼');
      });
    });
    
    test('페이지네이션', async () => {
      const response = await request(app)
        .get('/api/v1/menus?page=1&limit=5')
        .expect(200);
      
      expect(response.body.data.pagination.page).toBe(1);
      expect(response.body.data.pagination.limit).toBe(5);
      expect(response.body.data.menus.length).toBeLessThanOrEqual(5);
    });
  });
  
  describe('GET /api/v1/menus/:id', () => {
    test('메뉴 상세 조회 성공', async () => {
      const menuId = 1;
      
      const response = await request(app)
        .get(`/api/v1/menus/${menuId}`)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.menu).toBeDefined();
      expect(response.body.data.menu.id).toBe(menuId);
      expect(response.body.data.menu.options).toBeDefined();
    });
    
    test('존재하지 않는 메뉴 조회 시 404 에러', async () => {
      await request(app)
        .get('/api/v1/menus/99999')
        .expect(404);
    });
  });
  
  describe('POST /api/v1/admin/menus', () => {
    test('메뉴 생성 성공 (관리자)', async () => {
      const adminToken = await getAdminToken();
      
      const menuData = {
        name: '테스트 메뉴',
        description: '테스트 설명',
        price: 5000,
        category: 'coffee',
        is_available: true
      };
      
      const response = await request(app)
        .post('/api/v1/admin/menus')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(menuData)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.menu.name).toBe(menuData.name);
      expect(response.body.data.menu.price).toBe(menuData.price);
    });
    
    test('일반 사용자가 메뉴 생성 시 403 에러', async () => {
      const { createTestUser, getAuthToken } = require('../../helpers');
      
      const menuData = {
        name: '테스트 메뉴',
        price: 5000,
        category: 'coffee'
      };
      
      // 일반 사용자 생성 및 토큰 발급
      const user = await createTestUser({
        email: 'user@orderbean.com',
        password: 'test1234',
        role: 'user'
      });
      const userToken = await getAuthToken(user);
      
      await request(app)
        .post('/api/v1/admin/menus')
        .set('Authorization', `Bearer ${userToken}`)
        .send(menuData)
        .expect(403);
    });
  });
});

