'use client'
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";

const cryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67000,
    change: 2.1,
    marketCap: "1.3T",
    allocation: 40,
    icon: "",
    redirect: "/btc",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3100,
    change: -1.2,
    marketCap: "370B",
    allocation: 30,
    icon: "",
    redirect: "/eth",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 150,
    change: 4.7,
    marketCap: "65B",
    allocation: 15,
    icon: "",
    redirect: "/sol",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.52,
    change: 0.5,
    marketCap: "28B",
    allocation: 10,
    icon: "",
    redirect: "/xrp",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.16,
    change: -0.8,
    marketCap: "23B",
    allocation: 5,
    icon: "",
    redirect: "/doge",
  },
];

const portfolioValue = cryptoData.reduce((acc, c) => acc + c.price * (c.allocation * 100), 0);

export default function Home() {
  const router = useRouter()
  return (
    <section className="w-full max-w-5xl mx-auto py-10 px-4 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Crypto Dashboard</h1>
        <div className="flex gap-2">
          <Input placeholder="Search coin..." className="w-48" />
          <Button color="primary">Add Asset</Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <Card className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 shadow-lg bg-background">
        <div>
          <div className="text-lg text-muted-foreground">Total Portfolio Value</div>
          <div className="text-2xl md:text-3xl font-semibold">${portfolioValue.toLocaleString()}</div>
        </div>
        <div className="flex gap-4">
          <Chip color="primary">Coins: {cryptoData.length}</Chip>
          <Chip color="success">24h Change: +2.3%</Chip>
        </div>
      </Card>

      {/* Crypto Table */}
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="py-3 px-4 text-left font-semibold">Coin</th>
              <th className="py-3 px-4 text-left font-semibold">Price</th>
              <th className="py-3 px-4 text-left font-semibold">24h Change</th>
              <th className="py-3 px-4 text-left font-semibold">Market Cap</th>
              <th className="py-3 px-4 text-left font-semibold">Allocation</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin) => (
              <tr key={coin.symbol} className="border-b last:border-none hover:bg-accent transition-colors">
                <td className="py-3 px-4 flex items-center gap-2 font-medium">
                  <span className="text-xl">{coin.icon}</span>
                  {coin.name} <span className="text-muted-foreground text-xs">({coin.symbol})</span>
                </td>
                <td className="py-3 px-4">${coin.price.toLocaleString()}</td>
                <td className={`py-3 px-4 font-semibold ${coin.change >= 0 ? "text-success" : "text-danger"}`}>
                  {coin.change >= 0 ? "+" : ""}{coin.change}%
                </td>
                <td className="py-3 px-4">{coin.marketCap}</td>
                <td className="py-3 px-4 w-48">
                  <Progress value={coin.allocation} color="primary" className="h-2" />
                  <span className="text-xs text-muted-foreground ml-2">{coin.allocation}%</span>
                </td>
                <td className="py-3 px-4">
                  <Tooltip content="View details">
                    <Button size="sm" variant="ghost" color="primary" onClick={() => router.push(coin.redirect)}>
                      Details
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}

