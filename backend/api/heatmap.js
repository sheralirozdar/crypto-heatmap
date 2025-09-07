const express = require('express');
const coingeckoService = require('./coingecko');
const config = require('../config/config');

const router = express.Router();

const CACHE_KEY = 'coin_data';

router.get('/heatmap', async (req, res, next) => {
  try {

    

    // Fetch from CoinGecko
    const rawData = await coingeckoService.fetchTopCoins(config.app.maxCoins);
    const transformedData = coingeckoService.transformCoinData(rawData);

  
    res.json({
      as_of: new Date().toISOString(),
      coins: transformedData,
      source: 'api'
    });

  } catch (error) {
    console.log('Error in /heatmap route:', error.message);
    
    next(error);
  }
});





module.exports = router;