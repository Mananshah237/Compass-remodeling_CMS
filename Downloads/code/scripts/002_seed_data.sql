-- Insert initial homepage content
INSERT INTO public.homepage (hero_title, hero_subtitle, about_section)
VALUES (
  'Transform Your Home',
  'Premium remodeling and maintenance services for your home',
  'At Compass Remodeling & Maintenance, we guide your home transformation with precision and expertise.'
)
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO public.services (title, description, order_index)
VALUES
  ('Kitchen Remodeling', 'Complete kitchen renovations with modern design and quality craftsmanship', 1),
  ('Bathroom Remodeling', 'Luxurious bathroom upgrades with premium finishes', 2),
  ('Home Maintenance', 'Regular maintenance and repairs to keep your home in perfect condition', 3)
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO public.gallery (title, description, category, order_index)
VALUES
  ('Modern Kitchen Transformation', 'Beautiful kitchen remodel with custom cabinetry', 'kitchen', 1),
  ('Spa-Like Bathroom', 'Luxury bathroom renovation with marble finishes', 'bathroom', 2),
  ('Living Room Update', 'Contemporary living space refresh', 'general', 3)
ON CONFLICT DO NOTHING;
