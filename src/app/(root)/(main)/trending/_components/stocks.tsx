import { cn } from '@/lib/utils'
import { MoveDown, MoveUp } from 'lucide-react'
import { HTMLAttributes } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const stocks = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    changePercent: -1.36,
    latestPrice: 178.23,
  },
  {
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    changePercent: 0.99,
    latestPrice: 134.87,
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla Inc.',
    changePercent: -2.04,
    latestPrice: 254.76,
  },
  {
    symbol: 'AMZN',
    companyName: 'Amazon.com Inc.',
    changePercent: 1.28,
    latestPrice: 123.5,
  },
  {
    symbol: 'MSFT',
    companyName: 'Microsoft Corp.',
    changePercent: 0.75,
    latestPrice: 312.67,
  },
  {
    symbol: 'NFLX',
    companyName: 'Netflix Inc.',
    changePercent: -3.12,
    latestPrice: 398.21,
  },
  {
    symbol: 'NVDA',
    companyName: 'NVIDIA Corp.',
    changePercent: 2.67,
    latestPrice: 472.33,
  },
  {
    symbol: 'META',
    companyName: 'Meta Platforms Inc.',
    changePercent: 1.89,
    latestPrice: 289.74,
  },
  {
    symbol: 'BABA',
    companyName: 'Alibaba Group Holding Ltd.',
    changePercent: -0.95,
    latestPrice: 88.15,
  },
  {
    symbol: 'SPOT',
    companyName: 'Spotify Technology S.A.',
    changePercent: -2.45,
    latestPrice: 152.65,
  },
  {
    symbol: 'INTC',
    companyName: 'Intel Corp.',
    changePercent: 1.05,
    latestPrice: 34.22,
  },
  {
    symbol: 'AMD',
    companyName: 'Advanced Micro Devices Inc.',
    changePercent: 0.68,
    latestPrice: 108.15,
  },
  {
    symbol: 'BA',
    companyName: 'The Boeing Company',
    changePercent: -1.87,
    latestPrice: 188.47,
  },
  {
    symbol: 'KO',
    companyName: 'Coca-Cola Co.',
    changePercent: 0.56,
    latestPrice: 58.23,
  },
  {
    symbol: 'DIS',
    companyName: 'The Walt Disney Company',
    changePercent: -0.78,
    latestPrice: 83.74,
  },
  {
    symbol: 'PYPL',
    companyName: 'PayPal Holdings Inc.',
    changePercent: -1.65,
    latestPrice: 61.44,
  },
  {
    symbol: 'SBUX',
    companyName: 'Starbucks Corp.',
    changePercent: 0.88,
    latestPrice: 95.13,
  },
  {
    symbol: 'NKE',
    companyName: 'Nike Inc.',
    changePercent: -0.42,
    latestPrice: 98.65,
  },
  {
    symbol: 'ORCL',
    companyName: 'Oracle Corp.',
    changePercent: 1.47,
    latestPrice: 112.29,
  },
  {
    symbol: 'CSCO',
    companyName: 'Cisco Systems Inc.',
    changePercent: -2.11,
    latestPrice: 52.71,
  },
]

export const Stocks = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <ScrollArea className={cn('w-full whitespace-nowrap', className)}>
      <div className="flex w-max">
        {stocks.map(
          ({ companyName, symbol, latestPrice, changePercent }, index) => {
            return (
              <div
                key={index}
                className="mr-4 flex w-fit flex-col text-xs text-muted-foreground lg:gap-1"
              >
                <div className="flex items-center gap-1">
                  <span className="text-primary">{companyName}</span>
                  <span className="text-[9px]">({symbol})</span>
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span>${latestPrice}</span>
                  {changePercent > 0 ? (
                    <span className="flex items-center text-green-500">
                      {changePercent}% <MoveUp className="size-2" />
                    </span>
                  ) : changePercent < 0 ? (
                    <span className="flex items-center text-red-500">
                      {changePercent}% <MoveDown className="size-2" />
                    </span>
                  ) : (
                    <span className="p-1 text-gray-500">{changePercent}%</span>
                  )}
                </div>
              </div>
            )
          }
        )}

        <ScrollBar orientation="horizontal" />
      </div>
    </ScrollArea>
  )
}
