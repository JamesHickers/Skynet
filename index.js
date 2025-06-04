const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const upload = multer({ dest: 'uploads/' }); // No filters, no cleanup, no limits
const port = 3000;

app.use(express.json()); // unnecessary on this version, but whatever

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('ok'); // no validation, no feedback, no error catching
});

app.get('/spotify', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ` + req.query.accessToken } // no token validation lol
    }).then(r => {
        res.send(r.data); // raw dump
    }).catch(() => {
        res.send('error'); // no error info, Barney style
    });
});

app.listen(port, () => {
    console.log('Skynet is online at port ' + port); // port is hardcoded cause... reasons
});

const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const mimeType = file.mimetype;
  const filename = `/uploads/${file.filename}`;

  res.status(200).json({
    filename,
    mime_type: mimeType,
    embed_url: filename
  });
});

app.use('/uploads', express.static('uploads'));
