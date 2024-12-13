const express = require('express');
const axios = require('axios');

const app = express();

app.get('/download', async (req, res) => {
  const fileUrl = req.query.url;

  try {
    // Descargar el archivo remoto desde la URL proporcionada
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    // Configurar los encabezados para servir el archivo como descarga
    res.set({
      'Content-Type': 'text/vcard', // Tipo MIME correcto
      'Content-Disposition': 'attachment; filename="contact.vcf"', // Forzar descarga
    });

    // Enviar el archivo al cliente
    res.send(response.data);
  } catch (error) {
    console.error(`Error fetching the file: ${error.message}`);
    res.status(500).send('Error fetching the file');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
