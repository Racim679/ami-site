// Temporary database types until Supabase types are regenerated

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: number;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string;
        };
      };
      localities: {
        Row: {
          id: number;
          name: string;
          city_id: number | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          city_id?: number | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          city_id?: number | null;
          created_at?: string;
        };
      };
      communes: {
        Row: {
          id: number;
          name: string;
          wilaya_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          wilaya_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          wilaya_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          commune_id: number | null;
          typology: string | null;
          status: string;
          surface: number | null;
          price: number | null;
          latitude: number | null;
          longitude: number | null;
          image_url: string | null;
          phone_whatsapp: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          commune_id?: number | null;
          typology?: string | null;
          status?: string;
          surface?: number | null;
          price?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
          phone_whatsapp?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          commune_id?: number | null;
          typology?: string | null;
          status?: string;
          surface?: number | null;
          price?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
          phone_whatsapp?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_details: {
        Row: {
          id: string;
          property_id: string | null;
          bedrooms: number | null;
          bathrooms: number | null;
          rooms: number | null;
          floors: number | null;
          living_area: number | null;
          has_city_view: boolean | null;
          condition: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          rooms?: number | null;
          floors?: number | null;
          living_area?: number | null;
          has_city_view?: boolean | null;
          condition?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          rooms?: number | null;
          floors?: number | null;
          living_area?: number | null;
          has_city_view?: boolean | null;
          condition?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_building: {
        Row: {
          id: string;
          property_id: string | null;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          text?: string;
          created_at?: string;
        };
      };
      property_amenities_structured: {
        Row: {
          id: string;
          property_id: string | null;
          piscine: boolean | null;
          garage: boolean | null;
          jardin: boolean | null;
          terrasse: boolean | null;
          balcon: boolean | null;
          cave: boolean | null;
          grenier: boolean | null;
          buanderie: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          piscine?: boolean | null;
          garage?: boolean | null;
          jardin?: boolean | null;
          terrasse?: boolean | null;
          balcon?: boolean | null;
          cave?: boolean | null;
          grenier?: boolean | null;
          buanderie?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          piscine?: boolean | null;
          garage?: boolean | null;
          jardin?: boolean | null;
          terrasse?: boolean | null;
          balcon?: boolean | null;
          cave?: boolean | null;
          grenier?: boolean | null;
          buanderie?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_security_structured: {
        Row: {
          id: string;
          property_id: string | null;
          gardien: boolean | null;
          ascenseur: boolean | null;
          acces_handicape: boolean | null;
          video_surveillance: boolean | null;
          digicode: boolean | null;
          interphone: boolean | null;
          alarme: boolean | null;
          portail_electrique: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          gardien?: boolean | null;
          ascenseur?: boolean | null;
          acces_handicape?: boolean | null;
          video_surveillance?: boolean | null;
          digicode?: boolean | null;
          interphone?: boolean | null;
          alarme?: boolean | null;
          portail_electrique?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          gardien?: boolean | null;
          ascenseur?: boolean | null;
          acces_handicape?: boolean | null;
          video_surveillance?: boolean | null;
          digicode?: boolean | null;
          interphone?: boolean | null;
          alarme?: boolean | null;
          portail_electrique?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_nearby_structured: {
        Row: {
          id: string;
          property_id: string | null;
          ecoles: boolean | null;
          pharmacies: boolean | null;
          mosquees: boolean | null;
          transports_publics: boolean | null;
          banques: boolean | null;
          universites: boolean | null;
          commerces: boolean | null;
          restaurants: boolean | null;
          aeroports: boolean | null;
          hopitaux: boolean | null;
          parcs: boolean | null;
          plages: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          ecoles?: boolean | null;
          pharmacies?: boolean | null;
          mosquees?: boolean | null;
          transports_publics?: boolean | null;
          banques?: boolean | null;
          universites?: boolean | null;
          commerces?: boolean | null;
          restaurants?: boolean | null;
          aeroports?: boolean | null;
          hopitaux?: boolean | null;
          parcs?: boolean | null;
          plages?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          ecoles?: boolean | null;
          pharmacies?: boolean | null;
          mosquees?: boolean | null;
          transports_publics?: boolean | null;
          banques?: boolean | null;
          universites?: boolean | null;
          commerces?: boolean | null;
          restaurants?: boolean | null;
          aeroports?: boolean | null;
          hopitaux?: boolean | null;
          parcs?: boolean | null;
          plages?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_documents_structured: {
        Row: {
          id: string;
          property_id: string | null;
          livret_foncier: boolean | null;
          acte_propriete: boolean | null;
          titre_propriete: boolean | null;
          contrat_location: boolean | null;
          certification_possession: boolean | null;
          certificat_inscription_fonciere: boolean | null;
          fiche_fiscale: boolean | null;
          documents_cadastraux: boolean | null;
          plans_cadastraux: boolean | null;
          certificat_urbanisme: boolean | null;
          permis_construire: boolean | null;
          certification_conformite: boolean | null;
          promesse_vente: boolean | null;
          mainlevee: boolean | null;
          permis_exploitation: boolean | null;
          certificat_non_negativite: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          livret_foncier?: boolean | null;
          acte_propriete?: boolean | null;
          titre_propriete?: boolean | null;
          contrat_location?: boolean | null;
          certification_possession?: boolean | null;
          certificat_inscription_fonciere?: boolean | null;
          fiche_fiscale?: boolean | null;
          documents_cadastraux?: boolean | null;
          plans_cadastraux?: boolean | null;
          certificat_urbanisme?: boolean | null;
          permis_construire?: boolean | null;
          certification_conformite?: boolean | null;
          promesse_vente?: boolean | null;
          mainlevee?: boolean | null;
          permis_exploitation?: boolean | null;
          certificat_non_negativite?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          livret_foncier?: boolean | null;
          acte_propriete?: boolean | null;
          titre_propriete?: boolean | null;
          contrat_location?: boolean | null;
          certification_possession?: boolean | null;
          certificat_inscription_fonciere?: boolean | null;
          fiche_fiscale?: boolean | null;
          documents_cadastraux?: boolean | null;
          plans_cadastraux?: boolean | null;
          certificat_urbanisme?: boolean | null;
          permis_construire?: boolean | null;
          certification_conformite?: boolean | null;
          promesse_vente?: boolean | null;
          mainlevee?: boolean | null;
          permis_exploitation?: boolean | null;
          certificat_non_negativite?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      property_photos: {
        Row: {
          id: string;
          property_id: string | null;
          text: string;
          tag?: string;
          display_order?: number;
          storage_path?: string;
          bucket_name?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          text: string;
          tag?: string;
          display_order?: number;
          storage_path?: string;
          bucket_name?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          text?: string;
          tag?: string;
          display_order?: number;
          storage_path?: string;
          bucket_name?: string;
          created_at?: string;
        };
      };
      property_videos: {
        Row: {
          id: string;
          property_id: string | null;
          text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          text?: string;
          created_at?: string;
        };
      };
      appointments: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          agent: string;
          property: string | null;
          message: string | null;
          status: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          date: string;
          time: string;
          agent: string;
          property?: string | null;
          message?: string | null;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          date?: string;
          time?: string;
          agent?: string;
          property?: string | null;
          message?: string | null;
          status?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}