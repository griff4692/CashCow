# Schema Information

## users
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
email             | string    | not null
password_digest   | string    | not null
session_token     | string    | not null
fname             | string    | not null
lname             | string    | not null
provider          | string    | for twitter authentication
uid               | string    | for twitter authentication
image_file_name   | string    | for Paperclip gem
image_content_type| string    | for Paperclip gem
image_file_size   | integer   | for Paperclip gem
image_updated_at  | date      | for Paperclip gem

## projects
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users)
category          | string    | not null
title             | string    | not null
description       | text      | not null
goal              | integer   | not null
deadline          | date      | not null
image_file_name   | string    | for Paperclip gem
image_content_type| string    | for Paperclip gem
image_file_size   | integer   | for Paperclip gem
image_updated_at  | date      | for Paperclip gem

## backings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
project_id  | string    | not null, foreign key (references projects)
amount      | integer   | not null

## follows
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
project_id  | integer   | not null, foreign key (references projects)
