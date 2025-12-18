/**
 * 메뉴 서비스
 * API 호출을 위한 서비스 레이어
 */

// Vite에서는 import.meta.env를 사용합니다
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getMenus = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.category) queryParams.append('category', filters.category);
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.page) queryParams.append('page', filters.page);
  if (filters.limit) queryParams.append('limit', filters.limit);

  const response = await fetch(`${API_BASE_URL}/api/v1/menus?${queryParams}`);
  if (!response.ok) {
    throw new Error('메뉴 목록을 불러오는데 실패했습니다');
  }
  return response.json();
};

export const getMenuById = async (menuId) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/menus/${menuId}`);
  if (!response.ok) {
    throw new Error('메뉴를 불러오는데 실패했습니다');
  }
  return response.json();
};

