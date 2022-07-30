USE `briefcase`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `id` int DEFAULT NULL,
  `nombre` varchar(300) DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
);

/*Data for the table `categorias` */

insert  into `categorias`(`id`,`nombre`,`estado`,`created_at`,`updated_at`) values 
(1,'abarrotes',1,NULL,NULL),
(2,'frutas',1,NULL,NULL),
(3,'verduras',1,NULL,NULL),
(4,'bebidas',1,NULL,NULL),
(5,'carnes',1,NULL,NULL),
(6,'lacteos',1,NULL,NULL);

/*Table structure for table `estados` */

DROP TABLE IF EXISTS `estados`;

CREATE TABLE `estados` (
  `id` int DEFAULT NULL,
  `tipo` int DEFAULT NULL,
  `nombre` varchar(300) DEFAULT NULL,
  `valor` int DEFAULT NULL
);

/*Data for the table `estados` */

insert  into `estados`(`id`,`tipo`,`nombre`,`valor`) values 
(1,1,'inactivo',0),
(2,1,'activo',1),
(3,1,'sin stock',2),
(4,2,'abarrotes',1),
(5,2,'perecibles',2),
(6,3,'unidad',1),
(7,3,'kg',2),
(8,3,'caja',3),
(9,3,'pack',4),
(10,4,'afecto',1),
(11,4,'inafecto',2);

/*Table structure for table `ordenes` */

DROP TABLE IF EXISTS `ordenes`;

CREATE TABLE `ordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) DEFAULT '0.00',
  `id_usuario` int DEFAULT NULL,
  `estado` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `ordenes` */

insert  into `ordenes`(`id`,`total`,`id_usuario`,`estado`,`created_at`,`updated_at`) values 
(1,45.00,1,0,'2022-07-18 20:56:47','2022-07-18 20:56:47');

/*Table structure for table `ordenes_detalle` */

DROP TABLE IF EXISTS `ordenes_detalle`;

CREATE TABLE `ordenes_detalle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_orden` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT '0.00',
  `ncantidad` decimal(10,2) DEFAULT '0.00',
  `subtotal` decimal(10,2) DEFAULT '0.00',
  `total` decimal(10,2) DEFAULT '0.00',
  `estado` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `ordenes_detalle` */

insert  into `ordenes_detalle`(`id`,`id_orden`,`id_producto`,`cantidad`,`ncantidad`,`subtotal`,`total`,`estado`,`id_usuario`,`created_at`,`updated_at`) values 
(1,1,1,2.00,0.00,5.40,6.00,0,1,'2022-07-18 20:56:47','2022-07-18 20:56:47'),
(2,1,3,3.00,0.00,13.00,15.00,0,1,'2022-07-18 20:56:47','2022-07-18 20:56:47'),
(3,1,4,4.00,0.00,20.00,24.00,0,1,'2022-07-18 20:56:47','2022-07-18 20:56:47');

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(18) DEFAULT NULL,
  `nombre` varchar(360) DEFAULT NULL,
  `descripcion` text,
  `stock` decimal(10,0) DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `id_almacen` int DEFAULT NULL,
  `imagen` varchar(450) DEFAULT NULL,
  `id_unidad_medida` int DEFAULT NULL,
  `id_afectacion_sunat` int DEFAULT NULL,
  `id_usuario_creacion` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `productos` */

insert  into `productos`(`id`,`sku`,`nombre`,`descripcion`,`stock`,`id_estado`,`precio`,`costo`,`id_categoria`,`id_almacen`,`imagen`,`id_unidad_medida`,`id_afectacion_sunat`,`id_usuario_creacion`,`created_at`,`updated_at`) values 
(1,'60001','leche gloria lata','leche gloria en lata para el desayuno o las comidas.',100,1,3.00,3.00,1,1,NULL,1,1,1,NULL,'2022-07-07 13:27:20'),
(2,'60002','fideos anita 250gr',NULL,100,1,1.00,1.00,1,1,NULL,1,1,1,NULL,'2022-07-07 15:40:02'),
(3,'60003','mayonesa alacena 25gr','mayonesa para compartir en familia, combina con todas las comidas.',100,1,6.00,5.00,1,1,NULL,1,1,1,NULL,NULL),
(4,'60004','pan de molde integral orfel','pan de molde integral es la mejor opcion para el desayuno familiar.',50,1,7.00,6.00,1,1,NULL,1,1,1,NULL,NULL),
(5,'10001','manzana de agua',NULL,25,1,2.00,2.00,2,2,'10001_1657218338.jpg',2,2,1,NULL,'2022-07-07 13:25:38'),
(6,'10002','piña golden',NULL,50,1,4.00,3.00,2,2,NULL,2,2,1,NULL,NULL),
(7,'20001','zapallo macre',NULL,100,1,2.00,1.00,3,2,NULL,2,2,1,NULL,NULL),
(8,'20002','tomate',NULL,50,1,4.00,4.00,3,2,NULL,2,2,1,NULL,NULL),
(9,'40001','inca cola 500ml','la mejor gaseosa del peru.',200,1,3.00,2.00,4,1,NULL,1,1,1,NULL,'2022-07-07 13:26:38'),
(10,'40002','coca cola 500ml','Una rica coca cola bien helena',300,1,3.00,2.00,4,1,NULL,1,1,1,NULL,'2022-07-07 13:27:08'),
(11,'40003','fanta 500ml',NULL,100,1,2.00,2.00,4,1,NULL,1,1,1,NULL,'2022-07-07 13:26:54'),
(26,'85214','papaya premium','Una rica papaya para disfrutar en familia',20,1,5.50,5.00,2,2,'85214_1657215703.jpg',2,2,1,'2022-07-07 12:41:43','2022-07-07 15:40:18');

/*Table structure for table `prueba` */

DROP TABLE IF EXISTS `prueba`;

CREATE TABLE `prueba` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(150) COLLATE latin1_spanish_ci DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `prueba` */

insert  into `prueba`(`id`,`nombres`,`edad`,`estado`) values 
(1,'roderick2',25,10),
(2,'abraham caja',50,11),
(4,'josesito',29,11);

/*Table structure for table `prueba_bk` */

DROP TABLE IF EXISTS `prueba_bk`;

CREATE TABLE `prueba_bk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(150) COLLATE latin1_spanish_ci DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `estado` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `prueba_bk` */

insert  into `prueba_bk`(`id`,`nombres`,`edad`,`estado`) values 
(1,'roderick2',25,10),
(2,'abraham caja',50,11),
(4,'josesito',29,11);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8_spanish_ci NOT NULL,
  `passwd` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
);

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombres`,`correo`,`passwd`,`created_at`,`updated_at`) values 
(1,'roderick sanchez','roderick@gmail.com','$2y$10$TQ./6ehcgwk4MFRtoXa52.abUHqbHy9pbaIBgOVcjC1x9Ue/WCVvm','2022-06-18 22:38:39','2022-06-18 22:38:39');
