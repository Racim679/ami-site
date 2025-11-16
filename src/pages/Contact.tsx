import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  requestType: string;
  contactPreference: string;
  file?: FileList;
  acceptTerms: boolean;
}

const Contact = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContactFormData>();
  const { toast } = useToast();

  const onSubmit = (data: ContactFormData) => {
    console.log("Form data:", data);
    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Contact</h1>
          <p className="text-xl text-muted-foreground">
            Prenez contact avec notre équipe
          </p>
        </div>
        
        {/* Formulaire de contact */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nom et prénom */}
              <div>
                <Label htmlFor="name" className="text-black font-medium mb-2 block">
                  Nom et prénom <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name", { required: "Ce champ est requis" })}
                  placeholder="Nom et prénom"
                  className="w-full bg-white text-black border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-black font-medium mb-2 block">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Ce champ est requis" })}
                  placeholder="Adresse email"
                  className="w-full bg-white text-black border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Téléphone */}
              <div>
                <Label htmlFor="phone" className="text-black font-medium mb-2 block">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", { required: "Ce champ est requis" })}
                  placeholder="+213"
                  className="w-full bg-white text-black border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Objet */}
              <div>
                <Label htmlFor="subject" className="text-black font-medium mb-2 block">
                  Objet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  {...register("subject", { required: "Ce champ est requis" })}
                  placeholder="Objet"
                  className="w-full bg-white text-black border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-black font-medium mb-2 block">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Ce champ est requis" })}
                  placeholder="Votre message..."
                  rows={5}
                  className="w-full bg-white text-black border-gray-300 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {/* Type de demande */}
              <div>
                <Label className="text-black font-medium mb-2 block">
                  Type de demande <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("requestType", value)}>
                  <SelectTrigger className="w-full bg-white text-black border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                    <SelectValue placeholder="-- Choisir un type --" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300">
                    <SelectItem value="information" className="text-black hover:bg-gray-100">Information</SelectItem>
                    <SelectItem value="devis" className="text-black hover:bg-gray-100">Devis</SelectItem>
                    <SelectItem value="reclamation" className="text-black hover:bg-gray-100">Réclamation</SelectItem>
                    <SelectItem value="emploi" className="text-black hover:bg-gray-100">Demande d'emploi</SelectItem>
                    <SelectItem value="services" className="text-black hover:bg-gray-100">Offre de services</SelectItem>
                    <SelectItem value="terrain" className="text-black hover:bg-gray-100">Vente de terrain</SelectItem>
                    <SelectItem value="autres" className="text-black hover:bg-gray-100">Autres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pièce jointe */}
              <div>
                <Label className="text-black font-medium mb-2 block">Pièce jointe</Label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors duration-200"
                  >
                    Choisir un fichier
                  </label>
                  {selectedFile && (
                    <span className="ml-3 text-sm text-gray-600">{selectedFile.name}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Aucun fichier sélectionné</p>
              </div>

              {/* Texte d'acceptation */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  {...register("acceptTerms", { required: "Vous devez accepter les conditions" })}
                  className="mt-1 accent-primary"
                />
                <Label htmlFor="acceptTerms" className="text-sm text-black leading-relaxed">
                  En soumettant ce formulaire, j'accepte les{" "}
                  <span className="font-semibold">Conditions Générales d'Utilisation</span> et j'accepte que les informations
                  saisies soient utilisées par <span className="font-semibold">AYMEN PROMOTION</span> pour me recontacter dans le cadre de la relation qui
                  découle de ma demande. <span className="text-red-500">*</span>
                </Label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}

              {/* Préférence de contact */}
              <div>
                <Label className="text-black font-medium mb-3 block">Préférence de contact :</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("contactPreference", value)}
                  className="flex flex-row space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="contact-email" className="border-primary text-primary" />
                    <Label htmlFor="contact-email" className="text-black">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="telephone" id="contact-phone" className="border-primary text-primary" />
                    <Label htmlFor="contact-phone" className="text-black">Téléphone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="contact-whatsapp" className="border-primary text-primary" />
                    <Label htmlFor="contact-whatsapp" className="text-black">WhatsApp</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Bouton d'envoi */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-medium transition-colors duration-200"
              >
                Prendre Contact
              </Button>
            </form>
          </div>
        </div>

        {/* Widgets de contact */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Téléphone */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Téléphone</h3>
              <a
                href="tel:+213560582959"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                +213 560 58 29 59
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Email</h3>
              <a
                href="mailto:contact@aymenpromotion.com"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                contact@aymenpromotion.com
              </a>
            </div>

            {/* Adresse */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Adresse</h3>
              <p className="text-primary font-medium">
                îlot N 52 section 05, Bir Mourad Raîs – Alger 16000
              </p>
            </div>
          </div>
        </div>

        {/* Carte interactive */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.8!2d3.0!3d36.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYuNzAwMDAwLCAzLjAwMDAwMA!5e0!3m2!1sfr!2sdz!4v1000000000000!5m2!1sfr!2sdz"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Aymen Promotion"
            ></iframe>
          </div>
        </div>

      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;