const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const heatmapRoutes = require('../api/heatmap');
const config = require('../config/config');

const app = express();
const PORT = config.app.port;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000']
}));
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api', heatmapRoutes);

// Health check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'healthy', 
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 API available at: http://localhost:${PORT}/api/heatmap`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;