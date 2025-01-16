import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar, Clock, User, Sparkles, Scissors, Heart } from 'lucide-react';
import { Appointment, TimeSlot } from '../types';

const SERVICES = [
  'Classic Manicure',
  'Gel Manicure',
  'Classic Pedicure',
  'Gel Pedicure',
  'Full Set Acrylic',
  'Fill-in',
  'Nail Art',
  'Luxury Spa Pedicure',
  'Paraffin Treatment',
  'Nail Repair'
];

const STYLISTS = [
  { name: 'Emma', speciality: 'Nail Art Expert' },
  { name: 'Sophie', speciality: 'Gel Specialist' },
  { name: 'Isabella', speciality: 'Acrylic Master' },
  { name: 'Olivia', speciality: 'Pedicure Specialist' },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: false },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
];

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedStylist, setSelectedStylist] = useState<string>();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService || !selectedStylist) return;

    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      stylist: selectedStylist,
      clientName,
      clientPhone,
      clientEmail,
      notes
    };

    console.log('Booking appointment:', appointment);
    // Here you would typically send this to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-pink-500" />
            <h3 className="text-xl font-semibold">Select Date</h3>
          </div>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="border rounded-lg p-4"
            fromDate={new Date()}
            modifiers={{
              booked: [new Date(2024, 2, 15), new Date(2024, 2, 20)],
            }}
            modifiersStyles={{
              booked: { color: '#EF4444', textDecoration: 'line-through' },
            }}
          />
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-pink-500" />
              <h3 className="text-xl font-semibold">Select Time</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedTime === slot.time
                      ? 'bg-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } ${!slot.available && 'opacity-50 cursor-not-allowed bg-gray-100'}`}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="w-5 h-5 text-pink-500" />
              <h3 className="text-xl font-semibold">Select Service</h3>
            </div>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-200 transition-all"
              required
            >
              <option value="">Choose a service</option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="text-xl font-semibold">Select Stylist</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STYLISTS.map((stylist) => (
                <button
                  key={stylist.name}
                  type="button"
                  onClick={() => setSelectedStylist(stylist.name)}
                  className={`p-4 rounded-lg text-left transition-all ${
                    selectedStylist === stylist.name
                      ? 'bg-pink-50 border-2 border-pink-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <p className="font-medium">{stylist.name}</p>
                  <p className="text-sm text-gray-600">{stylist.speciality}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-pink-500" />
          <h3 className="text-xl font-semibold">Your Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              placeholder="Any special requests or preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-pink-200 transition-all"
              rows={3}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-4 rounded-xl hover:bg-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium text-lg"
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>Book Appointment</span>
        </div>
      </button>
    </form>
  );
}