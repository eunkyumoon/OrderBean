/**
 * ID 생성 유틸리티 함수
 * 고유한 ID를 생성하는 함수들
 */

/**
 * 고유한 ID 생성
 * Date.now()와 랜덤 문자열을 조합하여 고유성 보장
 * @returns {string} 고유한 ID 문자열
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

