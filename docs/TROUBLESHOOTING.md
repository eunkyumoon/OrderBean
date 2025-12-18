# OrderBean 프론트엔드 문제 해결 가이드

## 🔍 화면이 안 나올 때 확인 사항

### 1. 브라우저 개발자 도구 확인

**F12** 또는 **Ctrl+Shift+I** (Windows) / **Cmd+Option+I** (Mac)로 개발자 도구를 엽니다.

#### Console 탭 확인
- 빨간색 에러 메시지가 있는지 확인
- 다음 메시지들이 보이는지 확인:
  - ✅ "Root element found"
  - ✅ "React app initialized successfully"
  - ✅ "App component rendering..."
  - ✅ "MenuList component rendering..."

#### Network 탭 확인
- `index.html`이 로드되었는지 확인
- `index.jsx`가 로드되었는지 확인
- CSS 파일이 로드되었는지 확인
- 404 에러가 있는지 확인

#### Elements 탭 확인
- `<div id="root">` 요소가 있는지 확인
- root 요소 안에 내용이 있는지 확인

### 2. 테스트 페이지 접속

브라우저에서 다음 URL로 접속해보세요:
- `http://localhost:5173/test`

이 페이지가 보이면 React는 정상 작동 중입니다.

### 3. 서버 재시작

터미널에서:
```bash
# 서버 중지 (Ctrl+C)
# 다시 시작
cd frontend
npm run dev
```

### 4. 캐시 삭제

브라우저에서:
- **Ctrl+Shift+R** (강력 새로고침)
- 또는 개발자 도구 → Network 탭 → "Disable cache" 체크

### 5. 포트 확인

터미널에서 Vite 서버가 실행 중인지 확인:
```
VITE v5.4.21  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## 🐛 일반적인 문제와 해결 방법

### 문제 1: "Cannot find module" 에러

**원인**: 의존성이 설치되지 않음

**해결**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### 문제 2: "Failed to resolve import" 에러

**원인**: 파일 경로 오류 또는 파일 확장자 문제

**해결**:
- 파일 확장자 확인 (`.jsx` vs `.js`)
- import 경로 확인
- 파일이 실제로 존재하는지 확인

### 문제 3: 빈 화면 (흰 화면)

**가능한 원인**:
1. JavaScript 에러로 인한 렌더링 실패
2. CSS가 로드되지 않음
3. 컴포넌트가 렌더링되지 않음

**해결**:
1. 브라우저 콘솔 확인
2. `/test` 경로로 접속해서 테스트
3. `index.html`의 `<div id="root">` 확인

### 문제 4: "Module not found" 에러

**원인**: 파일이 없거나 경로가 잘못됨

**해결**:
- 파일이 실제로 존재하는지 확인
- import 경로가 올바른지 확인
- 대소문자 구분 확인 (Windows는 대소문자 구분 안 함)

## 📝 디버깅 체크리스트

- [ ] Node.js가 설치되어 있음 (`node --version`)
- [ ] 의존성이 설치됨 (`npm install` 완료)
- [ ] Vite 서버가 실행 중 (`npm run dev`)
- [ ] 브라우저에서 `http://localhost:5173` 접속
- [ ] 브라우저 콘솔에 에러 없음
- [ ] Network 탭에서 파일들이 로드됨
- [ ] `/test` 경로가 작동함

## 🔗 관련 문서

- [웹 실행 가이드](./WEB_RUNNING_GUIDE.md)
- [PyCharm 프론트엔드 설정](./PYCHARM_FRONTEND_SETUP.md)

---

**팁**: 문제가 계속되면 브라우저 콘솔의 에러 메시지를 복사해서 확인하세요!

