-- Insert default admin user
-- Password: 123456 (BCrypt hash with $2a$ version for Spring compatibility)
INSERT INTO users (email, password) 
VALUES ('admin@demo.com', '$2a$10$bgYwAUZ8b6QfOvwd3wshIuJADuIfESOkXYN9QYAd4KuvxOj.UwTs2')
ON CONFLICT (email) DO NOTHING;
