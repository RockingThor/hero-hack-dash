"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Progress } from "@heroui/progress";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

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
    icon: "", // Will be replaced by a styled span
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
    icon: "", // Will be replaced by a styled span
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
    icon: "", // Will be replaced by a styled span, removing emoji for consistency
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

// Enhanced Custom Chart Components with Hero UI Styling
const PriceChart = ({ data, title }: { data: any, title: string }) => (
  <Card className="p-4 md:p-6 h-full flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <div className="flex gap-1">
        <Chip size="sm" variant="flat" color="primary">7D</Chip>
        <Chip size="sm" variant="flat">1M</Chip>
        <Chip size="sm" variant="flat">3M</Chip>
        <Chip size="sm" variant="flat">1Y</Chip>
        <Chip size="sm" variant="flat">All</Chip>
      </div>
    </div>
    <div className="flex-1 flex items-end space-x-1">
      {data.price.map((price: number, index: number) => {
        const maxHeight = Math.max(...data.price);
        const heightPercent = maxHeight > 0 ? (price / maxHeight) * 100 : 0;
        const isPositive = index > 0 ? data.price[index] >= data.price[index-1] : true;
        return (
          <div key={index} className="flex-1 flex flex-col items-center justify-end group">
            <Tooltip content={`$${price.toLocaleString()} on ${data.dates[index]}`} placement="top">
              <div 
                className={`w-full ${isPositive ? "bg-success-500" : "bg-danger-500"} hover:opacity-80 transition-opacity rounded-t`}
                style={{ height: `${Math.max(heightPercent * 0.8, 2)}%` }} // Ensure minimum height for visibility
              ></div>
            </Tooltip>
            <div className="text-xs text-muted-foreground mt-1 w-full text-center truncate group-hover:font-semibold">
              {data.dates[index].split(' ')[1]} {/* Show only day part for brevity */}
            </div>
          </div>
        );
      })}
    </div>
  </Card>
);

const VolumeChart = ({ data, title }: { data: any, title: string }) => (
  <Card className="p-4 md:p-6 h-full flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <div className="flex gap-1">
        <Chip size="sm" variant="flat" color="primary">7D</Chip>
        <Chip size="sm" variant="flat">1M</Chip>
        <Chip size="sm" variant="flat">3M</Chip>
        <Chip size="sm" variant="flat">1Y</Chip>
        <Chip size="sm" variant="flat">All</Chip>
      </div>
    </div>
    <div className="flex-1 flex items-end space-x-1">
      {data.volume.map((volume: number, index: number) => {
        const maxHeight = Math.max(...data.volume);
        const heightPercent = maxHeight > 0 ? (volume / maxHeight) * 100 : 0;
        return (
          <div key={index} className="flex-1 flex flex-col items-center justify-end group">
            <Tooltip content={`${volume}M on ${data.dates[index]}`} placement="top">
              <div 
                className="w-full bg-primary-400 hover:bg-primary-500 transition-colors rounded-t"
                style={{ height: `${Math.max(heightPercent * 0.8, 2)}%` }} // Ensure minimum height
              ></div>
            </Tooltip>
            <div className="text-xs text-muted-foreground mt-1 w-full text-center truncate group-hover:font-semibold">
              {data.dates[index].split(' ')[1]}
            </div>
          </div>
        );
      })}
    </div>
  </Card>
);

const PriceComparisonChart = ({ data, title }: { data: any, title: string }) => {
  const comparisonData = [3, -2, 5, -1, 4, 2, 3].map((val, i) => data.price[i] * (1 + val/100));
  const maxPrice = Math.max(...data.price, ...comparisonData);

  const generatePath = (seriesData: number[]) => {
    if (!seriesData || seriesData.length === 0) return "M0,150"; // Default path if no data
    return `M0,${150 - (seriesData[0] / maxPrice * 130)} ${seriesData.map((p: number, i: number) => `L${(i / (seriesData.length -1)) * 680},${150 - (p / maxPrice * 130)}`).join(' ')}`;
  };
  
  return (
    <Card className="p-4 md:p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Current</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 bg-warning-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">BTC</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        {/* Grid lines */}
        {[25, 50, 75].map(val => (
          <div key={val} className="absolute left-0 right-0 border-b border-dashed border-default-200" style={{top: `${val}%`}}></div>
        ))}
        <svg className="w-full h-full" viewBox="0 0 700 150" preserveAspectRatio="none">
          <path 
            d={generatePath(data.price)}
            fill="none"
            className="stroke-primary"
            strokeWidth="2"
          />
          <path 
            d={generatePath(comparisonData)}
            fill="none"
            className="stroke-warning-500"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        </svg>
      </div>
    </Card>
  );
};

const MarketSentimentChart = ({ data, title }: { data: any, title: string }) => {
  const sentiment = 67; // Percentage positive
  const circumference = 2 * Math.PI * 40; // r = 40
  const strokeDasharray = `${(sentiment / 100) * circumference} ${((100 - sentiment) / 100) * circumference}`;
  
  return (
    <Card className="p-4 md:p-6 h-full flex flex-col">
      <h3 className="text-lg font-medium text-foreground mb-3">{title}</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 md:w-40 md:h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              className="stroke-default-200"
              strokeWidth="10"
              fill="none" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              className="stroke-success-500"
              strokeWidth="10"
              fill="none" 
              strokeDasharray={strokeDasharray}
              strokeDashoffset={circumference / 4} // Start at 12 o'clock
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-foreground">{sentiment}%</div>
            <div className="text-sm text-success-500 font-medium">Bullish</div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-success-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Bullish</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-default-300 rounded-full"></div> {/* Assuming this for neutral/bearish part of the donut */}
            <span className="text-xs text-muted-foreground">Bearish</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

type PageProps = {
  params: { symbol: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function CoinDetails({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const symbol = params.symbol.toUpperCase();
  const coin = cryptoData[symbol as keyof typeof cryptoData];
  
  if (!coin) {
    return (
      <div className="w-full max-w-5xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4 text-foreground">Coin Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find any information for the symbol {symbol}</p>
        <Button as="a" href="/" color="primary">Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <section className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Header with basic coin info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-1">
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 flex items-center justify-center bg-primary-100 text-primary-600 font-semibold rounded-full text-2xl">
            {coin.name.charAt(0)}
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{coin.name}</h1>
            <div className="text-lg text-muted-foreground">{coin.symbol}</div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
          <div className="text-3xl md:text-4xl font-bold text-foreground">${coin.currentPrice.toLocaleString()}</div>
          <div className={`flex items-center text-md font-medium ${coin.change24h >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
            {coin.change24h >= 0 ? "▲" : "▼"} {Math.abs(coin.change24h)}% 
            <span className="text-xs text-muted-foreground ml-1">(24h)</span>
          </div>
        </div>
      </div>

      {/* Price action card */}
      <Card className="p-6 shadow-lg bg-background border border-default-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">Market Cap</span>
            <span className="text-lg sm:text-xl font-semibold text-foreground">${coin.marketCap}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">24h Volume</span>
            <span className="text-lg sm:text-xl font-semibold text-foreground">${coin.volume24h}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">Circulating Supply</span>
            <span className="text-lg sm:text-xl font-semibold text-foreground">{coin.circulatingSupply} {coin.symbol}</span>
          </div>
        
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">All-Time High</span>
            <span className="text-lg sm:text-xl font-semibold text-foreground">${coin.allTimeHigh.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{coin.allTimeHighDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">7d Change</span>
            <span className={`text-lg sm:text-xl font-semibold ${coin.change7d >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {coin.change7d >= 0 ? '+' : ''}{coin.change7d}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm text-muted-foreground mb-0.5">30d Change</span>
            <span className={`text-lg sm:text-xl font-semibold ${coin.change30d >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
              {coin.change30d >= 0 ? '+' : ''}{coin.change30d}%
            </span>
          </div>
        </div>
      </Card>

      {/* Tabs for different sections */}
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        aria-label="Coin Details Tabs"
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary"
        }}
      >
        <Tab key="overview" title="Overview">
          <div className="py-5 space-y-8">
            <Card className="p-4 md:p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">About {coin.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{coin.description}</p>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PriceChart data={coin.chartData} title="Price (Last 7 Days)" />
              <VolumeChart data={coin.chartData} title="Volume (Last 7 Days)" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PriceComparisonChart data={coin.chartData} title={`${coin.symbol} vs BTC Performance`} />
              <MarketSentimentChart data={coin.chartData} title="Market Sentiment (Mock)" />
            </div>
          </div>
        </Tab>
        
        <Tab key="transactions" title="Your Transactions">
          <div className="py-5 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Your {coin.name} Transactions</h2>
              <Button color="primary" variant="ghost" size="sm">Add Transaction</Button>
            </div>
            
            <Card className="p-0 border border-default-200">
              <Table aria-label="User Transactions Table">
                <TableHeader>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Value</TableColumn>
                  <TableColumn className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Profit/Loss</TableColumn>
                </TableHeader>
                <TableBody items={coin.transactions} emptyContent={<div className="py-10 text-center text-muted-foreground">No transactions recorded yet.</div>}>
                  {(tx: any) => {
                    const currentValue = tx.amount * coin.currentPrice;
                    const profitLoss = currentValue - tx.value;
                    const profitPercent = tx.value !== 0 ? (profitLoss / tx.value) * 100 : 0;
                    return (
                      <TableRow key={tx.date + tx.type + tx.amount}> {/* Basic key, consider more unique ID if available */}
                        <TableCell className="text-foreground">{tx.date}</TableCell>
                        <TableCell>
                          <Chip size="sm" variant="flat" color={tx.type === "Buy" ? "success" : "danger"}>
                            {tx.type}
                          </Chip>
                        </TableCell>
                        <TableCell className="text-foreground">{tx.amount} {coin.symbol}</TableCell>
                        <TableCell className="text-foreground">${tx.price.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">${tx.value.toLocaleString()}</TableCell>
                        <TableCell className="text-foreground">${currentValue.toLocaleString()}</TableCell>
                        <TableCell className={`font-medium text-right ${profitLoss >= 0 ? "text-success-500" : "text-danger-500"}`}>
                          {profitLoss >= 0 ? "+" : ""}{profitLoss.toLocaleString()} ({profitPercent.toFixed(2)}%)
                        </TableCell>
                      </TableRow>
                    );
                  }}
                </TableBody>
              </Table>
            </Card>
            
            <Card className="p-4 md:p-6 border border-default-200">
              <h3 className="text-lg font-semibold text-foreground mb-3">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const totalAmount = coin.transactions.reduce((sum: number, tx: any) => 
                    sum + (tx.type === 'Buy' ? tx.amount : -tx.amount), 0);
                  const totalInvested = coin.transactions.reduce((sum: number, tx: any) => 
                    sum + (tx.type === 'Buy' ? tx.value : (tx.type === 'Sell' ? tx.value : 0)), 0); // Consider only buy for total invested, or adjust logic for sells
                  const currentValue = totalAmount * coin.currentPrice;
                  const totalProfitLoss = currentValue - totalInvested; // This logic might need refinement based on how 'Sell' affects investment
                  const profitPercent = totalInvested !== 0 ? (totalProfitLoss / totalInvested) * 100 : 0;
                  
                  return (
                    <>
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground mb-0.5">Total Holdings</div>
                        <div className="text-lg sm:text-xl font-semibold text-foreground">{totalAmount.toFixed(6)} {coin.symbol}</div>
                        <div className="text-xs text-muted-foreground">${(totalAmount * coin.currentPrice).toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground mb-0.5">Total Invested</div>
                        <div className="text-lg sm:text-xl font-semibold text-foreground">${totalInvested.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm text-muted-foreground mb-0.5">Net Profit/Loss</div>
                        <div className={`text-lg sm:text-xl font-semibold ${totalProfitLoss >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                          {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLoss.toLocaleString()} 
                          <span className="text-xs"> ({profitPercent.toFixed(2)}%)</span>
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
          <div className="py-5 space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">Latest {coin.name} News</h2>
                <Button variant="light" color="primary">View All News</Button>
            </div>
            
            {coin.news && coin.news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coin.news.map((item: any, i: number) => (
                  <Card key={i} className="p-4 flex flex-col h-full hover:shadow-md transition-shadow border border-default-200">
                    <h3 className="text-md font-medium text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-xs text-muted-foreground flex-grow mb-3">Placeholder for short news summary...</p>
                    <div className="text-xs text-muted-foreground mt-auto">{item.date}</div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No news available for {coin.name} at the moment.</p>
              </div>
            )}
            
            {coin.news && coin.news.length > 0 && (
              <div className="text-center mt-4">
                <Button variant="ghost" color="primary">
                  Load More News
                </Button>
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
      
      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3 mt-6 p-1">
        <Button color="success" size="lg" className="flex-grow sm:flex-grow-0">Buy {coin.symbol}</Button>
        <Button color="danger" size="lg" className="flex-grow sm:flex-grow-0">Sell {coin.symbol}</Button>
        <Button variant="bordered" color="primary" size="lg" className="flex-grow sm:flex-grow-0">Set Price Alert</Button>
        <Button variant="ghost" color="primary" size="lg" className="flex-grow sm:flex-grow-0">
          <Tooltip content="Add to favorites">
            <span>☆ Add to Watchlist</span> {/* Using a more standard star */}
          </Tooltip>
        </Button>
      </div>
    </section>
  );
}
