/*
  # Create users table for student portal

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `username` (text)
      - `user_id` (text)
      - `email` (text, unique)
      - `roll_number` (text)
      - `date_of_birth` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `students` table
    - Add policies for:
      - Users can read their own data
      - Users can create their own data
      - Users can update their own data
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  username text NOT NULL,
  user_id text NOT NULL,
  email text NOT NULL UNIQUE,
  roll_number text NOT NULL,
  date_of_birth date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own data
CREATE POLICY "Users can read own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy for users to insert their own data
CREATE POLICY "Users can create own data"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy for users to update their own data
CREATE POLICY "Users can update own data"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);