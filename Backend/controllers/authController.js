const supabase = require('../db/supabaseClient');

// SUPABASE-ONLY REGISTRATION
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Received registration data:', { username, email, password });

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username, // Store username in user metadata
          display_name: username
        }
      }
    });

    if (authError) {
      console.error('Supabase registration error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Optionally store additional user data in a users table
    if (authData.user) {
      const { data: userData, error: userError } = await supabase
        .from('users') // You'll need to create this table in Supabase
        .insert([
          {
            id: authData.user.id,
            username: username,
            email: email,
            created_at: new Date()
          }
        ]);

      if (userError) {
        console.error('Error storing user data:', userError);
        // Continue anyway, auth user was created
      }
    }

    console.log('User registered in Supabase:', authData.user);
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { 
        id: authData.user.id,
        username: username, 
        email: email 
      },
      note: 'Please check your email to verify your account'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// SUPABASE-ONLY LOGIN
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    let email = username;

    // If username is provided instead of email, find the email first
    if (!username.includes('@')) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('username', username)
        .single();

      if (userError || !userData) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      
      email = userData.email;
    }

    // Login with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      console.error('Supabase login error:', authError);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Get additional user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', authData.user.id)
      .single();

    const userResponse = {
      id: authData.user.id,
      email: authData.user.email,
      username: userData?.username || 'N/A'
    };

    console.log('User logged in:', userResponse);
    res.status(200).json({ 
      message: 'Login successful', 
      user: userResponse,
      session: authData.session
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };