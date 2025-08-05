// backend/routes/news.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const News = require('../models/News');
const router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.post('/news', async (req, res) => {
  const { title, content, file } = req.body; // Assume file is sent as a base64 string or use multer for file uploads
  try {
    let fileUrl = null;
    if (file) {
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('news-files')
        .upload(fileName, Buffer.from(file, 'base64'), { contentType: 'image/jpeg' });
      if (uploadError) {
        return res.status(400).json({ error: uploadError.message });
      }
      fileUrl = `${supabaseUrl}/storage/v1/object/public/news-files/${fileName}`;
    }

    const news = await News.create({
      title,
      content,
      fileUrl,
      created_by: req.user.id, // Assume user ID is set by middleware
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;