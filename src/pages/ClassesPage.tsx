import { useEffect, useState } from 'react';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Class, ClassSchedule } from '../types';

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState('monday');

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    loadClasses();
    loadSchedules();
  }, []);

  const loadClasses = async () => {
    const { data } = await supabase.from('classes').select('*').order('name');
    if (data) setClasses(data);
  };

  const loadSchedules = async () => {
    const { data } = await supabase
      .from('class_schedules')
      .select('*, classes(*), trainers(*)')
      .order('start_time');
    if (data) setSchedules(data);
  };

  const getSchedulesForDay = (day: string) => {
    return schedules.filter((schedule) => schedule.day_of_week === day);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Classes</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From high-intensity interval training to mindful yoga, we offer diverse classes designed to challenge and inspire you at every fitness level.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse All Classes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white">{classItem.name}</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                        classItem.difficulty_level
                      )}`}
                    >
                      {classItem.difficulty_level.charAt(0).toUpperCase() +
                        classItem.difficulty_level.slice(1)}
                    </span>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{classItem.duration_minutes} min</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{classItem.description}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Max {classItem.max_capacity} participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Weekly Schedule</h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {getSchedulesForDay(selectedDay).length > 0 ? (
              getSchedulesForDay(selectedDay).map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-600 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-2xl font-bold text-orange-600">
                          {formatTime(schedule.start_time)}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {schedule.classes?.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-2">{schedule.classes?.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {schedule.classes?.duration_minutes} minutes
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {schedule.classes?.difficulty_level}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-left md:text-right">
                      <p className="text-sm text-gray-600 mb-1">Instructor</p>
                      <p className="font-bold text-gray-900">{schedule.trainers?.name}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {schedule.current_bookings}/{schedule.classes?.max_capacity} spots filled
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No classes scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join a Class?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Become a member today and get unlimited access to all our classes
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            View Membership Plans
          </button>
        </div>
      </section>
    </div>
  );
}
