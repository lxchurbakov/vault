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

exports.up = (db, callback) => {
  db.runSql(`
    CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY(id)
    )
  `, callback)
};

exports.down = (db, callback) => {
  db.runSql(`
    DROP TABLE IF EXISTS users
  `, callback)
};


exports._meta = {
  "version": 1
};


