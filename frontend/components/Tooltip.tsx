interface TooltipData {
  name: string;
  price: string;
  marketCap: string;
  volume: string;
  image: string;
}

interface TooltipProps {
  data: TooltipData;
}

export default function Tooltip({ data }: TooltipProps) {
  return (
    <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-100 text-black rounded-lg shadow-lg z-50">
      <div className="text-sm space-y-2">
       
        <div className="flex items-center gap-2">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-4 h-4 rounded-full"
          />
          <span className="font-mono">{data.name}</span>
        </div>
        
      
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span>Price:</span>
          </div>
          <span className="font-mono">{data.price}</span>
        </div>
        
      
       
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            </div>
            <span>Market Cap:</span>
          </div>
          <span className="font-mono">{data.marketCap}</span>
        </div>
        
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <svg className="w-2 h-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span>24h Volume:</span>
          </div>
          <span className="font-mono">{data.volume}</span>
        </div>
        
       
      </div>
    </div>
  );
}