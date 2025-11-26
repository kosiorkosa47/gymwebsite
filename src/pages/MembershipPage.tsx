import { useEffect, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MembershipTier } from '../types';

export default function MembershipPage() {
  const [membershipTiers, setMembershipTiers] = useState<MembershipTier[]>([]);

  useEffect(() => {
    loadMembershipTiers();
  }, []);

  const loadMembershipTiers = async () => {
    const { data } = await supabase
      .from('membership_tiers')
      .select('*')
      .order('display_order');

    if (data) setMembershipTiers(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Choose Your Path to Success</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the membership plan that fits your lifestyle and goals. All memberships include access to our world-class facilities and supportive community.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  tier.is_popular ? 'ring-4 ring-orange-500' : ''
                }`}
              >
                {tier.is_popular && (
                  <div className="bg-orange-600 text-white text-center py-2 font-bold flex items-center justify-center">
                    <Star className="h-4 w-4 mr-2 fill-current" />
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${tier.price_monthly}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-6 rounded-full font-bold transition-all duration-300 ${
                      tier.is_popular
                        ? 'bg-orange-600 hover:bg-orange-700 text-white transform hover:scale-105'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            All Memberships Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '24/7 Access',
                description: 'Work out on your schedule with round-the-clock facility access',
              },
              {
                title: 'Free Wi-Fi',
                description: 'Stay connected with high-speed internet throughout the gym',
              },
              {
                title: 'Locker Rooms',
                description: 'Clean, secure locker rooms with showers and amenities',
              },
              {
                title: 'Member App',
                description: 'Track workouts, book classes, and manage your membership',
              },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Can I cancel my membership anytime?',
                answer:
                  'Yes! We offer flexible month-to-month contracts with no long-term commitment. Cancel anytime with 30 days notice.',
              },
              {
                question: 'Is there a joining fee?',
                answer:
                  'We occasionally waive joining fees during promotional periods. Contact us to learn about current offers.',
              },
              {
                question: 'Can I freeze my membership?',
                answer:
                  'Yes, you can freeze your membership for up to 3 months per year for medical or travel reasons.',
              },
              {
                question: 'Do you offer student or military discounts?',
                answer:
                  'Absolutely! We offer 15% discounts for students, military personnel, and first responders with valid ID.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Our team is here to help you find the perfect membership for your goals
          </p>
          <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
