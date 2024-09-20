# Localhost

Instructions to use local environment.

## Prerequisites

- [Nodejs](https://nodejs.org/en)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running

Run in terminal:

```shell
docker-compose up -d
```

In `api` dir:

```shell
npm i
npx prisma migrate deploy
npm run dev
```

To destroy the env:

```shell
docker-compose down -v
```

## Adminer Access

To access database management go to `http://localhost:8080/` after start the env.

Access data:

- System: PostgreSQL
- Server: postgres
- Username: admin
- Password: password
- Database: demeter
