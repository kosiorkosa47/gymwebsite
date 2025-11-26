/*
  # Fitness Gym Website Database Schema

  1. New Tables
    - `classes`
      - `id` (uuid, primary key)
      - `name` (text) - Class name (e.g., "HIIT Training", "Yoga Flow")
      - `description` (text) - Detailed class description
      - `duration_minutes` (integer) - Class duration
      - `difficulty_level` (text) - beginner, intermediate, advanced
      - `max_capacity` (integer) - Maximum participants
      - `image_url` (text) - Class promotional image
      - `created_at` (timestamptz)
    
    - `class_schedules`
      - `id` (uuid, primary key)
      - `class_id` (uuid, foreign key to classes)
      - `trainer_id` (uuid, foreign key to trainers)
      - `day_of_week` (text) - monday, tuesday, etc.
      - `start_time` (time) - Class start time
      - `current_bookings` (integer) - Current number of bookings
      - `created_at` (timestamptz)
    
    - `trainers`
      - `id` (uuid, primary key)
      - `name` (text) - Trainer full name
      - `title` (text) - Professional title
      - `bio` (text) - Professional biography
      - `specialties` (text[]) - Array of specialties
      - `certifications` (text[]) - Array of certifications
      - `image_url` (text) - Profile photo
      - `years_experience` (integer)
      - `created_at` (timestamptz)
    
    - `membership_tiers`
      - `id` (uuid, primary key)
      - `name` (text) - Tier name (e.g., "Basic", "Pro", "Elite")
      - `price_monthly` (decimal) - Monthly price
      - `description` (text) - Tier description
      - `features` (text[]) - Array of included features
      - `is_popular` (boolean) - Highlight as most popular
      - `display_order` (integer) - Order for display
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `member_name` (text) - Member name
      - `content` (text) - Testimonial content
      - `rating` (integer) - Rating 1-5
      - `image_url` (text) - Member photo
      - `achievement` (text) - Key achievement (e.g., "Lost 30 lbs")
      - `is_featured` (boolean) - Show on homepage
      - `created_at` (timestamptz)
    
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for classes, trainers, membership_tiers, testimonials (public website data)
    - Restricted write access for contact_submissions (anyone can submit, but cannot read others' submissions)
    
  3. Important Notes
    - All public-facing content tables allow anonymous reads for website visitors
    - Contact submissions are write-only for visitors to protect privacy
    - Time-based scheduling system for class management
*/

CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  max_capacity integer NOT NULL DEFAULT 20,
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  specialties text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  image_url text DEFAULT '',
  years_experience integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS class_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  trainer_id uuid REFERENCES trainers(id) ON DELETE CASCADE NOT NULL,
  day_of_week text NOT NULL CHECK (day_of_week IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  start_time time NOT NULL,
  current_bookings integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price_monthly decimal(10,2) NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  is_popular boolean DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_name text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url text DEFAULT '',
  achievement text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view classes"
  ON classes FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view trainers"
  ON trainers FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view class schedules"
  ON class_schedules FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view membership tiers"
  ON membership_tiers FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view featured testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (is_featured = true);

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_class_schedules_day ON class_schedules(day_of_week);
CREATE INDEX IF NOT EXISTS idx_class_schedules_class_id ON class_schedules(class_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;