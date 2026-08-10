# Buky API

API REST para autenticacion de usuarios, consulta de servicios, consulta de horarios y gestion de reservas.

El proyecto esta desarrollado con Node.js, Express, TypeScript y MySQL. La aplicacion sigue una estructura por modulos, separando rutas, controladores, servicios, repositorios, validaciones y middlewares.

## Stack

- Node.js
- TypeScript
- Express
- MySQL
- mysql2
- Zod
- JWT
- bcryptjs
- dotenv
- uuid
- Docker

## Estructura del proyecto

```txt
buky-api/
  src/
    index.ts
    app.ts
    core/
      config/
      constants/
      error-http/
      helpers/
      middlewares/
      repositories/
      security/
    modules/
      authentication/
      bookings/
      schedules/
      services/
    types/
  Dockerfile.prod
  docker-compose.yml
  package.json
  tsconfig.json
```

### Archivos principales

- `src/index.ts`: punto de entrada de la aplicacion. Inicializa el servidor y valida la conexion a MySQL.
- `src/app.ts`: configura Express, JSON parser, middlewares globales y modulos principales.
- `src/core/config`: configuracion compartida, actualmente la conexion a MySQL.
- `src/core/middlewares`: middlewares reutilizables.
- `src/core/security`: generacion y validacion de tokens JWT.
- `src/core/repositories`: acceso a datos y consultas SQL.
- `src/core/error-http`: manejo centralizado de errores HTTP.
- `src/modules`: modulos funcionales de la API.
- `Dockerfile.prod`: build productivo de la aplicacion.
- `docker-compose.yml`: configuracion para levantar el servicio con Docker Compose.

## Arquitectura

La API esta organizada por capas:

```txt
Route -> Middleware -> Controller -> Service -> Repository -> MySQL
```

- **Route**: define el endpoint y los middlewares que se ejecutan antes del controller.
- **Middleware**: valida datos, autentica usuarios o agrega informacion al request.
- **Controller**: recibe el request y retorna la respuesta HTTP.
- **Service**: contiene la logica de negocio.
- **Repository**: ejecuta consultas contra MySQL.
- **Mapper**: adapta la informacion de base de datos al formato de respuesta.

Esta separacion permite mantener la logica de negocio fuera de los controladores y aislar el acceso a base de datos dentro de los repositorios.

## Modulos

### Authentication

Modulo encargado del login y de obtener informacion del usuario autenticado.

Ruta base:

```txt
/api/v1/authentication
```

### Services

Modulo encargado de listar los servicios disponibles.

Ruta base:

```txt
/api/v1/services
```

### Schedules

Modulo encargado de listar horarios disponibles.

Ruta base:

```txt
/api/v1/schedules
```

### Bookings

Modulo encargado de crear reservas y listar las reservas del usuario autenticado.

Ruta base:

```txt
/api/v1/bookings
```

## Middlewares

### `traceIdMiddleware`

Agrega un identificador de trazabilidad a cada request.

- Lee el header `x-trace-id` si viene desde el cliente.
- Si no existe, genera uno nuevo con `uuid`.
- Devuelve el mismo valor en el header de respuesta.

Archivo:

```txt
src/core/middlewares/trace.middleware.ts
```

### `validateDtoBody`

Valida el body de una peticion usando schemas de Zod.

Si la informacion no cumple el schema, responde con estado `400`.

Archivo:

```txt
src/core/middlewares/validate-dto-body.middleware.ts
```

### `authMiddleware`

Valida el token JWT enviado en el header `Authorization`.

Formato esperado:

```txt
Authorization: Bearer <token>
```

Si el token no existe, es invalido o expiro, responde con estado `401`.

Archivo:

```txt
src/core/security/jwt.middleware.ts
```

### `errorMiddleware`

Centraliza la respuesta de errores de la aplicacion.

Cuando recibe un `AppError`, devuelve el status definido y agrega informacion como `xTraceId` y `xUrl`.

Archivo:

```txt
src/core/error-http/error.middleware.ts
```

## Endpoints

Todas las rutas estan montadas bajo `/api`.

### Authentication

#### Login

```http
POST /api/v1/authentication/login
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "abc123"
}
```

Validaciones:

- `email`: debe ser un correo valido.
- `password`: minimo 6 caracteres, maximo 10, solo letras y numeros.

Respuesta:

```json
{
  "accessToken": "jwt",
  "user": {}
}
```

#### Obtener informacion del usuario

```http
GET /api/v1/authentication/my-info
```

Requiere autenticacion.

### Services

#### Listar servicios

```http
GET /api/v1/services
```

Requiere autenticacion.

Respuesta:

```json
{
  "data": []
}
```

### Schedules

#### Listar horarios

```http
GET /api/v1/schedules
```

Requiere autenticacion.

Respuesta:

```json
{
  "data": []
}
```

### Bookings

#### Crear reserva

```http
POST /api/v1/bookings
```

Requiere autenticacion.

Body:

```json
{
  "date": "2026-08-09 15:30:00",
  "scheduleId": 1
}
```

Validaciones:

- `date`: formato `YYYY-MM-DD HH:mm:ss`.
- `scheduleId`: numero entero.

Antes de crear la reserva, el servicio valida si la fecha y horario seleccionado ya se encuentran ocupados.

#### Listar reservas del usuario

```http
GET /api/v1/bookings
```

Requiere autenticacion.

Respuesta:

```json
{
  "data": []
}
```

## Autenticacion

Los endpoints protegidos requieren un JWT en el header `Authorization`.

```txt
Authorization: Bearer <token>
```

El token se obtiene desde el endpoint de login. Una vez validado, el middleware agrega la informacion del usuario al request para que los servicios puedan usarla.

## Variables de entorno

Variables requeridas:

```env
JWT_SECRET=secret
PORT=3000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=buky
MYSQL_USER=user
MYSQL_PASSWORD=password
```

Notas:

- En ejecucion local, `MYSQL_HOST=localhost` funciona si MySQL corre en la misma maquina.
- En Docker, `localhost` apunta al contenedor de la API, no al host.
- Si MySQL corre en el host y la API en Docker, se puede usar `host.docker.internal` segun el entorno.
- Si MySQL corre en otro contenedor, `MYSQL_HOST` debe ser el nombre del servicio dentro de la red Docker.

## Instalacion

```bash
npm install
```

## Ejecucion local

Modo desarrollo:

```bash
npm run dev
```

Compilar:

```bash
npm run build
```

Ejecutar version compilada:

```bash
npm start
```

## Docker

Construir imagen:

```bash
docker compose build
```

Levantar servicio:

```bash
docker compose up
```

El contenedor expone la API en el puerto configurado en `docker-compose.yml`.

## Build

El script de build ejecuta:

```bash
tsc && tsc-alias -f
```

- `tsc` compila el codigo TypeScript hacia `dist`.
- `tsc-alias -f` resuelve los alias usados en imports para que el codigo compilado pueda ejecutarse correctamente con Node.js en modo ESM.

La aplicacion compilada inicia desde:

```txt
dist/index.js
```

## Base de datos

La conexion a MySQL se configura en:

```txt
src/core/config/database.config.ts
```

Al iniciar, la API valida la conexion a MySQL antes de levantar el servidor HTTP. Si la conexion falla, el proceso termina con error.

## Consideraciones

- La API usa `type: module`, por lo que el build debe generar imports compatibles con ESM.
- Los endpoints privados dependen de `authMiddleware`.
- Las validaciones de body se hacen con Zod.
- La logica SQL esta concentrada en `src/core/repositories`.
- La respuesta de errores se centraliza en `errorMiddleware`.

