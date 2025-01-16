import React from 'react';
import { Clock, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

export default function ServiceCard({ title, price, duration, image, description }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-violet-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-pink-600 font-bold">
            <DollarSign className="w-4 h-4" />
            <span>{price}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-violet-600 hover:to-pink-600 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
}