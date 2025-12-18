/**
 * 레시피 서비스
 * 나만의 레시피 관련 비즈니스 로직 처리
 */

// 임시 레시피 데이터 (실제 구현 시 DB 사용)
const mockRecipes = [];
let recipeIdCounter = 1;

/**
 * 레시피 생성
 * @param {number} userId - 사용자 ID
 * @param {Object} recipeData - 레시피 데이터
 * @returns {Promise<Object>} 생성된 레시피
 */
async function createRecipe(userId, recipeData) {
  const { name, menu_id, customizations } = recipeData;
  
  // 필수 필드 검증
  if (!name || !menu_id || !customizations) {
    throw new Error('필수 필드가 누락되었습니다');
  }
  
  // 같은 이름의 레시피 중복 확인
  const existingRecipe = mockRecipes.find(
    r => r.user_id === userId && r.name === name
  );
  
  if (existingRecipe) {
    throw new Error('이미 같은 이름의 레시피가 있습니다');
  }
  
  const recipe = {
    id: recipeIdCounter++,
    user_id: userId,
    menu_id: menu_id,
    name: name,
    customizations: customizations,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockRecipes.push(recipe);
  return recipe;
}

/**
 * 사용자 레시피 목록 조회
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Array>} 레시피 목록
 */
async function getUserRecipes(userId) {
  return mockRecipes.filter(r => r.user_id === userId);
}

/**
 * 레시피 상세 조회
 * @param {number} recipeId - 레시피 ID
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} 레시피 정보
 */
async function getRecipeById(recipeId, userId) {
  const recipe = mockRecipes.find(r => r.id === parseInt(recipeId));
  
  if (!recipe || recipe.user_id !== userId) {
    throw new Error('레시피를 찾을 수 없습니다');
  }
  
  return recipe;
}

/**
 * 레시피 수정
 * @param {number} recipeId - 레시피 ID
 * @param {number} userId - 사용자 ID
 * @param {Object} updateData - 수정할 데이터
 * @returns {Promise<Object>} 수정된 레시피
 */
async function updateRecipe(recipeId, userId, updateData) {
  const recipe = await getRecipeById(recipeId, userId);
  
  const recipeIndex = mockRecipes.findIndex(r => r.id === parseInt(recipeId));
  mockRecipes[recipeIndex] = {
    ...recipe,
    ...updateData,
    updated_at: new Date().toISOString()
  };
  
  return mockRecipes[recipeIndex];
}

/**
 * 레시피 삭제
 * @param {number} recipeId - 레시피 ID
 * @param {number} userId - 사용자 ID
 * @returns {Promise<void>}
 */
async function deleteRecipe(recipeId, userId) {
  const recipe = await getRecipeById(recipeId, userId);
  
  const recipeIndex = mockRecipes.findIndex(r => r.id === parseInt(recipeId));
  mockRecipes.splice(recipeIndex, 1);
}

/**
 * 레시피로 주문 생성
 * @param {number} recipeId - 레시피 ID
 * @param {number} userId - 사용자 ID
 * @param {Object} orderData - 주문 데이터
 * @returns {Promise<Object>} 생성된 주문
 */
async function createOrderFromRecipe(recipeId, userId, orderData) {
  const recipe = await getRecipeById(recipeId, userId);
  const orderService = require('./orderService');
  
  const orderItems = [{
    menu_id: recipe.menu_id,
    quantity: orderData.quantity || 1,
    customizations: recipe.customizations
  }];
  
  return await orderService.createOrder(userId, {
    ...orderData,
    items: orderItems
  });
}

module.exports = {
  createRecipe,
  getUserRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  createOrderFromRecipe
};

