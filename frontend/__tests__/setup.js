/**
 * Jest 테스트 설정 파일 (프론트엔드)
 */
require('@testing-library/jest-dom');

// fetch 모킹
global.fetch = jest.fn();

// 환경 변수 설정
process.env.REACT_APP_API_URL = 'http://localhost:3000/api';

