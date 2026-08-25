const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('URL missing');

  try {
    const response = await axios({
      method: 'get',
      url: targetUrl,
      headers: {
        'User-Agent': 'okhttp/5.0.0-alpha.2'
      },
      responseType: 'stream'
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/x-mpegURL');
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Proxy error: ' + error.message);
  }
});

module.exports = app;
