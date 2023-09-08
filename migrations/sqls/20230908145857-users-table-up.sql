CREATE TABLE users( 
  id SERIAL PRIMARY KEY, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(300) NOT NULL,
    unique (email)
  );