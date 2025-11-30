# API de Reclamos – Backend (Node.js + Express)

Este es el backend oficial utilizado por la aplicación móvil desarrollada en Android/Kotlin con Jetpack Compose.

##  Tecnologías
- Node.js
- Express
- PostgreSQL
- JWT (Token API)
- PM2 (Despliegue en servidor EC2 – AWS)

##  Endpoints principales

###  Login
`POST /login`  
Genera un token API para proteger la app.

###  Reclamos
`GET /reclamos`  
`POST /reclamos`  
`PUT /reclamos/:id`  
`DELETE /reclamos/:id`

###  Ubicación externa (API pública)
`GET /ubicacion`  
Consume una API externa para devolver ubicación.

##  Variables de entorno (.env)
