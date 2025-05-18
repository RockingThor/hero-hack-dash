"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Progress } from "@heroui/progress";

// Mock data - would be replaced with API calls in production
const cryptoData = {
  "BTC": {
    name: "Bitcoin",
    symbol: "BTC",
    currentPrice: 67000,
    change24h: 2.1,
    change7d: 5.3,
    change30d: -2.8,
    marketCap: "1.3T",
    volume24h: "48.2B",
    circulatingSupply: "19.5M",
    allTimeHigh: 69000,
    allTimeHighDate: "2021-11-10",
    icon: "",
    description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    chartData: {
      price: [62000, 63500, 65000, 64200, 66100, 67000, 66800],
      volume: [45, 42, 50, 48, 52, 55, 49],
      dates: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
    },
    transactions: [
      { date: "2025-05-17", type: "Buy", amount: 0.5, price: 65800, value: 32900 },
      { date: "2025-05-10", type: "Sell", amount: 0.2, price: 64200, value: 12840 },
      { date: "2025-04-28", type: "Buy", amount: 0.8, price: 61400, value: 49120 },
      { date: "2025-04-15", type: "Buy", amount: 0.3, price: 63100, value: 18930 }
    ],
    news: [
      { title: "Bitcoin Hits New Monthly High as Traders Eye $70,000", date: "2025-05-18" },
      { title: "Major Bank Announces Bitcoin Custody Services", date: "2025-05-16" },
      { title: "Bitcoin Mining Difficulty Increases by 4%", date: "2025-05-15" }
    ]
  },
  "ETH": {
    name: "Ethereum",
    symbol: "ETH",
    currentPrice: 3100,
    change24h: -1.2,
    change7d: 3.1,
    change30d: 8.7,
    marketCap: "370B",
    volume24h: "15.7B",
    circulatingSupply: "120.2M",
    allTimeHigh: 4878,
    allTimeHighDate: "2021-11-10",
    icon: "",
    description: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
    chartData: {
      price: [2950, 3010, 3080, 3150, 3090, 3020, 3100],
      volume: [14, 16, 18, 17, 15, 13, 16],
      dates: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
    },
    transactions: [
      { date: "2025-05-16", type: "Buy", amount: 5, price: 3020, value: 15100 },
      { date: "2025-05-08", type: "Sell", amount: 2, price: 3150, value: 6300 },
      { date: "2025-04-25", type: "Buy", amount: 8, price: 2930, value: 23440 },
      { date: "2025-04-12", type: "Buy", amount: 3, price: 2850, value: 8550 }
    ],
    news: [
      { title: "Ethereum Developer Announces New Scaling Solution", date: "2025-05-17" },
      { title: "ETH Staking Rates Reach All-Time High", date: "2025-05-15" },
      { title: "Major DeFi Protocol Launches on Ethereum", date: "2025-05-13" }
    ]
  },
  "SOL": {
    name: "Solana",
    symbol: "SOL",
    currentPrice: 150,
    change24h: 4.7,
    change7d: 12.3,
    change30d: 18.5,
    marketCap: "65B",
    volume24h: "3.2B",
    circulatingSupply: "432.5M",
    allTimeHigh: 260,
    allTimeHighDate: "2021-11-06",
    icon: "🟩",
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.",
    chartData: {
      price: [135, 140, 143, 148, 145, 146, 150],
      volume: [2.8, 3.0, 3.5, 3.3, 3.1, 3.4, 3.2],
      dates: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"],
    },
    transactions: [
      { date: "2025-05-15", type: "Buy", amount: 20, price: 145, value: 2900 },
      { date: "2025-05-05", type: "Sell", amount: 10, price: 142, value: 1420 },
      { date: "2025-04-22", type: "Buy", amount: 30, price: 130, value: 3900 },
      { date: "2025-04-10", type: "Buy", amount: 15, price: 125, value: 1875 }
    ],
    news: [
      { title: "Solana TVL Reaches New Record High", date: "2025-05-18" },
      { title: "New NFT Marketplace Launches on Solana", date: "2025-05-14" },
      { title: "Solana Pay Adoption Growing Among Retailers", date: "2025-05-12" }
    ]
  }
};

// Sample chart component (in a real app, you'd use a charting library like recharts or chart.js)
const PriceChart = ({ data, title }: { data: any, title: string }) => (
  <div className="relative h-[300px] w-full">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <div className="absolute inset-0 z-0 flex items-end">
      {data.price.map((price: number, index: number) => {
        const heightPercent = (price / Math.max(...data.price)) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full px-1">
              <div 
                className={`${index > 0 && data.price[index] >= data.price[index-1] ? "bg-success" : "bg-danger"} rounded-t`}
                style={{ height: `${heightPercent * 0.7}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {data.dates[index]}
            </div>
          </div>
        );
      })}
    </div>
    <div className="absolute top-0 right-0 flex gap-2">
      <Chip size="sm" variant="flat" color="success">7D</Chip>
      <Chip size="sm" variant="flat">1M</Chip>
      <Chip size="sm" variant="flat">3M</Chip>
      <Chip size="sm" variant="flat">1Y</Chip>
      <Chip size="sm" variant="flat">All</Chip>
    </div>
  </div>
);

const VolumeChart = ({ data, title }: { data: any, title: string }) => (
  <div className="relative h-[300px] w-full">
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <div className="absolute inset-0 z-0 flex items-end">
      {data.volume.map((volume: number, index: number) => {
        const heightPercent = (volume / Math.max(...data.volume)) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full px-1">
              <div 
                className="bg-primary-300 dark:bg-primary-700 rounded-t"
                style={{ height: `${heightPercent * 0.7}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
              {data.dates[index]}
            </div>
          </div>
        );
      })}
    </div>
    <div className="absolute top-0 right-0 flex gap-2">
      <Chip size="sm" variant="flat" color="primary">7D</Chip>
      <Chip size="sm" variant="flat">1M</Chip>
      <Chip size="sm" variant="flat">3M</Chip>
      <Chip size="sm" variant="flat">1Y</Chip>
      <Chip size="sm" variant="flat">All</Chip>
    </div>
  </div>
);

const PriceComparisonChart = ({ data, title }: { data: any, title: string }) => {
  // This is a mock comparison chart that would typically compare against BTC or market index
  const comparisonData = [3, -2, 5, -1, 4, 2, 3].map((val, i) => data.price[i] * (1 + val/100));
  
  return (
    <div className="relative h-[300px] w-full">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="absolute inset-0 z-0 flex">
        <div className="w-full h-full relative">
          {/* Line for main coin price */}
          <div className="absolute top-1/4 left-0 right-0 border-b border-dashed border-primary/50"></div>
          <div className="absolute top-2/4 left-0 right-0 border-b border-dashed border-primary/50"></div>
          <div className="absolute top-3/4 left-0 right-0 border-b border-dashed border-primary/50"></div>
          
          {/* Main price line */}
          <svg className="w-full h-full" viewBox="0 0 700 300" preserveAspectRatio="none">
            <path 
              d={`M0,${300 - (data.price[0] / Math.max(...data.price) * 200)} ${data.price.map((p: number, i: number) => `L${i * 100},${300 - (p / Math.max(...data.price) * 200)}`).join(' ')}`}
              fill="none"
              stroke="#7828C8"
              strokeWidth="2"
            />
            <path 
              d={`M0,${300 - (comparisonData[0] / Math.max(...comparisonData) * 200)} ${comparisonData.map((p: number, i: number) => `L${i * 100},${300 - (p / Math.max(...comparisonData) * 200)}`).join(' ')}`}
              fill="none"
              stroke="#F5A524"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-0 right-0 flex gap-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-xs">Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-xs">BTC</span>
        </div>
      </div>
    </div>
  );
};

const MarketSentimentChart = ({ data, title }: { data: any, title: string }) => {
  // Mock sentiment data (would come from API in real app)
  const sentiment = 67; // Percentage positive
  
  return (
    <div className="h-[300px] w-full flex flex-col">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center">
          <svg className="w-full h-full absolute">
            <circle 
              cx="50%" 
              cy="50%" 
              r="69" 
              fill="none" 
              stroke="#17C964" 
              strokeWidth="8"
              strokeDasharray={`${sentiment * 4.33} ${(100 - sentiment) * 4.33}`}
              strokeDashoffset="-25"
              transform="rotate(-90 96 96)"
            />
          </svg>
          <div className="text-center">
            <div className="text-3xl font-bold">{sentiment}%</div>
            <div className="text-sm text-muted-foreground">Bullish</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm">Bullish</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            <span className="text-sm">Bearish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CoinDetails({ params }: { params: { symbol: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const symbol = params.symbol.toUpperCase();
  const coin = cryptoData[symbol as keyof typeof cryptoData];
  
  if (!coin) {
    return (
      <div className="w-full max-w-5xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Coin Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find any information for the symbol {symbol}</p>
        <Button as="a" href="/" color="primary">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Header with basic coin info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{coin.icon}</div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{coin.name}</h1>
            <div className="text-lg text-muted-foreground">{coin.symbol}</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-3xl font-bold">${coin.currentPrice.toLocaleString()}</div>
          <div className={`flex items-center ${coin.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
            {coin.change24h >= 0 ? "▲" : "▼"} {Math.abs(coin.change24h)}% (24h)
          </div>
        </div>
      </div>

      {/* Price action card */}
      <Card className="p-6 shadow-lg bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <span className="text-xl font-semibold">${coin.marketCap}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">24h Volume</span>
            <span className="text-xl font-semibold">${coin.volume24h}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Circulating Supply</span>
            <span className="text-xl font-semibold">{coin.circulatingSupply} {coin.symbol}</span>
          </div>
        </div>
        
        <div className="border-t my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">All-Time High</span>
            <span className="text-xl font-semibold">${coin.allTimeHigh.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">{coin.allTimeHighDate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">7d Change</span>
            <span className={`text-xl font-semibold ${coin.change7d >= 0 ? 'text-success' : 'text-danger'}`}>
              {coin.change7d >= 0 ? '+' : ''}{coin.change7d}%
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">30d Change</span>
            <span className={`text-xl font-semibold ${coin.change30d >= 0 ? 'text-success' : 'text-danger'}`}>
              {coin.change30d >= 0 ? '+' : ''}{coin.change30d}%
            </span>
          </div>
        </div>
      </Card>

      {/* Tabs for different sections */}
      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)} 
        className="w-full"
        size="lg"
        color="primary"
      >
        <Tab key="overview" title="Overview">
          <div className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">About {coin.name}</h2>
              <p className="text-muted-foreground">{coin.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <PriceChart data={coin.chartData} title="Price (7 Days)" />
              <VolumeChart data={coin.chartData} title="Volume (7 Days)" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PriceComparisonChart data={coin.chartData} title="Comparison with BTC" />
              <MarketSentimentChart data={coin.chartData} title="Market Sentiment" />
            </div>
          </div>
        </Tab>
        
        <Tab key="transactions" title="Your Transactions">
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Your {coin.name} Transactions</h2>
            
            <Card className="overflow-x-auto p-0">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="py-3 px-4 text-left font-semibold">Date</th>
                    <th className="py-3 px-4 text-left font-semibold">Type</th>
                    <th className="py-3 px-4 text-left font-semibold">Amount</th>
                    <th className="py-3 px-4 text-left font-semibold">Price</th>
                    <th className="py-3 px-4 text-left font-semibold">Value</th>
                    <th className="py-3 px-4 text-left font-semibold">Current Value</th>
                    <th className="py-3 px-4 text-left font-semibold">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {coin.transactions.map((tx: any, i: number) => {
                    const currentValue = tx.amount * coin.currentPrice;
                    const profitLoss = currentValue - tx.value;
                    const profitPercent = (profitLoss / tx.value) * 100;
                    
                    return (
                      <tr key={i} className="border-b last:border-none hover:bg-accent transition-colors">
                        <td className="py-3 px-4">{tx.date}</td>
                        <td className="py-3 px-4">
                          <Chip size="sm" color={tx.type === "Buy" ? "success" : "danger"}>
                            {tx.type}
                          </Chip>
                        </td>
                        <td className="py-3 px-4">{tx.amount} {coin.symbol}</td>
                        <td className="py-3 px-4">${tx.price.toLocaleString()}</td>
                        <td className="py-3 px-4">${tx.value.toLocaleString()}</td>
                        <td className="py-3 px-4">${currentValue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <div className={profitLoss >= 0 ? "text-success" : "text-danger"}>
                            {profitLoss >= 0 ? "+" : ""}{profitLoss.toLocaleString()} ({profitPercent.toFixed(2)}%)
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Performance Summary</h3>
              <Card className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calculate total stats */}
                {(() => {
                  const totalAmount = coin.transactions.reduce((sum: number, tx: any) => 
                    sum + (tx.type === 'Buy' ? tx.amount : -tx.amount), 0);
                  const totalInvested = coin.transactions.reduce((sum: number, tx: any) => 
                    sum + (tx.type === 'Buy' ? tx.value : -tx.value), 0);
                  const currentValue = totalAmount * coin.currentPrice;
                  const totalProfitLoss = currentValue - totalInvested;
                  const profitPercent = (totalProfitLoss / totalInvested) * 100;
                  
                  return (
                    <>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Holdings</div>
                        <div className="text-xl font-semibold">{totalAmount.toFixed(6)} {coin.symbol}</div>
                        <div className="text-muted-foreground">${(totalAmount * coin.currentPrice).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Invested</div>
                        <div className="text-xl font-semibold">${totalInvested.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Total Profit/Loss</div>
                        <div className={`text-xl font-semibold ${totalProfitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                          {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toLocaleString()} ({profitPercent.toFixed(2)}%)
                        </div>
                      </div>
                    </>
                  );
                })()} 
              </Card>
            </div>
          </div>
        </Tab>
        
        <Tab key="news" title="News & Events">
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Latest {coin.name} News</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coin.news.map((item: any, i: number) => (
                <Card key={i} className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <div className="text-sm text-muted-foreground mt-auto">{item.date}</div>
                </Card>
              ))}
            </div>
            
            <Button className="mt-6" variant="bordered" color="primary">
              Load More News
            </Button>
          </div>
        </Tab>
      </Tabs>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button color="success" size="lg">Buy {coin.symbol}</Button>
        <Button color="danger" size="lg">Sell {coin.symbol}</Button>
        <Button variant="bordered" size="lg">Set Alert</Button>
        <Button variant="light" size="lg">
          <Tooltip content="Add to favorites">
            <span>★ Add to Watchlist</span>
          </Tooltip>
        </Button>
      </div>
    </section>
  );
}
