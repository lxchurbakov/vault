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
    CREATE TABLE credentials (
      id INT NOT NULL AUTO_INCREMENT,
      vault_id INT NOT NULL,
      password_hash VARCHAR(500) NOT NULL,
      salt VARCHAR(100) NOT NULL,
      iterations INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(id),
      FOREIGN KEY (vault_id) REFERENCES vaults (id)
    );
  `, callback)
};

exports.down = function(db, callback) {
  db.runSql(`
    DROP TABLE IF EXISTS credentials;
  `, callback)
};

exports._meta = {
  "version": 1
};
