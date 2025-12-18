# OrderBean 리포트 모음

이 문서는 OrderBean 프로젝트의 모든 리포트 파일에 대한 빠른 접근을 제공합니다.

## 📊 리포트 목록

### 테스트 관련 리포트

1. **[테스트 리포트](docs/TEST_REPORT.md)**
   - 테스트 실행 결과 상세
   - 테스트 케이스별 결과
   - 실행 통계

2. **[테스트 커버리지](docs/TEST_COVERAGE.md)**
   - 커버리지 요약
   - 파일별 커버리지
   - 개선 계획

3. **[커버리지 상세 리포트](docs/COVERAGE_REPORT.md)**
   - 상세 커버리지 분석
   - 파일별 상세 정보
   - 개선 사항

### 프로젝트 현황 리포트

4. **[프로젝트 현황](docs/PROJECT_STATUS.md)**
   - 프로젝트 진행 상황
   - 완료된 작업
   - 다음 단계

5. **[리포트 인덱스](docs/REPORTS_INDEX.md)**
   - 모든 리포트 파일 목록
   - 리포트 생성 방법

### 프런트엔드 관련 리포트

6. **[프런트엔드 리팩토링 결과](FRONTEND_REFACTORING_REPORT.md)**
   - 리팩토링 작업 결과 상세
   - 생성/수정된 파일 목록
   - 개선 효과 및 통계
   - Before/After 코드 비교

## 📁 JSON 리포트

- `backend/test-results.json` - Jest 테스트 결과 (JSON)
- `backend/test-report.json` - 테스트 리포트 요약 (JSON)
- `backend/coverage-summary.json` - 커버리지 요약 (JSON)

## 📈 HTML 리포트

- `backend/coverage/lcov-report/index.html` - 커버리지 HTML 리포트

## 🚀 빠른 접근

### 테스트 결과 확인
```bash
# 테스트 실행 및 리포트 생성
cd backend
npm test -- __tests__/unit --coverage

# HTML 리포트 열기
start coverage/lcov-report/index.html
```

### 리포트 문서 확인
- [테스트 리포트](docs/TEST_REPORT.md) - 테스트 결과 상세
- [프로젝트 현황](docs/PROJECT_STATUS.md) - 진행 상황

---

**마지막 업데이트**: 2024-12-16

### 최근 리포트

- **[프런트엔드 리팩토링 결과](FRONTEND_REFACTORING_REPORT.md)** - 높은 우선순위 리팩토링 작업 완료 (2024-12-16)


