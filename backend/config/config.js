const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  coingecko: {
    baseUrl: process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3',
    apiKey: process.env.COINGECKO_API_KEY,
  },
 
  app: {
    maxCoins: parseInt(process.env.MAX_COINS) || 150,
    port: process.env.PORT || 8000
  }
};