# TDD (Test-Driven Development) 진행 계획

## 진행 원칙

1. **Red**: 테스트 작성 및 실행 (실패 확인)
2. **Green**: 최소한의 코드 작성 (테스트 통과)
3. **Refactor**: 코드 개선

## 단계별 진행 계획

### Phase 1: 환경 설정 및 기본 인프라
- [ ] 의존성 설치
- [ ] 기본 프로젝트 구조 설정
- [ ] 테스트 실행 환경 확인

### Phase 2: 유틸리티 함수 (가장 간단한 것부터)
- [ ] `orderUtils.js` - 주문 관련 유틸리티
  - calculateTotalPrice
  - validateOrderItems
  - formatOrderStatus
  - calculateCustomizationPrice

### Phase 3: 유효성 검사 유틸리티 (프론트엔드)
- [ ] `validators.js` - 입력 유효성 검사
  - validateEmail
  - validatePassword
  - validatePhone
  - validatePrice

### Phase 4: 서비스 레이어 (백엔드)
- [ ] `menuService.js` - 메뉴 서비스
- [ ] `orderService.js` - 주문 서비스
- [ ] `recipeService.js` - 레시피 서비스

### Phase 5: API 레이어
- [ ] Express 서버 설정
- [ ] 라우트 설정
- [ ] 컨트롤러 구현
- [ ] 미들웨어 (인증, 에러 처리)

### Phase 6: 통합 테스트
- [ ] API 통합 테스트 통과
- [ ] E2E 테스트 (선택사항)

## 진행 순서

각 Phase는 다음 순서로 진행됩니다:

1. **테스트 실행** → 실패 확인 (Red)
2. **최소 구현** → 테스트 통과 (Green)
3. **리팩토링** → 코드 개선
4. **다음 단계로 진행**

## 예상 소요 시간

- Phase 1: 30분
- Phase 2: 1시간
- Phase 3: 30분
- Phase 4: 3-4시간
- Phase 5: 2-3시간
- Phase 6: 1-2시간

**총 예상 시간**: 8-11시간

