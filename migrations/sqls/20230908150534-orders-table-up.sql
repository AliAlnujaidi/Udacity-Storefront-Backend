CREATE TABLE orders( 
  id SERIAL PRIMARY KEY, 
  status VARCHAR(30) NOT NULL,
  user_id bigint REFERENCES users(id) NOT NULL
  );