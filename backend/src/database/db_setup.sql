--CREATE DATABASE ROULETTE_APP OWNER = owner_name;

CREATE TABLE Users (
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_role TEXT NOT NULL,
    user_money BIGINT NOT NULL,
    user_wheels BIGINT NOT NULL,
    user_movies TEXT[] NOT NULL,
    user_book TEXT[] NOT NULL
);

CREATE TABLE Promocodes (
    promo TEXT NOT NULL UNIQUE,
    promo_value TEXT NOT NULL,
    promo_type TEXT NOT NULL
);

CREATE TABLE Feedback (
    msg TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    status TEXT NOT NULL,
    msg_id SERIAL PRIMARY KEY
);

CREATE TABLE Products (
    products_movies TEXT[] NOT NULL,
    products_books TEXT[] NOT NULL
);

-- Then create an account within app, and give ADMIN access yourself:

UPDATE Users SET user_role = "ADMIN" WHERE user_email = "email";