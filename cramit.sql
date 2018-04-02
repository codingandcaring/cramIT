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
    ('nick', '$2a$10$8BnInY3Vd2Tafs6lAYvceuXeCECoVTUPJ4wZ4LY6Cl/qHmADJtoVi', 'logikfx@gmail.com'),
    ('ashley', '$2a$10$bQvguGBqqkI.FcQKjUn1KO9.lP54NHIFp1UWWPYGZXFVZV23QuL1u', 'bla@gmail.com'),
    ('prathyusha', '$2a$10$TENai6QG7BWzwA.gqAwdI.P40Zct1IYWHs1ylV4A40pbg1fliQxrS', 'blabla@gmail.com');


INSERT INTO cards (category_name, question, answer, difficulty) VALUES
    ('HTMLCSS', 'What does HTML stand for?', 'Hyper Text Markup Language', 'easy'),
    ('HTMLCSS', 'What does CSS stand for?', 'Cascading Style Sheets', 'easy'),
    ('HTMLCSS', 'How do you define a pseudo class in CSS? What are they used for?', 'You can define a pseudo class by listing the selector followed by a colon and finally the pseudo class element. Pseudo classes can be used to give elements special states—the most common example being a:hover, which is used to change the color of a link when a mouse hovers over it. Other uses include using distinct styling for visited and unvisited links and styling an element differently when focused.', 'medium'),
    ('JavaScript', 'What is the use of isNaN function?', 'isNaN function returns true if the argument is not a number otherwise it is false' ,'easy'),
    ('JavaScript', 'What is break and continue statements?', 'Break statement exits from the current loop\nContinue statement continues with next statement of the loop', 'easy'),
    ('JavaScript', 'What is the use of type of operator?', '"Typeof" is an operator which is used to return a string description of the type of a variable', 'easy'),
    ('JavaScript', 'Define event bubbling?', 'Define event bubbling?', 'medium'),
    ('NodeJS', 'Explain callback in Node.js?', 'A callback function is called at the completion of a given task. This allows other code to be run in the meantime and prevents any blocking.  Being an asynchronous platform, Node.js heavily relies on callback. All APIs of Node are written to support callbacks.', 'easy'),
    ('Python', 'What is the difference between list and tuples?', 'Lists are mutable i.e they can be edited. Syntax: list_1 = [10, ‘Chelsea’, 20]\nTuples are immutable (tuples are lists which can’t be edited). Syntax: tup_1 = (10, ‘Chelsea’ , 20)', 'easy'),
    ('Python', 'What is pickling and unpickling?', 'Pickle module accepts any Python object and converts it into a string representation and dumps it into a file by using dump function, this process is called pickling. While the process of retrieving original Python objects from the stored string representation is called unpickling.', 'easy'),
    ('Algorithms DataStructures', 'Describe a Linked List',
       'A collection of data elements/nodes where each contains some data, and a pointer to the next node in the list. ', 'easy'),
    ('Algorithms DataStructures', 'Describe a Tree',
       'A collection of data elements/nodes where each contains data or a value, and pointers to any other nodes(children). So starting with the root, which should not have any other nodes pointing to it, also no cycles are allowed', 'medium'),
    ('REST', 'RESTful development', 'Representation State Transfer, an architectural style where data and functionality are considered resources and are accessed using Uniform Resource Identifiers(URIs). Generally but not always used with HTTP methods to transfer representations of data.', 'medium'),
    ('Web Development', 'List HTTP request methods', 'GET - retrieve data from server at a specified resource\nPOST - send data to the server to create or update a resource\nPUT - send data to create or update a resource, similar to POST but PUT requests called multiple times will always produce the same result where repeated POST requests will create same resource multiple times\nPATCH - similar to PUT and POST, used to make partial modifications to a resource. Is non-idempotent like POST, multiple requests will make multiple changes.\nDELETE - request deletes resource at specified URL.\nHEAD - request is like GET but without the response body, useful for checking what a GET request would return before actually retrieving something large.\nCONNECT - establishes a tunnel to the server identified by the target resource\nOPTIONS - used to describe the communication options for the target resource\nTRACE - performs a message loop-back test along the path to the target resource.', 'hard'),
    ('Web Development', 'What is JSON?', 'JavaScript Object Notation', 'easy');
