import { useEffect, useState } from 'react';
import { ChevronRight, Award, Users, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .limit(3);

    if (data) setTestimonials(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Life, <span className="text-orange-500">One Rep at a Time</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Join APEX FITNESS and discover a community dedicated to helping you reach your peak performance. Expert trainers, cutting-edge equipment, and results that last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('membership')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('classes')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
              >
                View Classes
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '5,000+', label: 'Active Members' },
              { icon: Award, number: '50+', label: 'Expert Trainers' },
              { icon: Clock, number: '100+', label: 'Weekly Classes' },
              { icon: TrendingUp, number: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <stat.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose APEX FITNESS?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just a gym. We're a community committed to your success with world-class facilities and personalized support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Coaching',
                description: 'Work with certified trainers who create personalized programs tailored to your goals and fitness level.',
              },
              {
                title: 'State-of-the-Art Equipment',
                description: 'Access premium equipment and facilities designed to optimize your workout experience and results.',
              },
              {
                title: 'Supportive Community',
                description: 'Join a motivating community where members encourage each other to push limits and celebrate wins.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg border-l-4 border-orange-600 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Real Results, Real People</h2>
              <p className="text-xl text-gray-300">
                See what our members have achieved with dedication and our support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-orange-500 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="font-bold text-white">{testimonial.member_name}</p>
                    {testimonial.achievement && (
                      <p className="text-orange-500 font-medium">{testimonial.achievement}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of members who've already transformed their lives. Your journey begins today.
          </p>
          <button
            onClick={() => onNavigate('membership')}
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
          >
            View Membership Options
          </button>
        </div>
      </section>
    </div>
  );
}
