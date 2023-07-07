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

# Stop local Postgres server
docker-compose down

# Prisma Studio
npx prisma studio


```

### App Server

```bash
# development
$ npm run start

# watch mode (recommend)
$ npm run start:dev

# production mode
$ npm run start:prod
```
