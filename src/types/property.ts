export interface Property {
   id: string;
   title: string;
   description: string | null;
   status: "À Vendre" | "Vendu" | "À louer";
   surface: number | null;
   price: number | null;
   typology: string | null;
   commune_id: number | null;
   image_url: string | null;
   latitude: number | null;
   longitude: number | null;
   phone_whatsapp: string;
   created_at: string;
   updated_at: string;
}
