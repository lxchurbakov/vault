'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.runSql(`
    CREATE TABLE vaults (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      token VARCHAR(100) NOT NULL,
      password_hash VARCHAR(100) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(id)
    );
    CREATE UNIQUE INDEX vault_token ON vaults (token);
  `, callback)
};

exports.down = function(db, callback) {
  db.runSql(`
    DROP INDEX vault_token ON vaults;
    DROP TABLE IF EXISTS vaults;
  `, callback)
};

exports._meta = {
  "version": 1
};

/*

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

*/
