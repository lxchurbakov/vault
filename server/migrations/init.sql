DROP TABLE file;
DROP TABLE vault;

CREATE TABLE vault (
  id INT NOT NULL AUTO_INCREMENT,
  token VARCHAR(60) NOT NULL,
  hash VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE file (
  id INT NOT NULL,
  PRIMARY KEY (id),
  vault_id INT NOT NULL,
  pathname VARCHAR(30) NOT NULL,
  INDEX (vault_id),
  FOREIGN KEY (vault_id)
    REFERENCES vault(id)
    ON DELETE CASCADE
);

