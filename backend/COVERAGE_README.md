# 테스트 커버리지 리포트

이 디렉토리는 Jest가 생성한 테스트 커버리지 리포트를 포함합니다.

## 📊 현재 커버리지

- **Statements**: 97.51%
- **Branches**: 85.04%
- **Functions**: 97.43%
- **Lines**: 97.29%

## 📁 리포트 파일

### HTML 리포트 (권장)
- **위치**: `coverage/lcov-report/index.html`
- **용도**: 브라우저에서 상세 커버리지 확인
- **열기**: 브라우저에서 파일 열기

### LCOV 리포트
- **위치**: `coverage/lcov.info`
- **용도**: CI/CD 통합, 외부 도구 사용

### 텍스트 리포트
- **위치**: 터미널 출력
- **생성**: `npm test -- __tests__/unit --coverage`

## 🚀 커버리지 생성 방법

```bash
# 단위 테스트 커버리지 (권장)
npm test -- __tests__/unit --coverage

# 전체 테스트 커버리지
npm run test:coverage
```

## 📖 상세 문서

- [테스트 커버리지 문서](../../docs/TEST_COVERAGE.md)
- [커버리지 상세 리포트](../../docs/COVERAGE_REPORT.md)

## ✅ 커버리지 목표

| 항목 | 목표 | 현재 | 상태 |
|------|------|------|------|
| Statements | 80% | 97.51% | ✅ |
| Branches | 80% | 85.04% | ✅ |
| Functions | 80% | 97.43% | ✅ |
| Lines | 80% | 97.29% | ✅ |

**모든 목표를 초과 달성했습니다!** 🎉

