import { useEffect, useState } from 'react';
import { Award, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Trainer } from '../types';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    const { data } = await supabase
      .from('trainers')
      .select('*')
      .order('years_experience', { ascending: false });

    if (data) setTrainers(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Meet Our Expert Trainers</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our certified professionals bring years of experience and passion to help you achieve your fitness goals safely and effectively.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">
                      {trainer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <p className="text-sm opacity-90">Profile Photo</p>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{trainer.name}</h3>
                  <p className="text-orange-600 font-medium mb-4">{trainer.title}</p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {trainer.years_experience} years experience
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{trainer.bio}</p>

                  {trainer.specialties && trainer.specialties.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {trainer.certifications && trainer.certifications.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        Certifications
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {trainer.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-600 mr-2">•</span>
                            <span>{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition-all duration-300">
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {trainers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading trainers...</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Train with Our Experts?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personalized Programs',
                description:
                  'Get customized workout plans designed specifically for your goals, fitness level, and any physical limitations.',
              },
              {
                title: 'Proper Form & Technique',
                description:
                  'Learn correct exercise form to maximize results and minimize injury risk with expert guidance and feedback.',
              },
              {
                title: 'Accountability & Motivation',
                description:
                  'Stay committed with regular check-ins, progress tracking, and the motivation to push through plateaus.',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg border-t-4 border-orange-600"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with a Trainer?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a complimentary consultation to find the perfect trainer for your goals
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
