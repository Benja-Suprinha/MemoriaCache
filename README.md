# Tarea 1: Sistemas Distribuidos

Integrantes del grupo: Guillermo Martínez, Benjamín Ojeda

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

Para saber la memoria que esta posee se utiliza CONFIG GET maxmemory y para configurarla CONFIG SET maxmemory (numero de megabytes)mb

```shell
CONFIG GET maxmemory
CONFIG SET maxmemory (numero de megabytes)mb
```

### Configuración de la politica de remoción a utilizar.

Para saber la politica de remoción que se esta usando se utiliza CONFIG GET maxmemory-policy y para configurarla CONFIG SET maxmemory-policy allkeys-lru (si se quiere usar lsu CONFIG SET maxmemory-policy allkeys-lsu).

```shell
CONFIG GET maxmemory-policy
CONFIG SET maxmemory-policy allkeys-lru
```
### Elección de la politica de remoción

Para comparar la forma en que se eliminan los datos del cache se hizo una tabla de acuerdo al rendimiento de los algoritmos

|                                     |   LRU   |   LFU    |   
| ----------------------------------- | ------- | -------- |
| Almacenar una búsqueda              |   O(1)  | O(log N) |
| Encontrar una búsqueda por nombre   |   O(1)  |   O(1)   |
| Eliminar una búsqueda               |   O(1)  | O(log N) |

LRU: Significa el menos recientemente usado (least recently used), realiza un seguimiento del uso de una búsqueda en la memoria durante un período de tiempo, y cuando la memoria cache está llena, elimina la búsqueda que no se ha utilizado en la memoria durante más tiempo.

LFU: Significa el menos frecuentemente usado (least frecuently used), realiza un seguimiento de la frecuencia con la que se ejecuta una búsqueda, y cuando la memoria cache está llena, elimina la búsqueda menos frecuente que se ha realizado.

Luego de definir las políticas, se concluye que la mejor política de remoción a usar es la LRU, en términos de rendimiento es más rapida a la hora de almacenar una búsqueda y eliminar una búsqueda. En la LFU pueden ocurrir errores al momento de que 2 o mas objetos se repitan en frecuencia, mientras que, seguir el uso de una búsqueda es más preciso a la hora de eliminar peticiones del cache.
