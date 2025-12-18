/**
 * 커스터마이제이션 유틸리티 함수
 * 커스터마이제이션 옵션을 텍스트로 포맷팅하는 함수들
 */

import { CUSTOMIZATION_LABELS } from '../constants';

/**
 * 커스터마이제이션 옵션을 읽기 쉬운 텍스트로 변환
 * @param {Object} customizations - 커스터마이제이션 옵션 객체
 * @returns {string} 포맷팅된 커스터마이제이션 텍스트 (예: " (샷 추가, 시럽 추가)")
 */
export const formatCustomizations = (customizations = {}) => {
  const texts = [];
  
  if (customizations.extra_shot) {
    texts.push(CUSTOMIZATION_LABELS.EXTRA_SHOT);
  }
  
  if (customizations.extra_syrup) {
    texts.push(CUSTOMIZATION_LABELS.EXTRA_SYRUP);
  }
  
  return texts.length > 0 ? ` (${texts.join(', ')})` : '';
};

/**
 * 두 커스터마이제이션 객체가 동일한지 비교
 * @param {Object} customizations1 - 첫 번째 커스터마이제이션 객체
 * @param {Object} customizations2 - 두 번째 커스터마이제이션 객체
 * @returns {boolean} 두 객체가 동일한지 여부
 */
export const compareCustomizations = (customizations1 = {}, customizations2 = {}) => {
  return (
    customizations1.extra_shot === customizations2.extra_shot &&
    customizations1.extra_syrup === customizations2.extra_syrup
  );
};

