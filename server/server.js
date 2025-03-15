const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware to allow all domains (for testing purposes)
app.use(cors());

// Use Express's built-in JSON parser
app.use(express.json());

// Set up Google Sheets API
const sheets = google.sheets({ version: 'v4' });

// Create an authentication client for Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Cache the auth client promise on server start
const authClientPromise = auth.getClient();

// Set the Google Sheets spreadsheet ID and range
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const range = 'Sheet1!A:C'; // Adjust range as needed

// GET endpoint for the root URL to avoid "Cannot get /"
app.get('/', (req, res) => {
  res.send('Hello, the server is up and running!');
});

// POST endpoint to handle form submission
app.post('/api/submitForm', async (req, res) => {
  const { name, email, number } = req.body;

  // Validate the fields
  if (!name || !email || !number) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Use the cached auth client
    const authClient = await authClientPromise;
    
    console.log('Received data:', { name, email, number });

    // Append the form data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, number]],
      },
    });

    console.log('Sheet update response:', response);
    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
