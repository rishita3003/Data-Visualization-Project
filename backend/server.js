const express = require('express');
const cors = require('cors');
const fs = require('fs'); // You were missing this import
const Papa = require('papaparse'); // You were missing this import

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data route
app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, label: 'Jan', value: 100 },
    { id: 2, label: 'Feb', value: 200 },
    { id: 3, label: 'Mar', value: 150 },
    { id: 4, label: 'Apr', value: 300 },
    { id: 5, label: 'May', value: 250 },
    { id: 6, label: 'Jun', value: 180 },
  ];
  
  res.json(data);
});

// API endpoint to get country coordinates
app.get('/api/country-coordinates', (req, res) => {
  try {
    console.log("Entered")
    // Path to the CSV file - adjust this to your file location
    const csvFilePath = "C:\\Users\\Rishita\\Desktop\\Data-Visualization-Project\\frontend\\src\\charts\\countries_coordinates.csv"
    
    // Read the CSV file
    const fileContent = fs.readFileSync(csvFilePath, 'utf8');
    console.log("File content: ", fileContent.substring(0, 200) + "..."); // Only log a preview
    
    // Parse the CSV
    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true, // Convert numbers automatically
      skipEmptyLines: true,
      complete: (results) => {
        console.log(`Successfully parsed ${results.data.length} country records`);
        
        // Send the parsed data as JSON
        res.json({
          success: true,
          count: results.data.length,
          data: results.data
        });
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        res.status(500).json({
          success: false,
          error: 'Error parsing CSV file'
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});