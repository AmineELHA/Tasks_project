-- Insert default admin user
-- Password: 123456 (BCrypt hash)
INSERT INTO users (email, password) 
VALUES ('admin@demo.com', '$2b$10$bgYwAUZ8b6QfOvwd3wshIuJADuIfESOkXYN9QYAd4KuvxOj.UwTs2')
ON CONFLICT (email) DO NOTHING;
