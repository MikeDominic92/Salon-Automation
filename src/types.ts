export interface Appointment {
  id: string;
  date: Date;
  time: string;
  service: string;
  stylist: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Stylist {
  name: string;
  speciality: string;
}