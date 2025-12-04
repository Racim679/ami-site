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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      automation_analytics: {
        Row: {
          ai_responses: number | null
          date: string
          id: number
          keyword_responses: number | null
          messages_received: number | null
          messages_sent: number | null
          new_leads: number | null
          platform: string
          user_id: string
        }
        Insert: {
          ai_responses?: number | null
          date?: string
          id?: number
          keyword_responses?: number | null
          messages_received?: number | null
          messages_sent?: number | null
          new_leads?: number | null
          platform: string
          user_id: string
        }
        Update: {
          ai_responses?: number | null
          date?: string
          id?: number
          keyword_responses?: number | null
          messages_received?: number | null
          messages_sent?: number | null
          new_leads?: number | null
          platform?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "automation_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_configs: {
        Row: {
          ai_model: string | null
          comment_auto_reply: boolean | null
          created_at: string | null
          default_dm_response: string | null
          dm_auto_reply: boolean | null
          id: string
          keyword_responses: Json | null
          keywords: string[] | null
          max_replies_per_hour: number | null
          platform: string
          system_prompt: string | null
          updated_at: string | null
          use_ai: boolean | null
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          comment_auto_reply?: boolean | null
          created_at?: string | null
          default_dm_response?: string | null
          dm_auto_reply?: boolean | null
          id?: string
          keyword_responses?: Json | null
          keywords?: string[] | null
          max_replies_per_hour?: number | null
          platform: string
          system_prompt?: string | null
          updated_at?: string | null
          use_ai?: boolean | null
          user_id: string
        }
        Update: {
          ai_model?: string | null
          comment_auto_reply?: boolean | null
          created_at?: string | null
          default_dm_response?: string | null
          dm_auto_reply?: boolean | null
          id?: string
          keyword_responses?: Json | null
          keywords?: string[] | null
          max_replies_per_hour?: number | null
          platform?: string
          system_prompt?: string | null
          updated_at?: string | null
          use_ai?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_configs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "automation_configs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      communes: {
        Row: {
          created_at: string | null
          id: number
          name: string
          wilaya_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          wilaya_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          wilaya_id?: number | null
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
      db_sql_templates: {
        Row: {
          id: number
          notes: string | null
          sql_template: string
          template_name: string
          use_case: string
        }
        Insert: {
          id?: number
          notes?: string | null
          sql_template: string
          template_name: string
          use_case: string
        }
        Update: {
          id?: number
          notes?: string | null
          sql_template?: string
          template_name?: string
          use_case?: string
        }
        Relationships: []
      }
      db_structure: {
        Row: {
          columns_info: string
          constraints: string | null
          description: string
          foreign_keys: string | null
          id: number
          indexes: string | null
          notes: string | null
          primary_key: string
          relation_type: string | null
          table_name: string
        }
        Insert: {
          columns_info: string
          constraints?: string | null
          description: string
          foreign_keys?: string | null
          id?: number
          indexes?: string | null
          notes?: string | null
          primary_key: string
          relation_type?: string | null
          table_name: string
        }
        Update: {
          columns_info?: string
          constraints?: string | null
          description?: string
          foreign_keys?: string | null
          id?: number
          indexes?: string | null
          notes?: string | null
          primary_key?: string
          relation_type?: string | null
          table_name?: string
        }
        Relationships: []
      }
      facebook_video_posts: {
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
      leads: {
        Row: {
          created_at: string | null
          custom_data: Json | null
          email: string | null
          external_user_id: string
          first_contact_at: string | null
          id: number
          last_contact_at: string | null
          name: string | null
          phone: string | null
          platform: string
          status: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          custom_data?: Json | null
          email?: string | null
          external_user_id: string
          first_contact_at?: string | null
          id?: number
          last_contact_at?: string | null
          name?: string | null
          phone?: string | null
          platform: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          custom_data?: Json | null
          email?: string | null
          external_user_id?: string
          first_contact_at?: string | null
          id?: number
          last_contact_at?: string | null
          name?: string | null
          phone?: string | null
          platform?: string
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      "message du ia": {
        Row: {
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      message_history: {
        Row: {
          bot_response: string | null
          comment_id: string | null
          created_at: string | null
          id: number
          media_id: number | null
          message_type: string | null
          platform: string
          response_source: string | null
          session_id: string
          user_id: string
          user_message: string
        }
        Insert: {
          bot_response?: string | null
          comment_id?: string | null
          created_at?: string | null
          id?: number
          media_id?: number | null
          message_type?: string | null
          platform: string
          response_source?: string | null
          session_id: string
          user_id: string
          user_message: string
        }
        Update: {
          bot_response?: string | null
          comment_id?: string | null
          created_at?: string | null
          id?: number
          media_id?: number | null
          message_type?: string | null
          platform?: string
          response_source?: string | null
          session_id?: string
          user_id?: string
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "message_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          commune_id: number | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          latitude: number | null
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
          commune_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
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
          commune_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          latitude?: number | null
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
      user_medias: {
        Row: {
          caption: string | null
          comments: string[] | null
          created_at: string | null
          first_dm: string | null
          id: number
          keywords: string[] | null
          media_product_type: string | null
          media_url: string | null
          platform: string
          use_ai: boolean | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          comments?: string[] | null
          created_at?: string | null
          first_dm?: string | null
          id: number
          keywords?: string[] | null
          media_product_type?: string | null
          media_url?: string | null
          platform: string
          use_ai?: boolean | null
          user_id: string
        }
        Update: {
          caption?: string | null
          comments?: string[] | null
          created_at?: string | null
          first_dm?: string | null
          id?: number
          keywords?: string[] | null
          media_product_type?: string | null
          media_url?: string | null
          platform?: string
          use_ai?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_medias_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_medias_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string
          facebook_access_token: string | null
          facebook_page_id: string | null
          facebook_page_name: string | null
          id: string
          instagram_access_token: string | null
          instagram_page_id: string | null
          instagram_username: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_expires_at: string | null
          subscription_plan: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email: string
          facebook_access_token?: string | null
          facebook_page_id?: string | null
          facebook_page_name?: string | null
          id: string
          instagram_access_token?: string | null
          instagram_page_id?: string | null
          instagram_username?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string
          facebook_access_token?: string | null
          facebook_page_id?: string | null
          facebook_page_name?: string | null
          id?: string
          instagram_access_token?: string | null
          instagram_page_id?: string | null
          instagram_username?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_routing: {
        Row: {
          created_at: string | null
          external_page_id: string
          id: string
          is_active: boolean | null
          platform: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          external_page_id: string
          id?: string
          is_active?: boolean | null
          platform: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          external_page_id?: string
          id?: string
          is_active?: boolean | null
          platform?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_routing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "webhook_routing_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
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
    }
    Views: {
      user_dashboard_stats: {
        Row: {
          email: string | null
          subscription_plan: string | null
          subscription_status: string | null
          total_ai_responses: number | null
          total_leads: number | null
          total_messages: number | null
          total_sent: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_user_tables: { Args: { p_user_id: string }; Returns: undefined }
      increment_analytics: {
        Args: { p_platform: string; p_type: string; p_user_id: string }
        Returns: undefined
      }
      refresh_db_metadata: { Args: never; Returns: undefined }
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
