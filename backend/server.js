const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});