-- Create table to store database structure information
CREATE TABLE public.get_list_of_tables_and_columns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name character varying NOT NULL,
  columns_with_types_and_fks text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.get_list_of_tables_and_columns ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view the database structure
CREATE POLICY "Database structure is viewable by everyone"
ON public.get_list_of_tables_and_columns
FOR SELECT
USING (true);

-- Only authenticated users can manage the structure
CREATE POLICY "Database structure can be managed by authenticated users"
ON public.get_list_of_tables_and_columns
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Create trigger for updated_at
CREATE TRIGGER update_get_list_of_tables_and_columns_updated_at
BEFORE UPDATE ON public.get_list_of_tables_and_columns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert current database structure
INSERT INTO public.get_list_of_tables_and_columns (table_name, columns_with_types_and_fks) VALUES
('appointments', 'id (uuid), name (character varying), email (character varying), phone (character varying), date (date), time (time without time zone), agent (character varying), property (character varying), message (text), status (character varying), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('cities', 'id (integer), name (character varying), created_at (timestamp with time zone)'),
('localities', 'id (integer), name (character varying), city_id (integer), created_at (timestamp with time zone)'),
('properties', 'id (uuid), title (character varying), description (text), typology (character varying), surface (numeric), price (numeric), locality_id (integer), latitude (numeric), longitude (numeric), phone_whatsapp (character varying), image_url (text), status (character varying), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_details', 'id (uuid), property_id (uuid), bedrooms (integer), bathrooms (integer), rooms (integer), floors (integer), living_area (numeric), has_city_view (boolean), vue_mer (boolean), vue_montagne (boolean), vue_ville (boolean), vue_jardin (boolean), vue_cour (boolean), vue_degagee (boolean), condition (character varying), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_building', 'id (uuid), property_id (uuid), text (character varying), created_at (timestamp with time zone)'),
('property_amenities_structured', 'id (uuid), property_id (uuid), garage (boolean), jardin (boolean), terrasse (boolean), balcon (boolean), cave (boolean), grenier (boolean), buanderie (boolean), piscine (boolean), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_security_structured', 'id (uuid), property_id (uuid), alarme (boolean), interphone (boolean), digicode (boolean), video_surveillance (boolean), portail_electrique (boolean), gardien (boolean), ascenseur (boolean), acces_handicape (boolean), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_nearby_structured', 'id (uuid), property_id (uuid), ecoles (boolean), parcs (boolean), hopitaux (boolean), plages (boolean), aeroports (boolean), restaurants (boolean), commerces (boolean), universites (boolean), banques (boolean), transports_publics (boolean), mosquees (boolean), pharmacies (boolean), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_documents_structured', 'id (uuid), property_id (uuid), livret_foncier (boolean), acte_propriete (boolean), titre_propriete (boolean), contrat_location (boolean), certification_possession (boolean), certificat_inscription_fonciere (boolean), fiche_fiscale (boolean), documents_cadastraux (boolean), plans_cadastraux (boolean), certificat_urbanisme (boolean), permis_construire (boolean), certification_conformite (boolean), promesse_vente (boolean), mainlevee (boolean), permis_exploitation (boolean), certificat_non_negativite (boolean), created_at (timestamp with time zone), updated_at (timestamp with time zone)'),
('property_photos', 'id (uuid), property_id (uuid), text (character varying), created_at (timestamp with time zone)'),
('property_videos', 'id (uuid), property_id (uuid), text (character varying), created_at (timestamp with time zone)'),
('n8n_chat_histories', 'id (integer), session_id (character varying), message (jsonb)');