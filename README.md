# API de Usuarios con Blockchain

Este proyecto es una API REST que combina MongoDB con tecnología blockchain (Ethereum) para la gestión de usuarios.

## Características Principales

- Integración con MongoDB y Ethereum
- CRUD completo de usuarios
- Validación de direcciones de wallet
- Eventos en blockchain para cada operación
- API RESTful

## Requisitos Previos

- Node.js
- MongoDB
- Cuenta en Ethereum (para pruebas)
- MetaMask o similar para interacción con blockchain

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
MONGODB_URI=tu_uri_de_mongodb
ETHEREUM_NETWORK=tu_red_ethereum
CONTRACT_ADDRESS=tu_direccion_del_contrato
```

4. Iniciar el servidor:
```bash
npm start
```

## Estructura del Proyecto

```
├── abi/              # Contratos inteligentes
├── config/           # Configuraciones (DB, blockchain)
├── controller/       # Lógica de negocio
├── middleware/       # Middlewares personalizados
├── model/           # Modelos de MongoDB
├── routers/         # Rutas de la API
├── utils/           # Utilidades
└── server.js        # Punto de entrada
```

## Endpoints de la API

- `GET /api/users/users`: Obtener todos los usuarios
- `POST /api/users`: Crear nuevo usuario
- `GET /api/users/:id`: Obtener usuario por ID
- `PUT /api/users/:id`: Actualizar usuario
- `DELETE /api/users/:id`: Eliminar usuario

## Modelo de Usuario

```javascript
{
    id: String,          // Identificador único
    name: String,        // Nombre (mínimo 3 caracteres)
    email: String,       // Email válido
    addressWallet: String // Dirección de wallet Ethereum
}
```

## Eventos Blockchain

- `UserCreate`: Emitido al crear un usuario
- `UserUpdated`: Emitido al actualizar un usuario
- `UserDeleted`: Emitido al eliminar un usuario

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Ethers.js
- Solidity (para contratos inteligentes)

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles. 