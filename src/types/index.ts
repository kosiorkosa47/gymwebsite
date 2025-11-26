export interface Class {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  max_capacity: number;
  image_url: string;
  created_at: string;
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  image_url: string;
  years_experience: number;
  created_at: string;
}

export interface ClassSchedule {
  id: string;
  class_id: string;
  trainer_id: string;
  day_of_week: string;
  start_time: string;
  current_bookings: number;
  created_at: string;
  classes?: Class;
  trainers?: Trainer;
}

export interface MembershipTier {
  id: string;
  name: string;
  price_monthly: number;
  description: string;
  features: string[];
  is_popular: boolean;
  display_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  member_name: string;
  content: string;
  rating: number;
  image_url: string;
  achievement: string;
  is_featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}
