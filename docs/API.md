# OrderBean API 문서

이 문서는 OrderBean 백엔드 API의 엔드포인트를 설명합니다.

## 목차

- [기본 정보](#기본-정보)
- [인증](#인증)
- [API 엔드포인트](#api-엔드포인트)
  - [인증 API](#인증-api)
  - [메뉴 API](#메뉴-api)
  - [주문 API](#주문-api)
  - [레시피 API](#레시피-api)
  - [관리자 API](#관리자-api)
- [에러 처리](#에러-처리)
- [응답 형식](#응답-형식)

## 기본 정보

### Base URL

```
Development: http://localhost:3000/api
Production: https://api.orderbean.com/api
```

### API 버전

현재 API 버전: `v1`

### Content-Type

모든 요청과 응답은 `application/json` 형식을 사용합니다.

## 인증

대부분의 API 엔드포인트는 인증이 필요합니다. JWT(JSON Web Token) 기반 인증을 사용합니다.

### 인증 헤더

인증이 필요한 요청에는 다음 헤더를 포함해야 합니다:

```
Authorization: Bearer <token>
```

### 토큰 획득

로그인 API를 통해 토큰을 획득할 수 있습니다. 자세한 내용은 [인증 API](#인증-api) 섹션을 참조하세요.

## API 엔드포인트

### 인증 API

#### 회원가입

사용자 계정을 생성합니다.

**엔드포인트**: `POST /api/v1/auth/register`

**요청 본문**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "홍길동",
  "phone": "010-1234-5678"
}
```

**응답** (201 Created):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "phone": "010-1234-5678"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 로그인

사용자 인증 및 토큰 발급.

**엔드포인트**: `POST /api/v1/auth/login`

**요청 본문**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 로그아웃

사용자 로그아웃 (토큰 무효화).

**엔드포인트**: `POST /api/v1/auth/logout`

**헤더**: `Authorization: Bearer <token>`

**응답** (200 OK):
```json
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

### 메뉴 API

#### 메뉴 목록 조회

모든 메뉴를 조회합니다. 카테고리별 필터링 및 검색이 가능합니다.

**엔드포인트**: `GET /api/v1/menus`

**쿼리 파라미터**:
- `category` (optional): 메뉴 카테고리 (예: "coffee", "tea", "dessert")
- `search` (optional): 검색 키워드
- `page` (optional): 페이지 번호 (기본값: 1)
- `limit` (optional): 페이지당 항목 수 (기본값: 20)

**예시**: `GET /api/v1/menus?category=coffee&search=라떼&page=1&limit=10`

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "menus": [
      {
        "id": 1,
        "name": "카페 라떼",
        "description": "부드러운 우유와 에스프레소의 조화",
        "price": 4500,
        "category": "coffee",
        "image_url": "https://example.com/images/latte.jpg",
        "is_available": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### 메뉴 상세 조회

특정 메뉴의 상세 정보를 조회합니다.

**엔드포인트**: `GET /api/v1/menus/:id`

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "menu": {
      "id": 1,
      "name": "카페 라떼",
      "description": "부드러운 우유와 에스프레소의 조화",
      "price": 4500,
      "category": "coffee",
      "image_url": "https://example.com/images/latte.jpg",
      "is_available": true,
      "options": {
        "shots": {
          "default": 1,
          "min": 1,
          "max": 5,
          "price_per_shot": 500
        },
        "milk": {
          "types": ["일반우유", "오트밀크", "두유", "코코넛밀크"],
          "default": "일반우유"
        },
        "syrup": {
          "types": ["바닐라", "카라멜", "헤이즐넛"],
          "pumps": {
            "default": 0,
            "max": 5,
            "price_per_pump": 300
          }
        }
      }
    }
  }
}
```

### 주문 API

#### 주문 생성

새로운 주문을 생성합니다.

**엔드포인트**: `POST /api/v1/orders`

**헤더**: `Authorization: Bearer <token>`

**요청 본문**:
```json
{
  "store_id": 1,
  "items": [
    {
      "menu_id": 1,
      "quantity": 2,
      "customizations": {
        "shots": 2,
        "milk": "오트밀크",
        "syrup": {
          "type": "바닐라",
          "pumps": 2
        }
      }
    }
  ],
  "payment_method": "card",
  "payment_info": {
    "card_id": 1
  }
}
```

**응답** (201 Created):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 101,
      "user_id": 1,
      "store_id": 1,
      "status": "접수",
      "total_price": 10600,
      "items": [
        {
          "id": 1,
          "menu_id": 1,
          "menu_name": "카페 라떼",
          "quantity": 2,
          "customizations": {
            "shots": 2,
            "milk": "오트밀크",
            "syrup": {
              "type": "바닐라",
              "pumps": 2
            }
          },
          "price": 10600
        }
      ],
      "created_at": "2024-12-15T10:30:00Z"
    }
  }
}
```

#### 주문 목록 조회

사용자의 주문 내역을 조회합니다.

**엔드포인트**: `GET /api/v1/orders`

**헤더**: `Authorization: Bearer <token>`

**쿼리 파라미터**:
- `status` (optional): 주문 상태 필터
- `page` (optional): 페이지 번호
- `limit` (optional): 페이지당 항목 수

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 101,
        "store_name": "강남점",
        "status": "제조 완료",
        "total_price": 10600,
        "created_at": "2024-12-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15
    }
  }
}
```

#### 주문 상세 조회

특정 주문의 상세 정보를 조회합니다.

**엔드포인트**: `GET /api/v1/orders/:id`

**헤더**: `Authorization: Bearer <token>`

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 101,
      "user_id": 1,
      "store_id": 1,
      "store_name": "강남점",
      "status": "제조 완료",
      "total_price": 10600,
      "items": [
        {
          "id": 1,
          "menu_id": 1,
          "menu_name": "카페 라떼",
          "quantity": 2,
          "customizations": {
            "shots": 2,
            "milk": "오트밀크",
            "syrup": {
              "type": "바닐라",
              "pumps": 2
            }
          },
          "price": 10600
        }
      ],
      "created_at": "2024-12-15T10:30:00Z",
      "updated_at": "2024-12-15T10:35:00Z"
    }
  }
}
```

### 레시피 API

#### 레시피 목록 조회

사용자가 저장한 나만의 레시피 목록을 조회합니다.

**엔드포인트**: `GET /api/v1/recipes`

**헤더**: `Authorization: Bearer <token>`

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "recipes": [
      {
        "id": 1,
        "name": "힘찬 아침 레시피",
        "menu_id": 1,
        "menu_name": "카페 라떼",
        "customizations": {
          "shots": 2,
          "milk": "오트밀크",
          "syrup": {
            "type": "바닐라",
            "pumps": 2
          }
        },
        "created_at": "2024-12-10T08:00:00Z"
      }
    ]
  }
}
```

#### 레시피 생성

새로운 레시피를 저장합니다.

**엔드포인트**: `POST /api/v1/recipes`

**헤더**: `Authorization: Bearer <token>`

**요청 본문**:
```json
{
  "name": "힘찬 아침 레시피",
  "menu_id": 1,
  "customizations": {
    "shots": 2,
    "milk": "오트밀크",
    "syrup": {
      "type": "바닐라",
      "pumps": 2
    }
  }
}
```

**응답** (201 Created):
```json
{
  "success": true,
  "data": {
    "recipe": {
      "id": 1,
      "name": "힘찬 아침 레시피",
      "menu_id": 1,
      "customizations": {
        "shots": 2,
        "milk": "오트밀크",
        "syrup": {
          "type": "바닐라",
          "pumps": 2
        }
      },
      "created_at": "2024-12-15T10:40:00Z"
    }
  }
}
```

#### 레시피로 주문 생성 (재주문)

저장된 레시피를 사용하여 주문을 생성합니다.

**엔드포인트**: `POST /api/v1/recipes/:id/order`

**헤더**: `Authorization: Bearer <token>`

**요청 본문**:
```json
{
  "store_id": 1,
  "quantity": 1,
  "payment_method": "card",
  "payment_info": {
    "card_id": 1
  }
}
```

**응답** (201 Created):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 102,
      "status": "접수",
      "total_price": 10600,
      "created_at": "2024-12-15T10:45:00Z"
    }
  }
}
```

### 관리자 API

#### 주문 상태 업데이트

주문 상태를 업데이트합니다. (관리자만 가능)

**엔드포인트**: `PATCH /api/v1/admin/orders/:id/status`

**헤더**: `Authorization: Bearer <admin_token>`

**요청 본문**:
```json
{
  "status": "제조 중"
}
```

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "order": {
      "id": 101,
      "status": "제조 중",
      "updated_at": "2024-12-15T10:50:00Z"
    }
  }
}
```

#### 메뉴 생성

새로운 메뉴를 생성합니다. (관리자만 가능)

**엔드포인트**: `POST /api/v1/admin/menus`

**헤더**: `Authorization: Bearer <admin_token>`

**요청 본문**:
```json
{
  "name": "아메리카노",
  "description": "진한 에스프레소",
  "price": 4000,
  "category": "coffee",
  "image_url": "https://example.com/images/americano.jpg",
  "is_available": true
}
```

#### 메뉴 수정

메뉴 정보를 수정합니다. (관리자만 가능)

**엔드포인트**: `PUT /api/v1/admin/menus/:id`

**헤더**: `Authorization: Bearer <admin_token>`

#### 메뉴 삭제

메뉴를 삭제합니다. (관리자만 가능)

**엔드포인트**: `DELETE /api/v1/admin/menus/:id`

**헤더**: `Authorization: Bearer <admin_token>`

#### 통계 조회

매출 및 통계 데이터를 조회합니다. (관리자만 가능)

**엔드포인트**: `GET /api/v1/admin/statistics`

**헤더**: `Authorization: Bearer <admin_token>`

**쿼리 파라미터**:
- `start_date` (optional): 시작 날짜 (YYYY-MM-DD)
- `end_date` (optional): 종료 날짜 (YYYY-MM-DD)
- `period` (optional): 기간 (daily, weekly, monthly)

**응답** (200 OK):
```json
{
  "success": true,
  "data": {
    "total_revenue": 1500000,
    "total_orders": 350,
    "popular_menus": [
      {
        "menu_id": 1,
        "menu_name": "카페 라떼",
        "order_count": 120
      }
    ],
    "period": "daily",
    "date_range": {
      "start": "2024-12-01",
      "end": "2024-12-15"
    }
  }
}
```

## 에러 처리

API는 표준 HTTP 상태 코드를 사용합니다.

### 상태 코드

- `200 OK`: 요청 성공
- `201 Created`: 리소스 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스를 찾을 수 없음
- `500 Internal Server Error`: 서버 오류

### 에러 응답 형식

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "이메일 형식이 올바르지 않습니다.",
    "details": {
      "field": "email",
      "reason": "invalid_format"
    }
  }
}
```

## 응답 형식

모든 성공 응답은 다음 형식을 따릅니다:

```json
{
  "success": true,
  "data": {
    // 응답 데이터
  }
}
```

### 페이지네이션

목록 응답에는 페이지네이션 정보가 포함됩니다:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## 참고 사항

- 모든 날짜/시간은 ISO 8601 형식(UTC)을 사용합니다.
- 가격은 원화(KRW) 단위입니다.
- API 요청 제한: 분당 100회 (인증된 사용자), 분당 20회 (비인증 사용자)
- 더 자세한 정보는 [개발 가이드](./DEVELOPMENT.md)를 참조하세요.

