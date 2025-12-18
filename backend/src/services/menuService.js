/**
 * 메뉴 서비스
 * 메뉴 관련 비즈니스 로직 처리
 */

// TODO: 실제 데이터베이스 연동 시 구현
// 현재는 메모리 기반 모킹 데이터 사용

// 임시 메뉴 데이터 (실제 구현 시 DB에서 조회)
const mockMenus = [
  {
    id: 1,
    name: '아메리카노(ICE)',
    description: '시원한 아이스 아메리카노',
    price: 4000,
    category: 'coffee',
    image_url: 'https://example.com/americano-ice.jpg',
    is_available: true,
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 2,
    name: '아메리카노(HOT)',
    description: '따뜻한 핫 아메리카노',
    price: 4000,
    category: 'coffee',
    image_url: 'https://example.com/americano-hot.jpg',
    is_available: true,
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  },
  {
    id: 3,
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 5000,
    category: 'coffee',
    image_url: 'https://example.com/latte.jpg',
    is_available: true,
    options: {
      shots: { default: 1, min: 1, max: 5, price_per_shot: 500 },
      milk: { types: ['일반우유', '오트밀크', '두유', '코코넛밀크'], default: '일반우유' },
      syrup: { types: ['바닐라', '카라멜', '헤이즐넛'], pumps: { default: 0, max: 5, price_per_pump: 0 } }
    }
  }
];

/**
 * 메뉴 목록 조회
 * @param {Object} filters - 필터 옵션 (category, search, page, limit)
 * @returns {Promise<Object>} 메뉴 목록 및 페이지네이션 정보
 */
async function getMenus(filters = {}) {
  const { category, search, page = 1, limit = 20 } = filters;
  
  let filteredMenus = [...mockMenus];
  
  // 카테고리 필터링
  if (category) {
    filteredMenus = filteredMenus.filter(menu => menu.category === category);
  }
  
  // 검색 필터링
  if (search) {
    const searchLower = search.toLowerCase();
    filteredMenus = filteredMenus.filter(menu => 
      menu.name.toLowerCase().includes(searchLower) ||
      (menu.description && menu.description.toLowerCase().includes(searchLower))
    );
  }
  
  // 판매 가능한 메뉴만 필터링
  filteredMenus = filteredMenus.filter(menu => menu.is_available);
  
  // 페이지네이션
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMenus = filteredMenus.slice(startIndex, endIndex);
  
  return {
    menus: paginatedMenus,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredMenus.length,
      totalPages: Math.ceil(filteredMenus.length / limit)
    }
  };
}

/**
 * 메뉴 상세 조회
 * @param {number} menuId - 메뉴 ID
 * @returns {Promise<Object>} 메뉴 정보
 * @throws {Error} 메뉴를 찾을 수 없을 경우
 */
async function getMenuById(menuId) {
  const menu = mockMenus.find(m => m.id === parseInt(menuId));
  
  if (!menu) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }
  
  return menu;
}

/**
 * 메뉴 생성 (관리자)
 * @param {Object} menuData - 메뉴 데이터
 * @returns {Promise<Object>} 생성된 메뉴
 */
async function createMenu(menuData) {
  // 필수 필드 검증
  if (!menuData.name || !menuData.price || !menuData.category) {
    throw new Error('필수 필드가 누락되었습니다');
  }
  
  // 가격 검증
  if (menuData.price <= 0) {
    throw new Error('가격은 0보다 커야 합니다');
  }
  
  const newMenu = {
    id: mockMenus.length + 1,
    name: menuData.name,
    description: menuData.description || '',
    price: menuData.price,
    category: menuData.category,
    image_url: menuData.image_url || '',
    is_available: menuData.is_available !== undefined ? menuData.is_available : true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockMenus.push(newMenu);
  return newMenu;
}

/**
 * 메뉴 수정 (관리자)
 * @param {number} menuId - 메뉴 ID
 * @param {Object} updateData - 수정할 데이터
 * @returns {Promise<Object>} 수정된 메뉴
 */
async function updateMenu(menuId, updateData) {
  const menuIndex = mockMenus.findIndex(m => m.id === parseInt(menuId));
  
  if (menuIndex === -1) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }
  
  mockMenus[menuIndex] = {
    ...mockMenus[menuIndex],
    ...updateData,
    updated_at: new Date().toISOString()
  };
  
  return mockMenus[menuIndex];
}

/**
 * 메뉴 삭제 (관리자)
 * @param {number} menuId - 메뉴 ID
 * @returns {Promise<void>}
 */
async function deleteMenu(menuId) {
  const menuIndex = mockMenus.findIndex(m => m.id === parseInt(menuId));
  
  if (menuIndex === -1) {
    throw new Error('메뉴를 찾을 수 없습니다');
  }
  
  mockMenus.splice(menuIndex, 1);
}

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};

