# Tarea 1: Sistemas Distribuidos

Tecnologías utilizadas Nodejs y gRPC.

Modulos de Node utilizados:

* express -> utilizado para la api
* redis -> para crear y conectar la memoria cache
* pg -> para crear y conectar la base de datos
* @grpc/grpc-js -> gRPC
* @grpc/proto-loader -> gRPC

## Instrucciones de ejecución

* Clonar el repositorio de github: https://github.com/Benja-Suprinha/tarea1
* Luego de clonarlo, se deben ingresar los siguientes comandos:
```shell
docker-compose build
docker-compose up
```

## Configuración de Redis

Una vez ejecutado el programa se debe ingresar al contenedor que tiene redis para configurarlo:

```shell
docker exec -it tarea1-redis-1 bash
```
Luego acceder a la consola de redis:

```shell
redis-cli
```
### Configuración de la cantidad de memoria caché a utilizar.

Para saber la memoria que esta posee se utiliza CONFIG GET maxmemory y para configurarla CONFIG SET maxmemory (numero de megabytes desados)mb

### Configuración de la politica de remoción a utilizar.
