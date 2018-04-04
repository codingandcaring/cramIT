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

INSERT INTO users (username, password, email, location) VALUES 
    ('nick', '$2a$10$8BnInY3Vd2Tafs6lAYvceuXeCECoVTUPJ4wZ4LY6Cl/qHmADJtoVi', 'logikfx@gmail.com', 'Asheville, NC'),
    ('ashley', '$2a$10$bQvguGBqqkI.FcQKjUn1KO9.lP54NHIFp1UWWPYGZXFVZV23QuL1u', 'ashley@digitalcrafts.com', 'Fleming Island, FL'),
    ('prathyusha', '$2a$10$TENai6QG7BWzwA.gqAwdI.P40Zct1IYWHs1ylV4A40pbg1fliQxrS', 'prathyusha@gmail.com', 'Atlanta, GA');


INSERT INTO cards (category_name, question, answer, difficulty) VALUES
    ('HTMLCSS', 'What does HTML stand for?', 'Hyper Text Markup Language', 'easy'),
    ('HTMLCSS', 'What does CSS stand for?', 'Cascading Style Sheets', 'easy'),
    ('HTMLCSS', 'How do you define a pseudo class in CSS? What are they used for?', 'You can define a pseudo class by listing the selector followed by a colon and finally the pseudo class element. Pseudo classes can be used to give elements special states—the most common example being a:hover, which is used to change the color of a link when a mouse hovers over it. Other uses include using distinct styling for visited and unvisited links and styling an element differently when focused.', 'medium'),
    ('HTMLCSS', 'What are the three main ways to add CSS to a webpage?', 'There are three ways to apply CSS to a webpage—inline, embedded, and as an external style sheet.', 'easy'),
    ('HTMLCSS', 'What are CSS media queries and what are they used for?', 'CSS media queries adjust content style based on device characteristics like width, height, orientation, resolution, and display type. When used properly, the end result is a website or app capable of providing a sleek UI/UX across multiple devices.', 'easy'),
    ('JavaScript', 'What is JavaScript?', 'JavaScript is a lightweight, interpreted programming language with object-oriented capabilities that allows you to build interactivity into otherwise static HTML pages.', 'easy'),
    ('JavaScript', 'What is the use of isNaN function?', 'isNaN function returns true if the argument is not a number otherwise it is false' ,'easy'),
    ('JavaScript', 'What is break and continue statements?', 'Break statement exits from the current loop\nContinue statement continues with next statement of the loop', 'easy'),
    ('JavaScript', 'What is the use of type of operator?', '"Typeof" is an operator which is used to return a string description of the type of a variable', 'easy'),
    ('JavaScript', 'Define event bubbling?', 'Define event bubbling?', 'medium'),
    ('NodeJS', 'Explain callback in Node.js?', 'A callback function is called at the completion of a given task. This allows other code to be run in the meantime and prevents any blocking.  Being an asynchronous platform, Node.js heavily relies on callback. All APIs of Node are written to support callbacks.', 'easy'),
    ('Python', 'What is the difference between list and tuples?', 'Lists are mutable i.e they can be edited. Syntax: list_1 = [10, ‘Chelsea’, 20]\nTuples are immutable (tuples are lists which can’t be edited). Syntax: tup_1 = (10, ‘Chelsea’ , 20)', 'easy'),
    ('Python', 'What is pickling and unpickling?', 'Pickle module accepts any Python object and converts it into a string representation and dumps it into a file by using dump function, this process is called pickling. While the process of retrieving original Python objects from the stored string representation is called unpickling.', 'easy'),
    ('Database', 'What is SQL?', 'SQL is Structured Query Language designed for inserting and modifying in a relational database system.', 'medium'),
    ('Algorithms DataStructures', 'Describe a Linked List',
       'A collection of data elements/nodes where each contains some data, and a pointer to the next node in the list. ', 'easy'),
    ('Algorithms DataStructures', 'What will the following code output? const arr = [10, 12, 15, 21];
    for (var i = 0; i < arr.length; i++) {
    setTimeout(function() {
    console.log(`Index: ` + i + `, element: ` + arr[i]);
    }, 3000);', 'Index: 4, element: undefined(printed 4 times)', 'hard'),
    ('Algorithms DataStructures', 'Describe a Tree',
       'A collection of data elements/nodes where each contains data or a value, and pointers to any other nodes(children). So starting with the root, which should not have any other nodes pointing to it, also no cycles are allowed', 'medium'),
    ('Git', 'How do you find a list of files that has changed in a particular commit?', 'git diff-tree -r {hash}', 'medium'),
    ('REST', 'RESTful development', 'Representation State Transfer, an architectural style where data and functionality are considered resources and are accessed using Uniform Resource Identifiers(URIs). Generally but not always used with HTTP methods to transfer representations of data.', 'medium'),
    ('Web Development', 'List HTTP request methods', 'GET - retrieve data from server at a specified resource\nPOST - send data to the server to create or update a resource\nPUT - send data to create or update a resource, similar to POST but PUT requests called multiple times will always produce the same result where repeated POST requests will create same resource multiple times\nPATCH - similar to PUT and POST, used to make partial modifications to a resource. Is non-idempotent like POST, multiple requests will make multiple changes.\nDELETE - request deletes resource at specified URL.\nHEAD - request is like GET but without the response body, useful for checking what a GET request would return before actually retrieving something large.\nCONNECT - establishes a tunnel to the server identified by the target resource\nOPTIONS - used to describe the communication options for the target resource\nTRACE - performs a message loop-back test along the path to the target resource.', 'hard'),
    ('Web Development', 'What is JSON?', 'JavaScript Object Notation', 'easy'),
    ('NonTechnical', 'Tell us about yourself...', 'Find smart examples here! https://www.job-hunt.org/job_interviews/answering-tell-me-about-yourself-question.shtml', 'easy'),
    ('NonTechnical', 'Why do you want to work here?', 'It is important to research the company prior to your interview.  Interviewees who are knowledgeable about the company appear excited to work there.', 'easy'),
    ('NonTechnical', 'What is your greatest strength/weakness?', 'Focus on skills that the employer needs.  Highlight your expertise and willingness to learn new skills', 'easy'),
    ('NonTechnical', 'Explain your gap in employment.', 'This is an opportunity to highlight anything constructive you completed during a break in employment. You should avoid phrases such as "I needed a break" because employers may wonder when you will need another break', 'easy'),
    ('NonTechnical', 'Do you have any questions?', 'You should be prepared to ask questions at the end of the interview.  This helps show your interest in the job and highlights the research you completed on the company. It may be helpful to prepare a list of questions prior to the interview.', 'easy');

