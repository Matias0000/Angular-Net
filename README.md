# CRUD con Angular 16 y SQL Server

Este proyecto es un ejemplo de una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) utilizando **Angular 16** como frontend y **SQL Server** como base de datos.

## Requisitos previos

1. **Docker**: Asegúrate de tener Docker instalado y funcionando en tu sistema.
2. **Docker Compose**: Necesario para configurar y administrar los servicios de Docker.

---

## Configuración del entorno

### 1. Creación del archivo `docker-compose.yml`

Crea un archivo llamado `docker-compose.yml` con el siguiente contenido:

```yaml
version: "3.9"
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: sqlserver_container
    ports:
      - "1433:1433" 
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "YourStrong@Password" 
    volumes:
      - sqlserver_data:/var/opt/mssql

volumes:
  sqlserver_data:
