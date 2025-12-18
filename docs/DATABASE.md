# OrderBean 데이터베이스 스키마 문서

이 문서는 OrderBean 프로젝트의 데이터베이스 스키마를 상세히 설명합니다.

## 목차

- [데이터베이스 개요](#데이터베이스-개요)
- [ERD (Entity Relationship Diagram)](#erd-entity-relationship-diagram)
- [테이블 스키마](#테이블-스키마)
- [인덱스](#인덱스)
- [제약 조건](#제약-조건)
- [마이그레이션](#마이그레이션)

## 데이터베이스 개요

### 데이터베이스 시스템

- **개발 환경**: PostgreSQL 14+ (권장) 또는 SQLite (간단한 테스트용)
- **프로덕션 환경**: PostgreSQL 14+

### 데이터베이스명

```
orderbean
```

### 문자 인코딩

```
UTF-8
```

## ERD (Entity Relationship Diagram)

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Users   │         │  Stores  │         │  Menus   │
├──────────┤         ├──────────┤         ├──────────┤
│ id (PK)  │         │ id (PK)  │         │ id (PK)  │
│ email    │         │ name     │         │ name     │
│ password │         │ address  │         │ price    │
│ name     │         │ phone    │         │ category │
│ phone    │         │ is_active│         │          │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │                    │                    │
     │ 1:N                │ 1:N                │ 1:N
     │                    │                    │
┌────▼─────┐         ┌────▼─────┐         ┌────▼─────┐
│  Orders  │         │OrderItems│         │ Recipes  │
├──────────┤         ├──────────┤         ├──────────┤
│ id (PK)  │         │ id (PK)  │         │ id (PK)  │
│ user_id  │◄────────│order_id  │         │ user_id  │
│ store_id │◄────────│menu_id   │◄────────│ menu_id  │
│ status   │         │quantity  │         │ name     │
│ total    │         │customize │         │customize │
└──────────┘         └──────────┘         └──────────┘
```

## 테이블 스키마

### Users (사용자)

사용자 계정 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 사용자 고유 ID |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 이메일 주소 |
| password | VARCHAR(255) | NOT NULL | 해시된 비밀번호 |
| name | VARCHAR(100) | NOT NULL | 사용자 이름 |
| phone | VARCHAR(20) | | 전화번호 |
| role | VARCHAR(20) | DEFAULT 'user' | 사용자 역할 (user, admin) |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 일시 |

**인덱스**:
- `idx_users_email`: email (UNIQUE)

**예시 데이터**:
```sql
INSERT INTO users (email, password, name, phone) 
VALUES ('user@example.com', '$2b$10$...', '홍길동', '010-1234-5678');
```

### Stores (매장)

매장 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 매장 고유 ID |
| name | VARCHAR(100) | NOT NULL | 매장명 |
| address | VARCHAR(255) | NOT NULL | 매장 주소 |
| phone | VARCHAR(20) | | 매장 전화번호 |
| latitude | DECIMAL(10, 8) | | 위도 |
| longitude | DECIMAL(11, 8) | | 경도 |
| is_active | BOOLEAN | DEFAULT true | 활성화 여부 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 일시 |

**인덱스**:
- `idx_stores_is_active`: is_active

### Menus (메뉴)

메뉴 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 메뉴 고유 ID |
| name | VARCHAR(100) | NOT NULL | 메뉴명 |
| description | TEXT | | 메뉴 설명 |
| price | INTEGER | NOT NULL | 가격 (원) |
| category | VARCHAR(50) | NOT NULL | 카테고리 (coffee, tea, dessert 등) |
| image_url | VARCHAR(500) | | 이미지 URL |
| is_available | BOOLEAN | DEFAULT true | 판매 가능 여부 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 일시 |

**인덱스**:
- `idx_menus_category`: category
- `idx_menus_is_available`: is_available
- `idx_menus_category_available`: (category, is_available)

### Orders (주문)

주문 정보를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 주문 고유 ID |
| user_id | BIGINT | NOT NULL, FK → users.id | 사용자 ID |
| store_id | BIGINT | NOT NULL, FK → stores.id | 매장 ID |
| status | VARCHAR(20) | NOT NULL, DEFAULT '접수' | 주문 상태 |
| total_price | INTEGER | NOT NULL | 총 주문 금액 |
| payment_method | VARCHAR(50) | NOT NULL | 결제 수단 |
| payment_status | VARCHAR(20) | DEFAULT 'pending' | 결제 상태 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 일시 |

**주문 상태 값**:
- `접수`: 주문이 접수됨
- `제조 중`: 음료 제조 중
- `제조 완료`: 제조 완료, 픽업 대기
- `픽업 완료`: 고객이 픽업 완료
- `취소`: 주문 취소

**인덱스**:
- `idx_orders_user_id`: user_id
- `idx_orders_store_id`: store_id
- `idx_orders_status`: status
- `idx_orders_created_at`: created_at
- `idx_orders_user_created`: (user_id, created_at)

**외래 키**:
- `fk_orders_user`: user_id → users(id) ON DELETE CASCADE
- `fk_orders_store`: store_id → stores(id) ON DELETE RESTRICT

### OrderItems (주문 항목)

주문에 포함된 메뉴 항목을 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 주문 항목 고유 ID |
| order_id | BIGINT | NOT NULL, FK → orders.id | 주문 ID |
| menu_id | BIGINT | NOT NULL, FK → menus.id | 메뉴 ID |
| quantity | INTEGER | NOT NULL, DEFAULT 1 | 수량 |
| customizations | JSONB | | 커스터마이징 옵션 |
| price | INTEGER | NOT NULL | 항목 가격 |

**커스터마이징 JSON 구조**:
```json
{
  "shots": 2,
  "milk": "오트밀크",
  "syrup": {
    "type": "바닐라",
    "pumps": 2
  },
  "ice": "regular",
  "size": "large"
}
```

**인덱스**:
- `idx_order_items_order_id`: order_id
- `idx_order_items_menu_id`: menu_id

**외래 키**:
- `fk_order_items_order`: order_id → orders(id) ON DELETE CASCADE
- `fk_order_items_menu`: menu_id → menus(id) ON DELETE RESTRICT

### Recipes (나만의 레시피)

사용자가 저장한 커스터마이징 레시피를 저장합니다.

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 레시피 고유 ID |
| user_id | BIGINT | NOT NULL, FK → users.id | 사용자 ID |
| menu_id | BIGINT | NOT NULL, FK → menus.id | 메뉴 ID |
| name | VARCHAR(100) | NOT NULL | 레시피 이름 |
| customizations | JSONB | NOT NULL | 커스터마이징 옵션 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 일시 |

**인덱스**:
- `idx_recipes_user_id`: user_id
- `idx_recipes_menu_id`: menu_id
- `idx_recipes_user_menu`: (user_id, menu_id)

**외래 키**:
- `fk_recipes_user`: user_id → users(id) ON DELETE CASCADE
- `fk_recipes_menu`: menu_id → menus(id) ON DELETE RESTRICT

## 인덱스

### 성능 최적화를 위한 인덱스

1. **사용자 이메일 검색**: `users.email` (UNIQUE)
2. **주문 조회**: `orders.user_id`, `orders.status`, `orders.created_at`
3. **메뉴 카테고리 필터링**: `menus.category`, `menus.is_available`
4. **레시피 조회**: `recipes.user_id`

### 복합 인덱스

- `(orders.user_id, orders.created_at)`: 사용자별 주문 내역 조회 최적화
- `(menus.category, menus.is_available)`: 카테고리별 활성 메뉴 조회

## 제약 조건

### 데이터 무결성 제약

1. **이메일 중복 방지**: `users.email` UNIQUE
2. **가격 양수**: `menus.price > 0`, `orders.total_price > 0`
3. **수량 양수**: `order_items.quantity > 0`
4. **주문 상태 유효성**: CHECK 제약으로 허용된 상태 값만 저장

### 참조 무결성

- 모든 외래 키는 CASCADE 또는 RESTRICT 정책을 따릅니다.
- 사용자 삭제 시: 주문은 유지, 레시피는 삭제 (CASCADE)
- 메뉴 삭제 시: 주문 항목은 유지, 레시피는 삭제 (RESTRICT)

## 마이그레이션

### 마이그레이션 파일 구조

마이그레이션 파일은 `database/migrations/` 디렉토리에 저장됩니다.

**파일 명명 규칙**:
```
YYYYMMDDHHMMSS_description.sql
```

**예시**:
- `20241215000001_create_users_table.sql`
- `20241215000002_create_stores_table.sql`
- `20241215000003_create_menus_table.sql`
- `20241215000004_create_orders_table.sql`
- `20241215000005_create_order_items_table.sql`
- `20241215000006_create_recipes_table.sql`
- `20241215000007_create_indexes.sql`

### 마이그레이션 실행

```bash
# 마이그레이션 실행
npm run migrate

# 롤백 (구현 시)
npm run migrate:rollback
```

### 시드 데이터

개발 및 테스트를 위한 초기 데이터는 `database/seeds/` 디렉토리에 저장합니다.

**예시 시드 파일**:
- `01_users.sql`
- `02_stores.sql`
- `03_menus.sql`

## 데이터베이스 백업

### 백업 전략

1. **일일 자동 백업**: 프로덕션 환경에서 매일 자정 실행
2. **트랜잭션 로그**: 모든 변경사항 로깅
3. **백업 보관**: 최소 30일간 보관

### 백업 명령어

```bash
# PostgreSQL 백업
pg_dump -U orderbean_user -d orderbean > backup_$(date +%Y%m%d).sql

# 복원
psql -U orderbean_user -d orderbean < backup_20241215.sql
```

## 성능 최적화

### 쿼리 최적화 팁

1. **인덱스 활용**: WHERE, JOIN, ORDER BY 절에서 인덱스 사용
2. **페이지네이션**: 대량 데이터 조회 시 LIMIT/OFFSET 사용
3. **JSONB 활용**: 커스터마이징 데이터는 JSONB로 저장하여 효율적 검색

### 모니터링

- 느린 쿼리 로깅 활성화
- 인덱스 사용률 모니터링
- 테이블 크기 및 성장률 추적

## 참고 자료

- [PostgreSQL 공식 문서](https://www.postgresql.org/docs/)
- [데이터베이스 마이그레이션 가이드](../database/README.md)
- [API 문서](./API.md)

