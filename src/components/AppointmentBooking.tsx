import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, startOfDay, isBefore, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  agent: string;
  property?: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

interface Agent {
  id: string;
  name: string;
  speciality: string;
  available_hours: string[];
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Aymen Benali",
    speciality: "Vente & Investissement",
    available_hours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: "2",
    name: "Sarah Messaoudi",
    speciality: "Location & Gestion",
    available_hours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: "3",
    name: "Karim Zerrouki",
    speciality: "Nouveautés & Promotion",
    available_hours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: "4",
    name: "Fatima Boudiaf",
    speciality: "Accompagnement Achat",
    available_hours: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  }
];

const AppointmentBooking: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    agent: "",
    property: "",
    message: "",
    status: 'pending'
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>("");

  // Générer les dates disponibles (prochaines 2 semaines)
  const generateAvailableDates = () => {
    const dates = [];
    const today = startOfDay(new Date());

    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      // Exclure les weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Mettre à jour les créneaux disponibles quand la date ou l'agent change
  useEffect(() => {
    if (selectedDate && appointment.agent) {
      const agent = agents.find(a => a.id === appointment.agent);
      if (agent) {
        setAvailableSlots(agent.available_hours);
      }
    }
  }, [selectedDate, appointment.agent]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setAppointment(prev => ({
      ...prev,
      date: format(date, 'yyyy-MM-dd'),
      time: "" // Reset time when date changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validation
      if (!appointment.name || !appointment.email || !appointment.phone ||
        !appointment.date || !appointment.time || !appointment.agent) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      // Vérifier si le créneau est disponible
      const { data: existingAppointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('date', appointment.date)
        .eq('time', appointment.time)
        .eq('agent', appointment.agent)
        .eq('status', 'confirmed');

      if (existingAppointments && existingAppointments.length > 0) {
        throw new Error("Ce créneau n'est plus disponible. Veuillez en choisir un autre.");
      }

      // Insérer le rendez-vous
      const { data, error: insertError } = await supabase
        .from('appointments')
        .insert([appointment])
        .select()
        .single();

      if (insertError) throw insertError;

      // Envoyer à Google Calendar (simulation)
      await sendToGoogleCalendar(appointment);

      setIsSuccess(true);
      setAppointment({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        agent: "",
        property: "",
        message: "",
        status: 'pending'
      });
      setSelectedDate(null);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendToGoogleCalendar = async (appointment: Appointment) => {
    // Simulation de l'envoi à Google Calendar
    // En production, vous utiliseriez l'API Google Calendar
    console.log("Envoi à Google Calendar:", appointment);

    // Exemple d'intégration Google Calendar :
    /*
    const event = {
      summary: `Rendez-vous - ${appointment.name}`,
      description: `Rendez-vous avec ${appointment.name}\nTéléphone: ${appointment.phone}\nEmail: ${appointment.email}\nMessage: ${appointment.message}`,
      start: {
        dateTime: `${appointment.date}T${appointment.time}:00`,
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: `${appointment.date}T${appointment.time}:00`,
        timeZone: 'Europe/Paris',
      },
    };
    
    await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    */
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Rendez-vous confirmé !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre demande de rendez-vous a été enregistrée avec succès.
            Nous vous contacterons dans les plus brefs délais pour confirmer.
          </p>
          <Button onClick={() => setIsSuccess(false)}>
            Prendre un autre rendez-vous
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Prendre un rendez-vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={appointment.name}
                  onChange={(e) => setAppointment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Votre nom complet"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={appointment.email}
                  onChange={(e) => setAppointment(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={appointment.phone}
                  onChange={(e) => setAppointment(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+213 770 123 456"
                  required
                />
              </div>
              <div>
                <Label htmlFor="property">Bien concerné (optionnel)</Label>
                <Input
                  id="property"
                  value={appointment.property}
                  onChange={(e) => setAppointment(prev => ({ ...prev, property: e.target.value }))}
                  placeholder="Ex: Résidence Al Manar"
                />
              </div>
            </div>

            {/* Sélection de l'agent */}
            <div>
              <Label htmlFor="agent">Choisir un agent *</Label>
              <Select
                value={appointment.agent}
                onValueChange={(value) => setAppointment(prev => ({ ...prev, agent: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-500">{agent.speciality}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sélection de la date */}
            <div>
              <Label>Choisir une date *</Label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {availableDates.map((date) => (
                  <Button
                    key={date.toISOString()}
                    type="button"
                    variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                    onClick={() => handleDateSelect(date)}
                    className="h-12 text-xs"
                  >
                    <div>
                      <div className="font-medium">{format(date, 'dd', { locale: fr })}</div>
                      <div className="text-xs opacity-70">{format(date, 'MMM', { locale: fr })}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sélection de l'heure */}
            {selectedDate && appointment.agent && (
              <div>
                <Label htmlFor="time">Choisir une heure *</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={appointment.time === slot ? "default" : "outline"}
                      onClick={() => setAppointment(prev => ({ ...prev, time: slot }))}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                value={appointment.message}
                onChange={(e) => setAppointment(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Décrivez votre projet ou vos questions..."
                rows={4}
              />
            </div>

            {/* Erreur */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {/* Bouton de soumission */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Envoi en cours..." : "Confirmer le rendez-vous"}
            </Button>
          </form>

          {/* Informations supplémentaires */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Informations importantes :</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Les rendez-vous sont confirmés sous 24h</li>
              <li>• Merci d'arriver 5 minutes avant l'heure prévue</li>
              <li>• En cas d'empêchement, merci de nous prévenir 24h à l'avance</li>
              <li>• Notre équipe vous contactera pour confirmer le rendez-vous</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking; 