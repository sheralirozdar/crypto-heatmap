const axios = require('axios');
const config = require('../config/config');

class CoinGeckoService {
  constructor() {
    this.client = axios.create({
      baseURL: config.coingecko.baseUrl,
      timeout: 10000,
      headers: {
        'x-cg-pro-api-key': config.coingecko.apiKey
      }
    });
  }

  async fetchMarkets(page = 1, perPage = 100) {
    try {
      const response = await this.client.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'volume_desc',
          per_page: perPage,
          page: page,
          price_change_percentage: '24h'
        }
      });

      return response.data;
    } catch (error) {
      console.error('CoinGecko API error:', error.message);
      throw new Error(`Failed to fetch market data: ${error.message}`);
    }
  }

  async fetchTopCoins(maxCoins = 150) {
    try {
      // Fetch first page (100 coins)
      const page1 = await this.fetchMarkets(1, 100);
      
      // If we need more coins, fetch second page
      if (maxCoins > 100) {
        const page2 = await this.fetchMarkets(2, maxCoins - 100);
        return [...page1, ...page2].slice(0, maxCoins);
      }
      
      return page1.slice(0, maxCoins);
    } catch (error) {
      throw error;
    }
  }

  transformCoinData(coins) {
    return coins.map(coin => ({
      id: coin.id,
      symbol: coin.symbol?.toUpperCase() || '',
      name: coin.name || '',
      image: coin.image || '',
      price_usd: coin.current_price || 0,
      price_change_pct_24h: coin.price_change_percentage_24h || 0,
      market_cap_usd: coin.market_cap || 0,
      volume_usd_24h: coin.total_volume || 0
    }));
  }
}

module.exports = new CoinGeckoService();