# OrderBean 배포 가이드

이 문서는 OrderBean 프로젝트를 프로덕션 환경에 배포하는 방법을 안내합니다.

## 목차

- [배포 개요](#배포-개요)
- [사전 준비](#사전-준비)
- [배포 환경 구성](#배포-환경-구성)
- [배포 방법](#배포-방법)
- [환경 변수 설정](#환경-변수-설정)
- [데이터베이스 배포](#데이터베이스-배포)
- [모니터링 및 로깅](#모니터링-및-로깅)
- [롤백 절차](#롤백-절차)
- [문제 해결](#문제-해결)

## 배포 개요

### 배포 아키텍처

```
                    ┌─────────────┐
                    │   CDN/      │
                    │  CloudFlare │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Load      │
                    │  Balancer   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐        ┌────▼────┐       ┌────▼────┐
   │Frontend │        │Backend  │       │Database │
   │ Server  │        │ Server  │       │ Server  │
   │(Static) │        │(Node.js)│       │(Postgres)│
   └─────────┘        └─────────┘       └─────────┘
```

### 권장 배포 플랫폼

- **프론트엔드**: Vercel, Netlify, AWS S3 + CloudFront
- **백엔드**: AWS EC2, Heroku, Railway, DigitalOcean
- **데이터베이스**: AWS RDS, PostgreSQL (관리형 서비스)

## 사전 준비

### 필수 요구사항

1. **도메인 및 SSL 인증서**
   - 도메인 등록
   - SSL 인증서 발급 (Let's Encrypt 권장)

2. **클라우드 계정**
   - AWS, Google Cloud, 또는 선택한 플랫폼 계정

3. **CI/CD 파이프라인**
   - GitHub Actions, GitLab CI, 또는 Jenkins 설정

4. **모니터링 도구**
   - 로그 수집: CloudWatch, Datadog, 또는 ELK Stack
   - 에러 추적: Sentry, Rollbar

## 배포 환경 구성

### 환경 분리

- **Development**: 로컬 개발 환경
- **Staging**: 테스트 및 QA 환경
- **Production**: 프로덕션 환경

### 환경별 설정

각 환경은 별도의 환경 변수와 데이터베이스를 사용합니다.

## 배포 방법

### 방법 1: Vercel (프론트엔드) + Railway (백엔드)

#### 프론트엔드 배포 (Vercel)

1. **Vercel 계정 생성 및 프로젝트 연결**

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
cd frontend
vercel
```

2. **환경 변수 설정**
   - Vercel 대시보드에서 환경 변수 설정
   - `VITE_API_URL`: 백엔드 API URL

3. **자동 배포 설정**
   - GitHub 저장소 연결
   - main 브랜치에 push 시 자동 배포

#### 백엔드 배포 (Railway)

1. **Railway 프로젝트 생성**
   - Railway 대시보드에서 새 프로젝트 생성
   - GitHub 저장소 연결

2. **환경 변수 설정**
   - Railway 대시보드에서 환경 변수 설정
   - 데이터베이스 연결 정보 입력

3. **빌드 및 실행 설정**
   - Build Command: `npm install`
   - Start Command: `npm start`

### 방법 2: AWS 배포

#### 프론트엔드 배포 (S3 + CloudFront)

1. **S3 버킷 생성**
```bash
aws s3 mb s3://orderbean-frontend
```

2. **프론트엔드 빌드 및 업로드**
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://orderbean-frontend --delete
```

3. **CloudFront 배포**
   - AWS 콘솔에서 CloudFront 배포 생성
   - S3 버킷을 Origin으로 설정
   - SSL 인증서 연결

#### 백엔드 배포 (EC2)

1. **EC2 인스턴스 생성**
   - Ubuntu 22.04 LTS
   - 최소 t3.small (2GB RAM)

2. **서버 설정**
```bash
# Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 설치 (프로세스 관리)
sudo npm install -g pm2

# 프로젝트 클론
git clone https://github.com/eunkyumoon/OrderBean.git
cd OrderBean/backend
npm install --production

# 환경 변수 설정
cp .env.example .env
# .env 파일 편집
```

3. **PM2로 애플리케이션 실행**
```bash
pm2 start src/index.js --name orderbean-api
pm2 save
pm2 startup
```

4. **Nginx 리버스 프록시 설정**
```nginx
server {
    listen 80;
    server_name api.orderbean.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 방법 3: Docker 배포

#### Dockerfile 작성

**프론트엔드 Dockerfile**:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**백엔드 Dockerfile**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_NAME=orderbean
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=orderbean
      - POSTGRES_USER=orderbean_user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 배포 실행

```bash
docker-compose up -d
```

## 환경 변수 설정

### 프로덕션 환경 변수

`.env.production` 파일 예시:

```env
# 서버 설정
NODE_ENV=production
PORT=3000

# 데이터베이스
DB_HOST=your-db-host.rds.amazonaws.com
DB_PORT=5432
DB_NAME=orderbean
DB_USER=orderbean_user
DB_PASSWORD=secure_password_here

# JWT
JWT_SECRET=very_secure_random_secret_key_min_32_chars

# API URL
API_URL=https://api.orderbean.com

# CORS
CORS_ORIGIN=https://orderbean.com

# 로깅
LOG_LEVEL=info

# 외부 서비스
# SENTRY_DSN=your_sentry_dsn
# AWS_ACCESS_KEY_ID=your_key
# AWS_SECRET_ACCESS_KEY=your_secret
```

### 보안 주의사항

- ⚠️ 환경 변수는 절대 코드에 하드코딩하지 마세요
- ⚠️ 프로덕션 비밀번호는 강력하게 설정하세요
- ⚠️ JWT_SECRET은 최소 32자 이상의 랜덤 문자열을 사용하세요
- ⚠️ 환경 변수는 배포 플랫폼의 보안 기능을 활용하세요

## 데이터베이스 배포

### 프로덕션 데이터베이스 설정

1. **관리형 PostgreSQL 서비스 사용** (권장)
   - AWS RDS
   - Google Cloud SQL
   - DigitalOcean Managed Databases

2. **데이터베이스 생성**
```sql
CREATE DATABASE orderbean_production;
CREATE USER orderbean_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE orderbean_production TO orderbean_user;
```

3. **마이그레이션 실행**
```bash
# 프로덕션 환경 변수 설정
export NODE_ENV=production
export DB_HOST=your-db-host
export DB_NAME=orderbean_production
export DB_USER=orderbean_user
export DB_PASSWORD=secure_password

# 마이그레이션 실행
npm run migrate
```

4. **백업 설정**
   - 자동 백업 스케줄 설정
   - 백업 보관 기간 설정 (최소 30일)

## 모니터링 및 로깅

### 로깅 설정

1. **구조화된 로깅**
   - Winston 또는 Pino 사용
   - JSON 형식으로 로그 출력

2. **로그 수집**
   - CloudWatch (AWS)
   - Datadog
   - ELK Stack

### 모니터링 지표

1. **애플리케이션 메트릭**
   - 응답 시간
   - 에러율
   - 요청 수

2. **인프라 메트릭**
   - CPU 사용률
   - 메모리 사용률
   - 디스크 사용률

3. **에러 추적**
   - Sentry 통합
   - 에러 알림 설정

### 헬스 체크

**엔드포인트**: `GET /api/health`

```json
{
  "status": "ok",
  "timestamp": "2024-12-15T10:00:00Z",
  "database": "connected",
  "uptime": 3600
}
```

## 롤백 절차

### 자동 롤백

CI/CD 파이프라인에서 배포 실패 시 자동 롤백 설정:

```yaml
# GitHub Actions 예시
- name: Deploy
  run: |
    # 배포 스크립트
    if [ $? -ne 0 ]; then
      # 롤백 실행
      ./rollback.sh
    fi
```

### 수동 롤백

1. **이전 버전으로 복원**
```bash
# Git 태그로 이전 버전 확인
git tag

# 이전 버전으로 체크아웃
git checkout v1.0.0

# 재배포
npm run deploy
```

2. **데이터베이스 롤백**
```bash
# 마이그레이션 롤백
npm run migrate:rollback
```

## 문제 해결

### 일반적인 문제

#### 1. 배포 후 502 Bad Gateway

**원인**: 백엔드 서버가 실행되지 않음

**해결**:
```bash
# 서버 상태 확인
pm2 status

# 로그 확인
pm2 logs orderbean-api

# 서버 재시작
pm2 restart orderbean-api
```

#### 2. 데이터베이스 연결 실패

**원인**: 방화벽 설정 또는 잘못된 연결 정보

**해결**:
- 보안 그룹/방화벽 규칙 확인
- 데이터베이스 연결 정보 확인
- VPC 설정 확인 (AWS)

#### 3. 환경 변수 누락

**원인**: 환경 변수가 설정되지 않음

**해결**:
- 배포 플랫폼의 환경 변수 설정 확인
- `.env` 파일 확인

### 디버깅 팁

1. **로그 확인**
```bash
# 애플리케이션 로그
pm2 logs

# 시스템 로그
journalctl -u orderbean-api
```

2. **연결 테스트**
```bash
# 데이터베이스 연결 테스트
psql -h $DB_HOST -U $DB_USER -d $DB_NAME

# API 엔드포인트 테스트
curl https://api.orderbean.com/api/health
```

## 배포 체크리스트

배포 전 확인사항:

- [ ] 모든 테스트 통과
- [ ] 환경 변수 설정 완료
- [ ] 데이터베이스 마이그레이션 준비
- [ ] SSL 인증서 설정
- [ ] 도메인 DNS 설정
- [ ] 백업 설정 완료
- [ ] 모니터링 설정 완료
- [ ] 롤백 계획 수립
- [ ] 문서 업데이트

## 참고 자료

- [Vercel 배포 가이드](https://vercel.com/docs)
- [AWS 배포 가이드](https://aws.amazon.com/getting-started/)
- [Docker 공식 문서](https://docs.docker.com/)
- [PM2 문서](https://pm2.keymetrics.io/docs/)

---

**배포 관련 문의사항은 GitHub Issues에 등록해주세요.**

