# Frontend 테스트

이 디렉토리는 프론트엔드 테스트 파일을 포함합니다.

## 테스트 구조

```
__tests__/
├── unit/              # 단위 테스트
│   ├── components/    # 컴포넌트 테스트
│   ├── services/      # 서비스 테스트
│   └── utils/         # 유틸리티 테스트
├── e2e/               # E2E 테스트
├── setup.js           # 테스트 설정
└── README.md          # 이 파일
```

## 테스트 실행

```bash
# 모든 테스트 실행
npm test

# Watch 모드
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage

# 단위 테스트만 실행
npm run test:unit
```

## 테스트 작성 가이드

자세한 내용은 [테스트 가이드](../../docs/TESTING.md)를 참조하세요.

