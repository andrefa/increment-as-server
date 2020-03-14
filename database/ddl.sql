-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(64) NOT NULL,
  creation_time TIMESTAMP DEFAULT NOw()
);

-- -----------------------------------------------------
-- Table counters
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS counters (
  user_id INT4 NOT NULL,
  amount INT4 NOT NULL default 1,
  creation_time TIMESTAMP DEFAULT NOw(),
  CONSTRAINT fk_user_counter
    FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT uq_counter_user_id
    UNIQUE(user_id));
