CREATE DATABASE api_auth_node;
\c api_auth_node;

CREATE TABLE users (
  id           UUID           PRIMARY KEY                      ,
  username     VARCHAR(50)    NOT NULL                         ,
  email        VARCHAR(50)    NOT NULL       UNIQUE            ,
  password     VARCHAR(255)   NOT NULL                         ,
  createdAt    TIMESTAMP      DEFAULT        CURRENT_TIMESTAMP
);

