-- DB Name: to-do

-- Table Creation
CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	description VARCHAR(200), -- could also use TEXT
	status BOOLEAN DEFAULT false,
	due VARCHAR(10),
	created DATE DEFAULT CURRENT_DATE, -- this may not work, I changed it using the gui
	completed DATE -- this may not work, I changed it using the gui
);