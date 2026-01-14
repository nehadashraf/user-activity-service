# User Activity Microservice

Event-driven microservice for processing user activities using **Node.js**, **Kafka**, **MongoDB**, and **Domain-Driven Design (DDD)**.

### System Overview
```
User Request → API Server → Kafka (3 Partitions) → Consumer → MongoDB → API Response
```

### Key Components

1. **API Server**
2. **Kafka**
3. **Consumer**
4. **MongoDB**

### Domain-Driven Design
```
src/
├── domain/             
│   ├── models/         
│   ├── repositories/   
│   └── services/       
├── infrastructure/    
│   ├── kafka/          
│   └── database/     
├── interfaces/         
│   └── http/         
└── application/        
```

## Setup Instructions

### Prerequisites

- **Node.js** 18+
- **Docker** & **Docker Compose**
- **Git**

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Health Check
```bash
GET /health
```
### 2. Create Activity
```bash
POST /api/activities
Content-Type: application/json
```
**Request Body**:
```json
{
  "userId": "user123",
  "activityType": "login",
  "metadata": {
    "device": "mobile",
    "ip": "192.168.1.1"
  }
}
```
**Activity Types**: `login`, `logout`, `purchase`, `page_view`, `other`

---


### 3. Get Activities
```bash
GET /api/activities?userId=user123&activityType=login&page=1&limit=10
```

**Query Parameters**:
- `userId` (optional): Filter by user ID
- `activityType` (optional): Filter by activity type
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page
---
## 🐳 Docker

### Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| **zookeeper** | `confluentinc/cp-zookeeper:7.5.0` | 2181 | Kafka coordination |
| **kafka** | `confluentinc/cp-kafka:7.5.0` | 9092 | Message broker (3 partitions) |
| **mongodb** | `mongo:7.0` | 27017 | Database |
| **api** | Custom build | 3000 | REST API server |
| **consumer** | Custom build | - | Kafka consumer |

### Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker logs activity-api -f
docker logs activity-consumer -f

# Stop all services
docker-compose down

# Stop and remove volumes (clears data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

---
## 📁 Project Structure
```
user-activity-service/
├── src/
│   ├── domain/                      # Business logic layer
│   │   ├── models/
│   │   │   └── Activity.js         # Mongoose schema
│   │   ├── repositories/
│   │   │   └── ActivityRepository.js  # Data access
│   │   └── services/
│   │       └── ActivityService.js  # Business rules
│   ├── infrastructure/              # External dependencies
│   │   ├── kafka/
│   │   │   ├── producer.js         # Kafka producer
│   │   │   └── consumer.js         # Kafka consumer
│   │   └── database/
│   │       └── mongodb.js          # MongoDB connection
│   ├── interfaces/                  # External communication
│   │   └── http/
│   │       ├── controllers/
│   │       │   └── ActivityController.js
│   │       └── routes/
│   │           └── activities.js
│   ├── app.js                       # Express setup
│   ├── server.js                    # API server entry
│   └── consumer.js                  # Consumer entry
├── kubernetes/
│   └── deployment.yaml              # K8s deployment config
├── .env.example                     # Environment template
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```
