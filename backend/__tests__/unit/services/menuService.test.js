/**
 * 메뉴 서비스 단위 테스트
 */
const menuService = require('../../../src/services/menuService');

describe('Menu Service', () => {
  describe('getMenus', () => {
    test('모든 메뉴 조회', async () => {
      const filters = {
        page: 1,
        limit: 20
      };
      
      const result = await menuService.getMenus(filters);
      
      expect(result.menus).toBeDefined();
      expect(Array.isArray(result.menus)).toBe(true);
      expect(result.pagination).toBeDefined();
    });
    
    test('카테고리별 필터링', async () => {
      const filters = {
        category: 'coffee',
        page: 1,
        limit: 20
      };
      
      const result = await menuService.getMenus(filters);
      
      result.menus.forEach(menu => {
        expect(menu.category).toBe('coffee');
      });
    });
    
    test('검색 키워드로 필터링', async () => {
      const filters = {
        search: '라떼',
        page: 1,
        limit: 20
      };
      
      const result = await menuService.getMenus(filters);
      
      result.menus.forEach(menu => {
        expect(menu.name.toLowerCase()).toContain('라떼');
      });
    });
    
    test('판매 가능한 메뉴만 조회', async () => {
      const filters = {
        page: 1,
        limit: 20
      };
      
      const result = await menuService.getMenus(filters);
      
      result.menus.forEach(menu => {
        expect(menu.is_available).toBe(true);
      });
    });
  });
  
  describe('getMenuById', () => {
    test('메뉴 상세 조회 성공', async () => {
      const menuId = 1;
      
      const menu = await menuService.getMenuById(menuId);
      
      expect(menu).toBeDefined();
      expect(menu.id).toBe(menuId);
      expect(menu.name).toBeDefined();
      expect(menu.price).toBeDefined();
    });
    
    test('존재하지 않는 메뉴 조회 시 에러', async () => {
      const nonExistentMenuId = 99999;
      
      await expect(menuService.getMenuById(nonExistentMenuId))
        .rejects.toThrow('메뉴를 찾을 수 없습니다');
    });
  });
  
  describe('createMenu', () => {
    test('메뉴 생성 성공', async () => {
      const menuData = {
        name: '아메리카노',
        description: '진한 에스프레소',
        price: 4000,
        category: 'coffee',
        is_available: true
      };
      
      const menu = await menuService.createMenu(menuData);
      
      expect(menu).toBeDefined();
      expect(menu.name).toBe(menuData.name);
      expect(menu.price).toBe(menuData.price);
    });
    
    test('필수 필드 누락 시 에러', async () => {
      const incompleteMenuData = {
        name: '아메리카노'
        // price, category 누락
      };
      
      await expect(menuService.createMenu(incompleteMenuData))
        .rejects.toThrow('필수 필드가 누락되었습니다');
    });
    
    test('음수 가격 입력 시 에러', async () => {
      const menuData = {
        name: '아메리카노',
        price: -1000,
        category: 'coffee'
      };
      
      await expect(menuService.createMenu(menuData))
        .rejects.toThrow('가격은 0보다 커야 합니다');
    });
  });
  
  describe('updateMenu', () => {
    test('메뉴 정보 수정 성공', async () => {
      const menuId = 1;
      const updateData = {
        price: 5000
      };
      
      const updatedMenu = await menuService.updateMenu(menuId, updateData);
      
      expect(updatedMenu.price).toBe(updateData.price);
    });
    
    test('존재하지 않는 메뉴 수정 시 에러', async () => {
      const nonExistentMenuId = 99999;
      const updateData = {
        price: 5000
      };
      
      await expect(menuService.updateMenu(nonExistentMenuId, updateData))
        .rejects.toThrow('메뉴를 찾을 수 없습니다');
    });
  });
  
  describe('deleteMenu', () => {
    test('메뉴 삭제 성공', async () => {
      const menuId = 1;
      
      await expect(menuService.deleteMenu(menuId)).resolves.not.toThrow();
    });
    
    test('존재하지 않는 메뉴 삭제 시 에러', async () => {
      const nonExistentMenuId = 99999;
      
      await expect(menuService.deleteMenu(nonExistentMenuId))
        .rejects.toThrow('메뉴를 찾을 수 없습니다');
    });
  });
});

