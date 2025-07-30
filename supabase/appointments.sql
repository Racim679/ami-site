-- Création de la table des rendez-vous
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  agent VARCHAR(100) NOT NULL,
  property VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_agent ON appointments(agent);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Optionnel pour la sécurité
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion publique (pour les formulaires)
CREATE POLICY "Allow public insert" ON appointments
    FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture par l'administrateur
CREATE POLICY "Allow admin read" ON appointments
    FOR SELECT USING (true);

-- Politique pour permettre la mise à jour par l'administrateur
CREATE POLICY "Allow admin update" ON appointments
    FOR UPDATE USING (true);

-- Exemple de données de test (optionnel)
INSERT INTO appointments (name, email, phone, date, time, agent, property, message, status) VALUES
('Ahmed Benali', 'ahmed@example.com', '+213 770 123 456', '2024-12-20', '10:00:00', '1', 'Résidence Al Manar', 'Intéressé par un F3', 'confirmed'),
('Fatima Zerrouki', 'fatima@example.com', '+213 770 234 567', '2024-12-21', '14:00:00', '2', 'Complexe Andalous Garden', 'Location longue durée', 'pending'),
('Karim Boudiaf', 'karim@example.com', '+213 770 345 678', '2024-12-22', '15:00:00', '3', 'Villa Park Premium', 'Investissement locatif', 'confirmed')
ON CONFLICT DO NOTHING; 