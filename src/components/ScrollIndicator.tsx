import { Mouse, ArrowDown } from 'lucide-react';

export const ScrollIndicator = () => {
  return (
    <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 z-10 animate-bounce w-full flex justify-center">
      <div className="flex flex-col items-center space-y-3 text-white drop-shadow-[0_0_10px_#000]">
        <div className="relative">
          <Mouse className="h-8 w-8 text-white drop-shadow-[0_0_10px_#000]" />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white rounded-full animate-pulse drop-shadow-[0_0_8px_#000]" />
        </div>
        <ArrowDown className="h-5 w-5 animate-pulse text-white drop-shadow-[0_0_10px_#000]" />
        <p className="text-sm font-medium tracking-wide text-white drop-shadow-[0_0_10px_#000] whitespace-nowrap">Scroll to Explore</p>
      </div>
    </div>
  );
};
