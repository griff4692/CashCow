# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null
password_digest | string    | not null
session_token   | string    | not null
avatar          | img (TBD) | [optional]

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
category    | string    | not null
title       | string    | not null
description | string    | not null
goal        | integer   | not null
end_date    | date      | not null
avatar      | img (TBD) | [optional]

## backings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
project_id  | string    | not null, foreign key (references projects)
pledge      | integer   | not null

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
project_id  | integer   | not null, foreign key (references projects)

## rewards
column name     | data type| details
----------------|----------|-----------------------
id              | integer  | not null, primary key
project_id      | string   | not null, foreign key (references projects)
threshold       | integer  | not null
reward          | text     | not null
[project_id, threshold] - unique index
