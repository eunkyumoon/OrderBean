/**
 * 테스트 헬퍼 함수
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 실제 구현 시 데이터베이스 모킹 또는 테스트 DB 사용
// const testDb = require('../src/models/db');

// 고유 ID 생성을 위한 카운터
let userIdCounter = 1;

/**
 * 테스트 사용자 생성
 */
async function createTestUser(userData = {}) {
  const defaultUser = {
    email: `test${Date.now()}@example.com`,
    password: await bcrypt.hash('test1234', 10),
    name: '테스트 사용자',
    phone: '010-1234-5678',
    role: 'user',
    ...userData
  };
  
  // 실제 구현 시 데이터베이스에 저장
  // const user = await testDb.query(
  //   'INSERT INTO users (email, password, name, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  //   [defaultUser.email, defaultUser.password, defaultUser.name, defaultUser.phone, defaultUser.role]
  // );
  
  // 모킹된 사용자 반환 (고유 ID 생성)
  return {
    id: userIdCounter++,
    ...defaultUser,
    password: undefined // 비밀번호는 반환하지 않음
  };
}

/**
 * 인증 토큰 생성
 */
async function getAuthToken(user) {
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role || 'user' },
    process.env.JWT_SECRET || 'test_secret',
    { expiresIn: '1h' }
  );
  
  return token;
}

/**
 * 관리자 토큰 생성
 */
async function getAdminToken() {
  const adminUser = {
    id: 999,
    email: 'admin@orderbean.com',
    role: 'admin'
  };
  
  return getAuthToken(adminUser);
}

/**
 * 테스트 매장 생성
 */
async function createTestStore(storeData = {}) {
  const defaultStore = {
    name: '테스트 매장',
    address: '서울시 강남구 테헤란로',
    phone: '02-1234-5678',
    is_active: true,
    ...storeData
  };
  
  // 실제 구현 시 데이터베이스에 저장
  return {
    id: 1,
    ...defaultStore
  };
}

/**
 * 테스트 메뉴 생성
 */
async function createTestMenu(menuData = {}) {
  const defaultMenu = {
    name: '테스트 커피',
    description: '테스트 설명',
    price: 4500,
    category: 'coffee',
    is_available: true,
    ...menuData
  };
  
  // 실제 구현 시 데이터베이스에 저장
  return {
    id: 1,
    ...defaultMenu
  };
}

/**
 * 테스트 데이터 정리
 */
async function cleanupTestData() {
  // 테스트 후 데이터 정리
  // await testDb.query('DELETE FROM orders WHERE user_id IN (SELECT id FROM users WHERE email LIKE $1)', ['test%@example.com']);
  // await testDb.query('DELETE FROM users WHERE email LIKE $1', ['test%@example.com']);
}

module.exports = {
  createTestUser,
  getAuthToken,
  getAdminToken,
  createTestStore,
  createTestMenu,
  cleanupTestData
};

