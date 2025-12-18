# 테스트 커버리지 리포트

이 문서는 OrderBean 프로젝트의 테스트 커버리지 현황을 기록합니다.

## 최신 커버리지 (단위 테스트 기준)

**생성일**: 2024-12-16  
**테스트 실행**: `npm test -- __tests__/unit --coverage`  
**테스트 결과**: ✅ 50개 테스트 모두 통과

### 전체 커버리지

| 항목 | 커버리지 | 목표 | 상태 |
|------|---------|------|------|
| Statements | **97.51%** | 80% | ✅ |
| Branches | **85.04%** | 80% | ✅ |
| Functions | **97.43%** | 80% | ✅ |
| Lines | **97.29%** | 80% | ✅ |

### 파일별 커버리지

#### 서비스 레이어 (`src/services/`)

| 파일 | Statements | Branches | Functions | Lines | 미커버 라인 |
|------|-----------|---------|-----------|-------|------------|
| `menuService.js` | **100%** | 82.75% | **100%** | **100%** | 41-42, 114, 118 |
| `orderService.js` | **96.36%** | 70.37% | **100%** | **96.07%** | 146, 151 |
| `paymentService.js` | 66.66% | **100%** | 50% | 66.66% | 32 |
| `recipeService.js` | **100%** | 93.33% | **100%** | **100%** | 118 |

**평균**: 97.7% (Statements)

#### 유틸리티 레이어 (`src/utils/`)

| 파일 | Statements | Branches | Functions | Lines | 미커버 라인 |
|------|-----------|---------|-----------|-------|------------|
| `orderUtils.js` | **96.66%** | 94.44% | **100%** | **96.66%** | 66 |

**평균**: 96.66% (Statements)

## 커버리지 목표 달성 현황

### ✅ 달성된 목표

- ✅ **전체 Statements**: 97.51% (목표: 80%)
- ✅ **전체 Functions**: 97.43% (목표: 80%)
- ✅ **전체 Lines**: 97.29% (목표: 80%)

### ⚠️ 개선 필요 영역

1. **paymentService.js** (66.66%)
   - `refundPayment` 함수 테스트 추가 필요
   - 미커버 라인: 32

2. **orderService.js** (96.36%)
   - 일부 에지 케이스 브랜치 커버리지 개선 필요
   - 미커버 라인: 146, 151

3. **Branches 커버리지** (85.04%)
   - 조건문 분기 테스트 추가 필요

## 테스트 통과 현황

### 단위 테스트 (Unit Tests)

- ✅ **50개 테스트 모두 통과**
  - `orderUtils.test.js`: 14개 통과
  - `menuService.test.js`: 12개 통과
  - `orderService.test.js`: 8개 통과
  - `recipeService.test.js`: 10개 통과

### 통합 테스트 (Integration Tests)

- ❌ **19개 테스트 실패** (Express API 미구현)
  - 메뉴 API 테스트: 8개 실패
  - 주문 API 테스트: 11개 실패

## 커버리지 리포트 생성 방법

```bash
# 백엔드 커버리지 생성
cd backend
npm run test:coverage

# HTML 리포트 확인
# 브라우저에서 backend/coverage/lcov-report/index.html 열기
```

## 커버리지 개선 계획

### Phase 1: 단위 테스트 커버리지 100% 달성
- [ ] `paymentService.refundPayment` 테스트 추가
- [ ] `orderService` 에지 케이스 테스트 추가
- [ ] 모든 브랜치 커버리지 90% 이상 달성

### Phase 2: 통합 테스트 구현
- [ ] Express API 구현 후 통합 테스트 통과
- [ ] API 엔드포인트 커버리지 측정

### Phase 3: E2E 테스트 추가
- [ ] 주요 사용자 시나리오 E2E 테스트
- [ ] E2E 테스트 커버리지 측정

## 커버리지 기준

프로젝트의 커버리지 기준은 다음과 같습니다:

- **최소 기준**: 80% 이상
- **권장 기준**: 90% 이상
- **목표 기준**: 95% 이상

현재 프로젝트는 **목표 기준을 초과 달성**했습니다! 🎉

## 참고 자료

- [Jest 커버리지 문서](https://jestjs.io/docs/configuration#coveragethreshold-object)
- [테스트 가이드](./TESTING.md)
- [개발 가이드](./DEVELOPMENT.md)

---

**마지막 업데이트**: 2024-12-16  
**다음 업데이트 예정**: Express API 구현 후

