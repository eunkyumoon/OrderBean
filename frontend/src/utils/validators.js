/**
 * 유효성 검사 유틸리티 함수
 */

/**
 * 이메일 유효성 검사
 * @param {string} email - 검사할 이메일
 * @returns {boolean} 유효한 이메일인지 여부
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 유효성 검사 (8자 이상)
 * @param {string} password - 검사할 비밀번호
 * @returns {boolean} 유효한 비밀번호인지 여부
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }
  
  return password.length >= 8;
}

/**
 * 전화번호 유효성 검사
 * @param {string} phone - 검사할 전화번호
 * @returns {boolean} 유효한 전화번호인지 여부
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  // 하이픈 제거 후 숫자만 확인
  const cleaned = phone.replace(/-/g, '');
  const phoneRegex = /^[0-9]{10,11}$/;
  
  return phoneRegex.test(cleaned);
}

/**
 * 가격 유효성 검사 (0 이상)
 * @param {number} price - 검사할 가격
 * @returns {boolean} 유효한 가격인지 여부
 */
export function validatePrice(price) {
  if (typeof price !== 'number') {
    return false;
  }
  
  return price >= 0;
}

