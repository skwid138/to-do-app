-- DB Name: to-do

-- Table Creation
CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	description VARCHAR(200),
	status BOOLEAN DEFAULT false,
	due VARCHAR(10),
	created DATE DEFAULT CURRENT_DATE,
	completed DATE
);