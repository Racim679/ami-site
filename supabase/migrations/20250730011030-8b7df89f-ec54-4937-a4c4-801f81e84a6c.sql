-- Insérer le secret Google Maps API
INSERT INTO vault.secrets (name, secret)
VALUES ('GOOGLE_MAPS_API_KEY', 'AIzaSyBL0FEnN7f4IdXGhT926lMdtDtb5l8jbhc')
ON CONFLICT (name) DO UPDATE SET secret = EXCLUDED.secret;