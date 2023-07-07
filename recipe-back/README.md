## Installation

```bash
$ npm install
```

## Running the app

### DB Server

```bash
# launch local Postgres server
docker-compose up -d

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
