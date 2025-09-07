export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price_usd: number;
  price_change_pct_24h: number;
  market_cap_usd: number;
  volume_usd_24h: number;
}

export interface HeatmapResponse {
  as_of: string;
  coins: CoinData[];
  source?: string;
  warning?: string;
}

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8000';

export async function fetchCoinData(): Promise<HeatmapResponse> {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/heatmap`, {
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Unable to fetch cryptocurrency data');
  }
}