/**
 * 레시피 서비스 단위 테스트
 */
const recipeService = require('../../../src/services/recipeService');

describe('Recipe Service', () => {
  describe('createRecipe', () => {
    test('레시피 생성 성공', async () => {
      const userId = 1;
      const recipeData = {
        name: '힘찬 아침 레시피',
        menu_id: 1,
        customizations: {
          shots: 2,
          milk: '오트밀크',
          syrup: {
            type: '바닐라',
            pumps: 2
          }
        }
      };
      
      const recipe = await recipeService.createRecipe(userId, recipeData);
      
      expect(recipe).toBeDefined();
      expect(recipe.name).toBe(recipeData.name);
      expect(recipe.user_id).toBe(userId);
      expect(recipe.customizations).toEqual(recipeData.customizations);
    });
    
    test('레시피 이름 중복 시 에러', async () => {
      const userId = 1;
      const recipeData = {
        name: '기존 레시피',
        menu_id: 1,
        customizations: {}
      };
      
      // 먼저 레시피 생성
      await recipeService.createRecipe(userId, recipeData);
      
      // 같은 이름으로 다시 생성 시도
      await expect(recipeService.createRecipe(userId, recipeData))
        .rejects.toThrow('이미 같은 이름의 레시피가 있습니다');
    });
    
    test('필수 필드 누락 시 에러', async () => {
      const userId = 1;
      const incompleteRecipeData = {
        name: '레시피'
        // menu_id, customizations 누락
      };
      
      await expect(recipeService.createRecipe(userId, incompleteRecipeData))
        .rejects.toThrow('필수 필드가 누락되었습니다');
    });
  });
  
  describe('getUserRecipes', () => {
    test('사용자 레시피 목록 조회', async () => {
      const userId = 1;
      
      const recipes = await recipeService.getUserRecipes(userId);
      
      expect(Array.isArray(recipes)).toBe(true);
      recipes.forEach(recipe => {
        expect(recipe.user_id).toBe(userId);
      });
    });
    
    test('레시피가 없는 경우 빈 배열 반환', async () => {
      const userId = 99999; // 레시피가 없는 사용자
      
      const recipes = await recipeService.getUserRecipes(userId);
      
      expect(recipes).toEqual([]);
    });
  });
  
  describe('getRecipeById', () => {
    test('레시피 상세 조회 성공', async () => {
      const recipeId = 1;
      const userId = 1;
      
      const recipe = await recipeService.getRecipeById(recipeId, userId);
      
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe(recipeId);
      expect(recipe.user_id).toBe(userId);
    });
    
    test('다른 사용자의 레시피 조회 시 에러', async () => {
      const recipeId = 1;
      const differentUserId = 2;
      
      await expect(recipeService.getRecipeById(recipeId, differentUserId))
        .rejects.toThrow('레시피를 찾을 수 없습니다');
    });
  });
  
  describe('updateRecipe', () => {
    test('레시피 수정 성공', async () => {
      const recipeId = 1;
      const userId = 1;
      const updateData = {
        name: '수정된 레시피 이름'
      };
      
      const updatedRecipe = await recipeService.updateRecipe(recipeId, userId, updateData);
      
      expect(updatedRecipe.name).toBe(updateData.name);
    });
    
    test('다른 사용자의 레시피 수정 시 에러', async () => {
      const recipeId = 1;
      const differentUserId = 2;
      const updateData = {
        name: '수정된 이름'
      };
      
      await expect(recipeService.updateRecipe(recipeId, differentUserId, updateData))
        .rejects.toThrow('레시피를 찾을 수 없습니다');
    });
  });
  
  describe('deleteRecipe', () => {
    test('레시피 삭제 성공', async () => {
      const recipeId = 1;
      const userId = 1;
      
      await expect(recipeService.deleteRecipe(recipeId, userId))
        .resolves.not.toThrow();
    });
    
    test('다른 사용자의 레시피 삭제 시 에러', async () => {
      const recipeId = 1;
      const differentUserId = 2;
      
      await expect(recipeService.deleteRecipe(recipeId, differentUserId))
        .rejects.toThrow('레시피를 찾을 수 없습니다');
    });
  });
  
  describe('createOrderFromRecipe', () => {
    test('레시피로 주문 생성 성공', async () => {
      const userId = 1;
      // 먼저 레시피 생성
      const recipe = await recipeService.createRecipe(userId, {
        name: '테스트 레시피',
        menu_id: 1,
        customizations: {
          shots: 2,
          milk: '오트밀크'
        }
      });
      
      const orderData = {
        store_id: 1,
        quantity: 1,
        payment_method: 'card'
      };
      
      const order = await recipeService.createOrderFromRecipe(recipe.id, userId, orderData);
      
      expect(order).toBeDefined();
      expect(order.status).toBe('접수');
      expect(order.items[0].customizations).toBeDefined();
    });
    
    test('존재하지 않는 레시피로 주문 생성 시 에러', async () => {
      const nonExistentRecipeId = 99999;
      const userId = 1;
      const orderData = {
        store_id: 1,
        quantity: 1
      };
      
      await expect(recipeService.createOrderFromRecipe(nonExistentRecipeId, userId, orderData))
        .rejects.toThrow('레시피를 찾을 수 없습니다');
    });
  });
});

