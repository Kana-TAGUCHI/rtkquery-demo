## Installation

### Docker

https://www.docker.com/

### Nest.js

```bash
npm i -g @nestjs/cli
```

### Dependencies

```bash
$ npm install
```

## Running the app

### DB Server

```bash
# Launch local Postgres server
docker-compose up -d

# Stop local Postgres server (when you want to stop)
docker-compose down

# Prisma Studio
npx prisma studio

# Migration
npn run migrate dev


```

### App Server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### URL

```
API Server: http://localhost:3333/
Prisma Studio: http://localhost:5555/
```
