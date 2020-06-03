BEGIN;

TRUNCATE
"user",
"contact";

INSERT INTO "user" (username)
VALUES
('user1'),
('user2'),
('user3');

INSERT INTO "contact" (user_id, phone_number, email_address, preferred_contact_method)
VALUES
(1, '(111)111-1111', 'user1@email.com', 'email'),
(2, '(222)222-2222', 'user2@email.com', 'phone'),
(3, '(333)333-3333', 'user3@email.com', 'email');

COMMIT;