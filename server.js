const express = require('express');
const axios = require('axios');

const app = express();

app.get('/download', async (req, res) => {
  const fileUrl = req.query.url;

  try {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    res.set({
      'Content-Type': 'text/vcard',
      'Content-Disposition': 'attachment; filename=\"contact.vcf\"',
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching the file');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
