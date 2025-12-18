# 프론트엔드 빈 화면 문제 해결 가이드

## 문제 증상
브라우저에서 `localhost:5173`에 접속했을 때 빈 화면이 표시됩니다.

## 해결 방법

### 1. 브라우저 콘솔 확인 (가장 중요!)
1. 브라우저에서 **F12** 키를 눌러 개발자 도구를 엽니다
2. **Console** 탭을 확인합니다
3. 다음 메시지들이 순서대로 나타나야 합니다:
   - `📄 index.html loaded`
   - `🚀 index.jsx loaded`
   - `✅ Root element found`
   - `📦 App.jsx loaded`
   - `🔄 App component rendering...`
   - `📄 MenuList component rendering...`

### 2. 에러 메시지 확인
콘솔에 빨간색 에러 메시지가 있다면:
- 에러 메시지를 복사해서 확인하세요
- 일반적인 에러:
  - `Cannot find module`: 파일 경로 문제
  - `Unexpected token`: 문법 오류
  - `Failed to fetch`: API 연결 문제 (무시 가능, 기본 메뉴 사용)

### 3. Vite 서버 재시작
터미널에서:
```bash
# 현재 서버 중지 (Ctrl+C)
cd frontend
npm run dev
```

### 4. 브라우저 캐시 삭제
- **Ctrl+Shift+R** (강력 새로고침)
- 또는 브라우저 설정에서 캐시 삭제

### 5. 파일 확인
다음 파일들이 존재하는지 확인:
- `frontend/src/index.jsx`
- `frontend/src/App.jsx`
- `frontend/src/pages/MenuList.jsx`
- `frontend/src/components/Header.jsx`
- `frontend/src/components/MenuCard.jsx`
- `frontend/src/components/Cart.jsx`
- `frontend/src/styles/App.css`

### 6. 포트 확인
다른 프로그램이 5173 포트를 사용 중일 수 있습니다:
```bash
# Windows PowerShell
netstat -ano | findstr :5173
```

### 7. Node 모듈 재설치
```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

## 예상되는 정상 동작
1. 브라우저 콘솔에 로그 메시지들이 순서대로 표시됨
2. 화면에 헤더가 표시됨 ("OrderBean - 커피 주문")
3. 메뉴 카드들이 표시됨 (아메리카노 ICE, 아메리카노 HOT, 카페라떼 등)
4. 하단에 장바구니가 표시됨

## 추가 디버깅
문제가 계속되면 브라우저 콘솔의 전체 에러 메시지를 복사해서 확인하세요.
