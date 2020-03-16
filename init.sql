-- This file creates the listed tables and entries on Heroku Postgres
-- cat init.sql | heroku pg:psql postgresql-whatever-00000 --app example-node-api

CREATE TABLE sales(
id serial PRIMARY KEY,
month char(8) NOT NULL,
source char(2),
product_views int,
added_to_cart smallint,
orders smallint,
revenue int,
checkout_rate smallint CHECK(checkout_rate>=0 AND checkout_rate<=100),
purchase_rate smallint CHECK(purchase_rate>=0 AND purchase_rate<=100),
abandoned_rate smallint CHECK(abandoned_rate>=0 AND abandoned_rate<=100),
orders_nw int CHECK(orders_nw>=0),
orders_sw int CHECK(orders_sw>=0),
orders_ne int CHECK(orders_ne>=0),
orders_se int CHECK(orders_se>=0)
);