export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      wilayas: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      communes_alger: {
        Row: {
          arabe: string
          francais: string
          id: number
        }
        Insert: {
          arabe: string
          francais: string
          id?: number
        }
        Update: {
          arabe?: string
          francais?: string
          id?: number
        }
        Relationships: []
      }

      gemini_audio_transcription: {
        Row: {
          audio_file: string | null
          drivelink: string
          speaker_id: number
          text: string
        }
        Insert: {
          audio_file?: string | null
          drivelink: string
          speaker_id?: number
          text: string
        }
        Update: {
          audio_file?: string | null
          drivelink?: string
          speaker_id?: number
          text?: string
        }
        Relationships: []
      }
      get_list_of_tables_and_columns: {
        Row: {
          columns_with_types_and_fks: string
          created_at: string | null
          id: string
          table_name: string
          updated_at: string | null
        }
        Insert: {
          columns_with_types_and_fks: string
          created_at?: string | null
          id?: string
          table_name: string
          updated_at?: string | null
        }
        Update: {
          columns_with_types_and_fks?: string
          created_at?: string | null
          id?: string
          table_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      instagram_reels: {
        Row: {
          audio_transcribed: Json | null
          created_at: string | null
          description: string | null
          drived: boolean | null
          formatted_description: Json | null
          id: string
          lien_audio_drive: string | null
          lien_video_drive: string | null
          url_audio: string | null
          url_instagram: string
          url_video: string | null
          video_analyzed: Json | null
        }
        Insert: {
          audio_transcribed?: Json | null
          created_at?: string | null
          description?: string | null
          drived?: boolean | null
          formatted_description?: Json | null
          id?: string
          lien_audio_drive?: string | null
          lien_video_drive?: string | null
          url_audio?: string | null
          url_instagram: string
          url_video?: string | null
          video_analyzed?: Json | null
        }
        Update: {
          audio_transcribed?: Json | null
          created_at?: string | null
          description?: string | null
          drived?: boolean | null
          formatted_description?: Json | null
          id?: string
          lien_audio_drive?: string | null
          lien_video_drive?: string | null
          url_audio?: string | null
          url_instagram?: string
          url_video?: string | null
          video_analyzed?: Json | null
        }
        Relationships: []
      }
      lead_information: {
        Row: {
          agent_note: string | null
          created_at: string | null
          id: number
          nom_prenom: string
          platform_lead: string | null
          resume_lead: string | null
          score_lead: number | null
          statut: string | null
          telephone: string | null
          temps_de_vente_ideal: string | null
          type_de_bien: string | null
          updated_at: string | null
        }
        Insert: {
          agent_note?: string | null
          created_at?: string | null
          id?: number
          nom_prenom: string
          platform_lead?: string | null
          resume_lead?: string | null
          score_lead?: number | null
          statut?: string | null
          telephone?: string | null
          temps_de_vente_ideal?: string | null
          type_de_bien?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_note?: string | null
          created_at?: string | null
          id?: number
          nom_prenom?: string
          platform_lead?: string | null
          resume_lead?: string | null
          score_lead?: number | null
          statut?: string | null
          telephone?: string | null
          temps_de_vente_ideal?: string | null
          type_de_bien?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      communes: {
        Row: {
          wilaya_id: number | null
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          wilaya_id?: number | null
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          wilaya_id?: number | null
          created_at?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "localities_city_id_fkey"
            columns: ["wilaya_id"]
            isOneToOne: false
            referencedRelation: "wilayas"
            referencedColumns: ["id"]
          },
        ]
      }
      medias: {
        Row: {
          ai_detection: boolean | null
          comments: string[] | null
          first_dm: string | null
          id: number
          id_du_bien: number | null
          keywords: string[] | null
          media_product_type: string
        }
        Insert: {
          ai_detection?: boolean | null
          comments?: string[] | null
          first_dm?: string | null
          id: number
          id_du_bien?: number | null
          keywords?: string[] | null
          media_product_type: string
        }
        Update: {
          ai_detection?: boolean | null
          comments?: string[] | null
          first_dm?: string | null
          id?: number
          id_du_bien?: number | null
          keywords?: string[] | null
          media_product_type?: string
        }
        Relationships: []
      }
      message_queue: {
        Row: {
          created_at: string | null
          id: number
          message: string
          message_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: string
          message_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string
          message_id?: number
          user_id?: string
        }
        Relationships: []
      }
      message_tracking: {
        Row: {
          conversation_id: string
          created_at: string | null
          id: number
          last_message_id: string
          last_message_text: string | null
          last_message_timestamp: string
          platform: string
          replied: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          created_at?: string | null
          id?: number
          last_message_id: string
          last_message_text?: string | null
          last_message_timestamp: string
          platform: string
          replied?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          created_at?: string | null
          id?: number
          last_message_id?: string
          last_message_text?: string | null
          last_message_timestamp?: string
          platform?: string
          replied?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          latitude: number | null
          commune_id: number | null
          longitude: number | null
          phone_whatsapp: string
          price: number | null
          status: string
          surface: number | null
          title: string
          typology: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          commune_id?: number | null
          longitude?: number | null
          phone_whatsapp?: string
          price?: number | null
          status?: string
          surface?: number | null
          title: string
          typology?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
          commune_id?: number | null
          longitude?: number | null
          phone_whatsapp?: string
          price?: number | null
          status?: string
          surface?: number | null
          title?: string
          typology?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_locality_id_fkey"
            columns: ["commune_id"]
            isOneToOne: false
            referencedRelation: "communes"
            referencedColumns: ["id"]
          },
        ]
      }
      property_amenities_structured: {
        Row: {
          balcon: boolean | null
          buanderie: boolean | null
          cave: boolean | null
          created_at: string | null
          garage: boolean | null
          grenier: boolean | null
          id: string
          jardin: boolean | null
          piscine: boolean | null
          property_id: string | null
          terrasse: boolean | null
          updated_at: string | null
        }
        Insert: {
          balcon?: boolean | null
          buanderie?: boolean | null
          cave?: boolean | null
          created_at?: string | null
          garage?: boolean | null
          grenier?: boolean | null
          id?: string
          jardin?: boolean | null
          piscine?: boolean | null
          property_id?: string | null
          terrasse?: boolean | null
          updated_at?: string | null
        }
        Update: {
          balcon?: boolean | null
          buanderie?: boolean | null
          cave?: boolean | null
          created_at?: string | null
          garage?: boolean | null
          grenier?: boolean | null
          id?: string
          jardin?: boolean | null
          piscine?: boolean | null
          property_id?: string | null
          terrasse?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_amenities_structured_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_building: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_building_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_details: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          condition: string | null
          created_at: string | null
          floors: number | null
          has_city_view: boolean | null
          id: string
          living_area: number | null
          property_id: string | null
          rooms: number | null
          updated_at: string | null
          vue_cour: boolean | null
          vue_degagee: boolean | null
          vue_jardin: boolean | null
          vue_mer: boolean | null
          vue_montagne: boolean | null
          vue_ville: boolean | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          condition?: string | null
          created_at?: string | null
          floors?: number | null
          has_city_view?: boolean | null
          id?: string
          living_area?: number | null
          property_id?: string | null
          rooms?: number | null
          updated_at?: string | null
          vue_cour?: boolean | null
          vue_degagee?: boolean | null
          vue_jardin?: boolean | null
          vue_mer?: boolean | null
          vue_montagne?: boolean | null
          vue_ville?: boolean | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          condition?: string | null
          created_at?: string | null
          floors?: number | null
          has_city_view?: boolean | null
          id?: string
          living_area?: number | null
          property_id?: string | null
          rooms?: number | null
          updated_at?: string | null
          vue_cour?: boolean | null
          vue_degagee?: boolean | null
          vue_jardin?: boolean | null
          vue_mer?: boolean | null
          vue_montagne?: boolean | null
          vue_ville?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "property_details_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_documents_structured: {
        Row: {
          acte_propriete: boolean | null
          certificat_inscription_fonciere: boolean | null
          certificat_non_negativite: boolean | null
          certificat_urbanisme: boolean | null
          certification_conformite: boolean | null
          certification_possession: boolean | null
          contrat_location: boolean | null
          created_at: string | null
          documents_cadastraux: boolean | null
          fiche_fiscale: boolean | null
          id: string
          livret_foncier: boolean | null
          mainlevee: boolean | null
          permis_construire: boolean | null
          permis_exploitation: boolean | null
          plans_cadastraux: boolean | null
          promesse_vente: boolean | null
          property_id: string | null
          titre_propriete: boolean | null
          updated_at: string | null
        }
        Insert: {
          acte_propriete?: boolean | null
          certificat_inscription_fonciere?: boolean | null
          certificat_non_negativite?: boolean | null
          certificat_urbanisme?: boolean | null
          certification_conformite?: boolean | null
          certification_possession?: boolean | null
          contrat_location?: boolean | null
          created_at?: string | null
          documents_cadastraux?: boolean | null
          fiche_fiscale?: boolean | null
          id?: string
          livret_foncier?: boolean | null
          mainlevee?: boolean | null
          permis_construire?: boolean | null
          permis_exploitation?: boolean | null
          plans_cadastraux?: boolean | null
          promesse_vente?: boolean | null
          property_id?: string | null
          titre_propriete?: boolean | null
          updated_at?: string | null
        }
        Update: {
          acte_propriete?: boolean | null
          certificat_inscription_fonciere?: boolean | null
          certificat_non_negativite?: boolean | null
          certificat_urbanisme?: boolean | null
          certification_conformite?: boolean | null
          certification_possession?: boolean | null
          contrat_location?: boolean | null
          created_at?: string | null
          documents_cadastraux?: boolean | null
          fiche_fiscale?: boolean | null
          id?: string
          livret_foncier?: boolean | null
          mainlevee?: boolean | null
          permis_construire?: boolean | null
          permis_exploitation?: boolean | null
          plans_cadastraux?: boolean | null
          promesse_vente?: boolean | null
          property_id?: string | null
          titre_propriete?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_documents_structured_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_nearby_structured: {
        Row: {
          aeroports: boolean | null
          banques: boolean | null
          commerces: boolean | null
          created_at: string | null
          ecoles: boolean | null
          hopitaux: boolean | null
          id: string
          mosquees: boolean | null
          parcs: boolean | null
          pharmacies: boolean | null
          plages: boolean | null
          property_id: string | null
          restaurants: boolean | null
          transports_publics: boolean | null
          universites: boolean | null
          updated_at: string | null
        }
        Insert: {
          aeroports?: boolean | null
          banques?: boolean | null
          commerces?: boolean | null
          created_at?: string | null
          ecoles?: boolean | null
          hopitaux?: boolean | null
          id?: string
          mosquees?: boolean | null
          parcs?: boolean | null
          pharmacies?: boolean | null
          plages?: boolean | null
          property_id?: string | null
          restaurants?: boolean | null
          transports_publics?: boolean | null
          universites?: boolean | null
          updated_at?: string | null
        }
        Update: {
          aeroports?: boolean | null
          banques?: boolean | null
          commerces?: boolean | null
          created_at?: string | null
          ecoles?: boolean | null
          hopitaux?: boolean | null
          id?: string
          mosquees?: boolean | null
          parcs?: boolean | null
          pharmacies?: boolean | null
          plages?: boolean | null
          property_id?: string | null
          restaurants?: boolean | null
          transports_publics?: boolean | null
          universites?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_nearby_structured_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_photos: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_photos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_security_structured: {
        Row: {
          acces_handicape: boolean | null
          alarme: boolean | null
          ascenseur: boolean | null
          created_at: string | null
          digicode: boolean | null
          gardien: boolean | null
          id: string
          interphone: boolean | null
          portail_electrique: boolean | null
          property_id: string | null
          updated_at: string | null
          video_surveillance: boolean | null
        }
        Insert: {
          acces_handicape?: boolean | null
          alarme?: boolean | null
          ascenseur?: boolean | null
          created_at?: string | null
          digicode?: boolean | null
          gardien?: boolean | null
          id?: string
          interphone?: boolean | null
          portail_electrique?: boolean | null
          property_id?: string | null
          updated_at?: string | null
          video_surveillance?: boolean | null
        }
        Update: {
          acces_handicape?: boolean | null
          alarme?: boolean | null
          ascenseur?: boolean | null
          created_at?: string | null
          digicode?: boolean | null
          gardien?: boolean | null
          id?: string
          interphone?: boolean | null
          portail_electrique?: boolean | null
          property_id?: string | null
          updated_at?: string | null
          video_surveillance?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "property_security_structured_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_videos: {
        Row: {
          created_at: string | null
          id: string
          property_id: string | null
          text: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_videos_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
