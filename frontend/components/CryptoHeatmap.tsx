'use client';

import { useMemo } from 'react';
import CryptoCard from './CryptoCard';
import { CoinData } from '@/lib/api';

interface CryptoHeatmapProps {
  coins: CoinData[];
}

export default function CryptoHeatmap({ coins }: CryptoHeatmapProps) {
  const totalMarketCap = useMemo(() => {
    return coins.reduce((sum, coin) => sum + coin.market_cap_usd, 0);
  }, [coins]);

  const coinsWithDominance = useMemo(() => {
    return coins.map(coin => ({
      ...coin,
      dominance: (coin.market_cap_usd / totalMarketCap) * 100
    }));
  }, [coins, totalMarketCap]);

  if (coinsWithDominance.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No cryptocurrency data available</p>
      </div>
    );
  }

  const displayCoins = coinsWithDominance.slice(0, 100);
  const gridItems = [];
  for (let i = 0; i < displayCoins.length; i++) {
    let size: 'xl' | 'large' | 'medium' | 'small' = 'small';
    let level: number = 1;
    
    // Determine size and level based on position
    if (i === 0) {
      size = 'xl';
      level = 1; // Highest level for the first coin
    } else if (i >= 1 && i <= 3) {
      size = 'large';
      level = 2;
    } else if (i >= 4 && i <= 6) {
      size = 'medium';
      level = 3;
    } else {
      size = 'small';
      level = 4;
    }

    gridItems.push(
      <div key={displayCoins[i].id} className="bg-white rounded-lg border border-gray-200 h-full">
        <CryptoCard coin={displayCoins[i]} size={size} level={level} />
      </div>
    );
  }

  return (
    <div className="w-full h-full grid grid-cols-2 ">
  
      <div className="bg-white rounded-xl shadow-lg h-screen ">
        {gridItems[0]}
      </div>

     
      <div className="grid grid-rows-2 h-screen w-full">        
        <div className="grid grid-cols-[2fr,1fr,1fr]">
          {gridItems.slice(1, 4)}
        </div>

<div className="grid grid-cols-[200px_100px_80px_75px_65px_58px_55px_52px_52px_52px] ">
          
          <div className="grid grid-rows-[repeat(3,127px)]  ">
            {gridItems.slice(4, 7)}
          </div>

          <div className="grid grid-rows-[repeat(4,95px)] ">
            {gridItems.slice(7, 11)}
           
          </div>
          <div className="grid grid-rows-[80px_repeat(7,42.8px)]">
            {gridItems.slice(11, 19)}
           
          </div>

           <div className="grid grid-rows-[80px_repeat(8,37.5px)]">        
              {gridItems.slice(18,27)}
              
          </div>
          <div className="grid grid-rows-[80px_repeat(11,27.3px)] ">
            {gridItems.slice(27,39)}
           
          </div>
          <div className="grid grid-rows-[80px_repeat(11,27.2px)] ">

            {gridItems.slice(39,51)}
           
          </div>
          <div className="grid grid-rows-[80px_repeat(11,27.2px)] ">
            {gridItems.slice(50,62)}
           
          </div>
           
          <div className="grid grid-rows-[80px_repeat(11,27.2px)] ">
            {gridItems.slice(62,74)}
           
          </div>
          <div className="grid grid-rows-[80px_repeat(11,27.2px)] ">
            {gridItems.slice(74,86)}
           
          </div>
          <div className="grid grid-rows-[80px_repeat(13,23px)] ">
            {gridItems.slice(86,100)}
           
          </div>
          
        </div>
      </div>
    </div>
  );
}