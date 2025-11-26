import { Target, Heart, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About APEX FITNESS</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where dedication meets innovation, and every member becomes family
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2015, APEX FITNESS was born from a simple belief: everyone deserves access to world-class fitness facilities and expert guidance, regardless of their starting point.
                </p>
                <p>
                  What started as a single location with 500 members has grown into a thriving community of over 5,000 members who push each other to reach new heights every single day.
                </p>
                <p>
                  We're not just about weights and treadmills. We're about transformation, community, and helping you discover what you're truly capable of achieving.
                </p>
              </div>
            </div>
            <div className="h-96 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Zap className="h-32 w-32 mx-auto mb-4" />
                <p className="text-2xl font-bold">Building Champions Since 2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Excellence',
                description:
                  'We strive for excellence in everything we do, from our equipment to our customer service.',
              },
              {
                icon: Heart,
                title: 'Passion',
                description:
                  'We are passionate about fitness and helping our members achieve their goals.',
              },
              {
                icon: Users,
                title: 'Community',
                description:
                  'We believe in the power of community to motivate and inspire lasting change.',
              },
              {
                icon: Zap,
                title: 'Innovation',
                description:
                  'We continuously evolve our programs and facilities to stay at the cutting edge.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <value.icon className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            World-Class Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Cardio Zone',
                description:
                  'State-of-the-art treadmills, ellipticals, bikes, and rowing machines with personal entertainment systems.',
                features: ['50+ Machines', 'Heart Rate Monitoring', 'Virtual Training Programs'],
              },
              {
                title: 'Strength Training',
                description:
                  'Extensive free weight area and premium resistance machines for all muscle groups.',
                features: ['Olympic Platforms', 'Power Racks', 'Cable Machines', 'Dumbbells up to 150lbs'],
              },
              {
                title: 'Functional Training',
                description:
                  'Dedicated space for functional movements, agility work, and athletic performance.',
                features: ['Turf Area', 'Battle Ropes', 'Plyometric Boxes', 'TRX Systems'],
              },
              {
                title: 'Group Fitness Studios',
                description:
                  'Two climate-controlled studios designed for group classes and mind-body workouts.',
                features: ['Yoga Studio', 'Cycling Studio', 'Premium Sound System', 'Motivating Atmosphere'],
              },
              {
                title: 'Recovery Center',
                description:
                  'Dedicated space for stretching, mobility work, and recovery to prevent injury and enhance performance.',
                features: ['Foam Rollers', 'Massage Guns', 'Stretching Area', 'Sauna Access'],
              },
              {
                title: 'Locker Rooms',
                description:
                  'Spacious, clean locker rooms with all the amenities you need before and after your workout.',
                features: ['Private Showers', 'Secure Lockers', 'Grooming Stations', 'Complimentary Towels'],
              },
            ].map((facility, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg border-l-4 border-orange-600"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{facility.title}</h3>
                <p className="text-gray-600 mb-4">{facility.description}</p>
                <ul className="space-y-2">
                  {facility.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-orange-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Location & Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us</h3>
              <div className="space-y-3 text-gray-600">
                <p className="font-medium text-lg">APEX FITNESS</p>
                <p>123 Fitness Boulevard</p>
                <p>Downtown District</p>
                <p>City, State 12345</p>
                <p className="mt-4 font-medium">(555) 123-4567</p>
                <p>info@apexfitness.com</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Opening Hours</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>5:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>6:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </div>
                <p className="mt-4 text-orange-600 font-medium">
                  24/7 Access Available for Premium Members
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Join the APEX Family Today</h2>
          <p className="text-xl mb-8 text-orange-100">
            Experience the difference that a truly dedicated fitness community can make
          </p>
          <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
