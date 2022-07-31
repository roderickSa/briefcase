# briefcase
this proyect is build using laravel. And you can use with docker.

# Requirements

- Only Docker Desktop

# Docker Steps

- first of all, configure `.env` file(only copy .env.example)

To up this project with docker, run next commands in project route:

1. `docker-compose build`
2. `docker-compose up -d`
3. `docker-compose exec app php artisan key:generate`
4. `docker-compose exec php composer install`
5. `docker-compose run node npm install`

- catalogo module

![alt text](https://raw.githubusercontent.com/roderickSa/briefcase/main/src/public/images/captures/catalogo_1.png)
![alt text](https://raw.githubusercontent.com/roderickSa/briefcase/main/src/public/images/captures/catalogo_2.png)