/* Replace with your SQL commands */
insert into users (firstname,lastname,username,password) values 
('Djasnive', 'Rajaona', 'djasnive', '$2b$10$Nxk5GsjVsFdj7GUhR9pbn..uzGSmDeooQW/C9hImvWsRiJM2QCL1W'),
( 'Jean'      , 'Marlot'   , 'marlot'   , '$2b$10$KzMVW64oHATR9fzKThQQD.pFeU2OpdUnBw5M3wjMmdolAUGGUGYT6'),
( 'John'      , 'Doe'      , 'john'     , '$2b$10$ctikQSWU13fj.BxyKl6gw.PGoTP13jBZ7hJVDSlqpx78w60Q2Hva6'),
( 'Mark'      , 'Antoine'  , 'mark'     , '$2b$10$Dk/cuE.6Bfl0bgxv934LpuOaNrmBeHY6GN6794SjzeQUCz4dLoDby'); 

insert into products (name, price, category) values 
('Banana', 500,'Fruts'),
('Samsung S22', 2000,'Phone'),
('Iphone 14 Pro Max', 2200, 'Phone');

insert into orders (product_id, user_id, quantity, status) values 
(1, 1,2,'active'),
(2, 1,1,'completed'),
(2, 2,2,'completed'),
(1, 2,10,'completed');

