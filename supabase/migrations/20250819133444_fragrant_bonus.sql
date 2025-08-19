/*
  # Add Videos Table for Work Showcase

  1. New Table
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `video_url` (text) - YouTube/Vimeo embed URL
      - `thumbnail_url` (text, optional) - Custom thumbnail
      - `project_link` (text, optional) - Link to related project
      - `category` (text) - UAV, CAD, Software, Hardware
      - `year` (text)
      - `duration` (text, optional) - Video duration
      - `tags` (text array) - Video tags
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on videos table
    - Add policies for public read access
    - Add policies for authorized user modifications
*/

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  video_url text NOT NULL,
  thumbnail_url text,
  project_link text,
  category text NOT NULL CHECK (category IN ('UAV', 'CAD', 'Software', 'Hardware')),
  year text NOT NULL,
  duration text,
  tags text[] DEFAULT '{}',
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies for videos
CREATE POLICY "Anyone can view videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only Kanishk can insert videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can update videos"
  ON videos
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  )
  WITH CHECK (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

CREATE POLICY "Only Kanishk can delete videos"
  ON videos
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'kanishk.r2022mech@sece.ac.in'
  );

-- Create trigger for updated_at
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();