-- Drop tables if they exist (for clean start)
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

-- Table: products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  total_amount NUMERIC(10,2) NOT NULL,
  items_count INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: events (all events history)
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_products_category ON products(category);

-- Insert test products
INSERT INTO products (name, category, price) VALUES
  ('iPhone 13', 'electronics', 799.99),
  ('Samsung Galaxy S21', 'electronics', 699.99),
  ('MacBook Pro', 'electronics', 1999.99),
  ('Nike Air Max', 'shoes', 129.99),
  ('Adidas Ultraboost', 'shoes', 149.99),
  ('Levis Jeans', 'clothing', 79.99),
  ('Winter Jacket', 'clothing', 199.99),
  ('Beats Headphones', 'electronics', 299.99),
  ('North Face Backpack', 'accessories', 89.99),
  ('Apple Watch', 'electronics', 399.99);