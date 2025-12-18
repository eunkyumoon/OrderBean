# OrderBean 리포트 인덱스

이 문서는 OrderBean 프로젝트의 모든 리포트 파일을 정리합니다.

## 📊 리포트 목록

### 1. 테스트 리포트
- **파일**: [TEST_REPORT.md](./TEST_REPORT.md)
- **내용**: 테스트 실행 결과, 테스트 케이스 상세, 커버리지 요약
- **용도**: 테스트 결과 확인, 품질 평가

### 2. 테스트 커버리지 리포트
- **파일**: [TEST_COVERAGE.md](./TEST_COVERAGE.md)
- **내용**: 커버리지 현황, 파일별 커버리지, 개선 계획
- **용도**: 코드 커버리지 확인, 테스트 품질 평가

### 3. 커버리지 상세 리포트
- **파일**: [COVERAGE_REPORT.md](./COVERAGE_REPORT.md)
- **내용**: 상세 커버리지 분석, 파일별 상세 정보, 개선 사항
- **용도**: 상세 커버리지 분석, 개선 영역 식별

### 4. 프로젝트 현황 리포트
- **파일**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **내용**: 프로젝트 진행 상황, 완료된 작업, 다음 단계
- **용도**: 프로젝트 진행 상황 파악, 계획 수립

## 📁 JSON 리포트

### 백엔드 리포트
- `backend/test-results.json` - Jest 테스트 결과 (JSON)
- `backend/test-report.json` - 테스트 리포트 요약 (JSON)
- `backend/coverage-summary.json` - 커버리지 요약 (JSON)

## 📈 HTML 리포트

### 커버리지 HTML 리포트
- **위치**: `backend/coverage/lcov-report/index.html`
- **생성**: `npm test -- __tests__/unit --coverage`
- **용도**: 브라우저에서 상세 커버리지 확인

## 🔄 리포트 생성 방법

### 테스트 리포트
```bash
cd backend
npm test -- __tests__/unit --coverage
```

### JSON 리포트
```bash
npm test -- __tests__/unit --coverage --json --outputFile=test-results.json
```

### HTML 리포트
```bash
npm test -- __tests__/unit --coverage
# 브라우저에서 coverage/lcov-report/index.html 열기
```

## 📅 리포트 업데이트 주기

- **테스트 리포트**: 테스트 실행 후
- **커버리지 리포트**: 커버리지 측정 후
- **프로젝트 현황**: 주요 마일스톤 달성 시

## 📊 최신 리포트 요약

### 테스트 결과
- 총 테스트: 50개
- 통과: 50개 (100%)
- 실패: 0개

### 커버리지
- Statements: 97.51%
- Branches: 85.04%
- Functions: 97.43%
- Lines: 97.29%

### 프로젝트 진행률
- 전체 진행률: 약 60%
- 백엔드 서비스: 100%
- 단위 테스트: 100%
- API 레이어: 0% (다음 단계)

---

**마지막 업데이트**: 2024-12-16

