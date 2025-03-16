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

// Set the Google Sheets spreadsheet ID and updated range (including timestamp column)
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
const range = 'Sheet1!A:D'; // Updated range to include timestamp

// Assume sheetId is known. Typically, the first sheet has sheetId 0. Change if necessary.
const sheetId = 0;

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

  // Automatically generate the timestamp on the server
  const timestamp = new Date().toISOString();

  try {
    // Use the cached auth client
    const authClient = await authClientPromise;
    
    console.log('Received data:', { name, email, number, timestamp });

    // Insert a new row at the top (after header row)
    await sheets.spreadsheets.batchUpdate({
      auth: authClient,
      spreadsheetId,
      resource: {
        requests: [
          {
            insertDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: 1, // Insert after the header row (header assumed at index 0)
                endIndex: 2,
              },
              inheritFromBefore: false,
            },
          },
        ],
      },
    });

    // Update the newly inserted row with the form data and the auto-generated timestamp
    await sheets.spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: 'Sheet1!A2:D2', // Update the new row
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, name, email, number]],
      },
    });

    console.log('Sheet updated with new data.');
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
