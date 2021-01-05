-- Create Database for Restaurant
CREATE Database IF NOT EXISTS 'restaurant_owner';

-- Create Restaurant Table
CREATE TABLE IF NOT EXISTS restaurant_owner.restaurant (
	restaurant_id BIGINT auto_increment NOT NULL,
	restaurant_name varchar(255) NOT NULL,
	user_id BIGINT NOT NULL,
	address TEXT NULL,
	phone_number varchar(100) NULL,
	open_time_1 varchar(100) NOT NULL,
	close_time_1 varchar(100) NOT NULL,
	open_time_2 varchar(100) NULL,
	close_time_2 varchar(100) NULL,
	is_restaurant_open TINYINT DEFAULT 1 NOT NULL,
	table_allocation_time varchar(100) NOT NULL,
	is_active TINYINT DEFAULT 1 NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at DATETIME NULL,
	updated_by BIGINT NULL,
	CONSTRAINT restaurant_PK PRIMARY KEY (restaurant_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- Create Tables table
CREATE TABLE IF NOT EXISTS restaurant_owner.tables (
	table_id INTEGER auto_increment NOT NULL,
	restaurant_id BIGINT NOT NULL,
	table_no varchar(100) NOT NULL,
	table_size varchar(100) NULL,
	is_active TINYINT DEFAULT 1 NULL,
	CONSTRAINT tables_PK PRIMARY KEY (table_id),
	CONSTRAINT tables_FK FOREIGN KEY (restaurant_id) REFERENCES restaurant_owner.restaurant(restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- Create Database for Booking
CREATE Database IF NOT EXISTS 'restaurant_booking';

-- Create Reservation table
CREATE TABLE IF NOT EXISTS restaurant_booking.reservation (
	reservation_id BIGINT auto_increment NOT NULL,
	user_id BIGINT NOT NULL,
	restaurant_id BIGINT NOT NULL,
	table_id INTEGER NOT NULL,
	reservation_date DATE NOT NULL,
	reservation_start_time varchar(100) NOT NULL,
	reservation_end_time varchar(100) NOT NULL,
	booking_at DATETIME NULL,
	is_cancelled TINYINT DEFAULT 0 NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at DATETIME NULL,
	CONSTRAINT reservation_PK PRIMARY KEY (reservation_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


-- Create Database for Authentication
CREATE Database IF NOT EXISTS 'restaurant_auth';

-- Create User Types table
CREATE TABLE IF NOT EXISTS restaurant_auth.user_types (
	user_type_id SMALLINT auto_increment NOT NULL,
	user_type varchar(100) NOT NULL,
	CONSTRAINT user_types_PK PRIMARY KEY (user_type_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- Insert User Types into table
INSERT INTO restaurant_auth.user_types (user_type)
VALUES ('owner'),('customer');

-- Create users table
CREATE TABLE IF NOT EXISTS restaurant_auth.users (
	user_id BIGINT auto_increment NOT NULL,
	first_name varchar(100) NULL,
	last_name varchar(100) NULL,
	email varchar(100) NOT NULL,
	password varchar(255) NULL,
	user_type_id SMALLINT NOT NULL,
	session_id varchar(100) NULL,
	is_active TINYINT DEFAULT 1 NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at DATETIME NULL,
	CONSTRAINT users_PK PRIMARY KEY (user_id),
	CONSTRAINT users_FK FOREIGN KEY (user_type_id) REFERENCES restaurant_auth.user_types(user_type_id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

