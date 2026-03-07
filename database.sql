CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    department_id INTEGER REFERENCES departments(id)
);

-- Optional: Insert some sample data
INSERT INTO departments (name) VALUES ('Engineering'), ('Sales'), ('Marketing'), ('HR');
