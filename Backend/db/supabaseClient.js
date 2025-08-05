require('dotenv').config(); // Load environment variables from .env
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Use service key for backend

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_KEY is missing in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;