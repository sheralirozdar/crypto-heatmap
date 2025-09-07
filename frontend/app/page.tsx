'use client';

import { useState, useEffect } from 'react';
import CryptoHeatmap from '@/components/CryptoHeatmap';
import { fetchCoinData, CoinData } from '@/lib/api';

export default function Home() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCoinData();
      setCoins(data.coins);
      setLastUpdated(data.as_of);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    loadData();
  }, []);

  if (loading && coins.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-gray-600">Loading cryptocurrency data...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className=" ">
      

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {coins.length > 0 ? (
          <CryptoHeatmap coins={coins} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No cryptocurrency data available</p>
            <button
              onClick={loadData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}