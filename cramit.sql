DROP DATABASE IF EXISTS cramit;
CREATE DATABASE cramit;

-- single line comment
/* multi line comment */


\c cramit;

-- we will use an enumeration for difficulty rating
CREATE TYPE difficulty_rating AS ENUM ('easy', 'medium', 'hard');

-- may have to use larger varchars or text for these fields
CREATE TABLE cards (
    ID SERIAL PRIMARY KEY,
    category_name VARCHAR (100),
    question TEXT UNIQUE NOT NULL,
    answer TEXT NOT NULL,
    difficulty difficulty_rating
);


-- May make location not null in the future
CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    username VARCHAR (100) UNIQUE NOT NULL,
    password VARCHAR (100) NOT NULL,
    location VARCHAR (150),
    email VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE user_progress (
    userId integer NOT NULL,
    questions_answered integer DEFAULT 0,
    PRIMARY KEY (userId),
    CONSTRAINT user_progress_user_id_fkey FOREIGN KEY(userId)
        REFERENCES users (ID) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO users (username, password, email) VALUES 
    ('nick', 'bla', 'logikfx@gmail.com'),
    ('ashley', 'bla', 'bla@gmail.com'),
    ('prathyusha', 'bla', 'blabla@gmail.com');


INSERT INTO cards (category_name, question, answer, difficulty) VALUES
    ('Data Structures', 'Describe a Linked List',
       'A collection of data elements/nodes where each contains some data, and a pointer to the next node in the list. ', 'easy'),
    ('Data Structures', 'Describe a Tree',
       'A collection of data elements/nodes where each contains data or a value, and pointers to any other nodes(children). So starting with the root, which should not have any other nodes pointing to it, also no cycles are allowed', 'medium'),
    ('Web Development', 'RESTful development', 'Representation State Transfer, an architectural style where data and functionality are considered resources and are accessed using Uniform Resource Identifiers(URIs). Generally but not always used with HTTP methods to transfer representations of data.', 'medium'),
    ('Web Development', 'What does HTML stand for?', 'Hyper Text Markup Language', 'easy'),
    ('Web Development', 'What does CSS stand for?', 'Cascading Style Sheets', 'easy'),
    ('Web Development', 'List HTTP request methods', 'GET - retrieve data from server at a specified resource\nPOST - send data to the server to create or update a resource\nPUT - send data to create or update a resource, similar to POST but PUT requests called multiple times will always produce the same result where repeated POST requests will create same resource multiple times\nPATCH - similar to PUT and POST, used to make partial modifications to a resource. Is non-idempotent like POST, multiple requests will make multiple changes.\nDELETE - request deletes resource at specified URL.\nHEAD - request is like GET but without the response body, useful for checking what a GET request would return before actually retrieving something large.\nCONNECT - establishes a tunnel to the server identified by the target resource\nOPTIONS - used to describe the communication options for the target resource\nTRACE - performs a message loop-back test along the path to the target resource.', 'hard'),

    ('Web Development', 'What is JSON?', 'JavaScript Object Notation', 'easy');

