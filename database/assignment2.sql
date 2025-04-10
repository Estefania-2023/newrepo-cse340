--
-- Database: 'cse 340 project'
-- Assignment 2, Task 1
--

-- Prompt 1 - Add new account in table "account"
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Prompt 2 - Update new account in table 'type' to ADMIN
UPDATE account SET account_type = 'Admin' 
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

---- Prompt 3 - Delete new account in table "account"
DELETE FROM account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

---- Prompt 4 - Modify 'GM HUMMER Description' in table 'inventory'
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

---- Prompt 5 - Use inner JOIN to select the make and model "SPORT"
SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

---- Prompt 6 -  UPDATE images path
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

--
-- Database: 'cse 340 project'
-- Assignment 6
--

-- Create table `message`

-- MESSAGE START
-- Table structure for table `message`
CREATE TABLE IF NOT EXISTS public.message
(
    message_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    message_to integer NOT NULL,
    message_from integer NOT NULL,
    message_subject character varying COLLATE pg_catalog."default" NOT NULL,
    message_body text COLLATE pg_catalog."default" NOT NULL,
    message_created timestamp with time zone NOT NULL DEFAULT now(),
    message_read boolean NOT NULL DEFAULT false,
    message_archived boolean NOT NULL DEFAULT false,
    CONSTRAINT message_pkey PRIMARY KEY (message_id)
);

-- Create relationship between columns 'message_to' and 'account_id'
ALTER TABLE IF EXISTS public.message
    ADD CONSTRAINT message_to_fk FOREIGN KEY (message_to)
    REFERENCES public.account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

-- Create relationship between columns 'message_from' and 'account_id'
ALTER TABLE IF EXISTS public.message
    ADD CONSTRAINT message_from_fk FOREIGN KEY (message_from)
    REFERENCES public.account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
-- MESSAGE END