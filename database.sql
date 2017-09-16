-- DB Name: to-do

-- Table Creation
CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	description VARCHAR(200),
	status BOOLEAN DEFAULT false,
	due TIMESTAMP,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	completed TIMESTAMP
);