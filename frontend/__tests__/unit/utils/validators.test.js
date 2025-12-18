/**
 * 유효성 검사 유틸리티 테스트
 */
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validatePrice
} from '../../../src/utils/validators';

describe('Validators', () => {
  describe('validateEmail', () => {
    test('유효한 이메일', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@example.co.kr')).toBe(true);
    });
    
    test('유효하지 않은 이메일', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });
  
  describe('validatePassword', () => {
    test('유효한 비밀번호 (8자 이상)', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('SecurePass!')).toBe(true);
    });
    
    test('유효하지 않은 비밀번호', () => {
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });
  
  describe('validatePhone', () => {
    test('유효한 전화번호', () => {
      expect(validatePhone('010-1234-5678')).toBe(true);
      expect(validatePhone('02-1234-5678')).toBe(true);
      expect(validatePhone('01012345678')).toBe(true);
    });
    
    test('유효하지 않은 전화번호', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('010-123-456')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });
  
  describe('validatePrice', () => {
    test('유효한 가격', () => {
      expect(validatePrice(1000)).toBe(true);
      expect(validatePrice(0)).toBe(true);
    });
    
    test('유효하지 않은 가격', () => {
      expect(validatePrice(-1000)).toBe(false);
      expect(validatePrice('not a number')).toBe(false);
    });
  });
});

