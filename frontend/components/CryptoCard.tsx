'use client';

import { useState } from 'react';
import Tooltip from './Tooltip';
import { CoinData } from '@/lib/api';
import { formatNumber, formatPercentage, formatCurrency } from '@/lib/utils';

interface CryptoCardProps {
  coin: CoinData & { dominance: number };
  size: 'xl' | 'large' | 'medium' | 'small';
  level: number;
}

export default function CryptoCard({ coin,  size, level }: CryptoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const bgColor = coin.price_change_pct_24h >= 0
    ? 'bg-[#00a06e] hover:bg-[#00c285f0] '
    : 'bg-[#c70025] hover:bg-[#c70025cf]';

  const tooltipData = {
    name: coin.name,
    price: formatCurrency(coin.price_usd),
    marketCap: formatNumber(coin.market_cap_usd),
    volume: formatNumber(coin.volume_usd_24h),
    image : coin.image
  };

  const getFontSize = () => {
    const sizeMap = {
      xl: 'text-8xl',
      large: 'text-xl',
      medium: 'text-lg',
      small: 'text-[7px]'
    };
    return `${sizeMap[size]} font-bold`;
  };

  return (
    <div
      className={`relative rounded-lg transition-all duration-200 text-white ${bgColor} cursor-pointer h-full flex flex-col justify-center items-center border border-solid border-[#dddbdbee]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     
      <div className={`${getFontSize()} text-white  text-center  max-w-full`}>
        {coin.symbol}
      </div>

    
       <div className={
        size === 'xl' ? 'text-6xl ' :
        size === 'large' ? 'text-md ' :
        'text-[5px] font-semibold text-white text-center'
      }>
        {formatCurrency(coin.price_usd)}
      </div>

      {/* 24h Change */}
      <div className={ size === 'xl' ? 'text-6xl ' :
        size === 'large' ? 'text-md ' :
        'text-[5px] font-semibold text-white text-center'}>
        {coin.price_change_pct_24h >= 0 ? '↗' : '↘'}
        {coin.price_change_pct_24h >= 0 ? '+' : ''}
        {formatPercentage(coin.price_change_pct_24h / 100)}
      </div>

      {/* Dominance - only show for larger cells */}
      {(size === 'xl' || size === 'large') && (
        <div className={
        size === 'xl' ? 'text-6xl ' :
        size === 'large' ? 'text-md ' :
        'text-[4px] font-semibold text-white text-center'
      }>
          Dominance: {formatPercentage(coin.dominance / 100)}
        </div>
      )}

     

      {/* Tooltip */}
      {isHovered && <Tooltip data={tooltipData} />}
    </div>
  );
}