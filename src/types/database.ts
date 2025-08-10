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
      properties: {
        Row: {
          id: string;
          title: string;
          locality_id: number | null;
          typology: string | null;
          status: string | null;
          surface: number | null;
          price: number | null;
          latitude: number | null;
          longitude: number | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          locality_id?: number | null;
          typology?: string | null;
          status?: string | null;
          surface?: number | null;
          price?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          locality_id?: number | null;
          typology?: string | null;
          status?: string | null;
          surface?: number | null;
          price?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
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
      property_amenities: {
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
      property_security: {
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
      property_nearby: {
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
      property_documents: {
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
      property_photos: {
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