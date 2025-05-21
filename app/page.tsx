'use client'
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Input } from "@heroui/input";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
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
    icon: "", // Removed emoji for consistency
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

const portfolioValue = cryptoData.reduce((acc, c) => acc + c.price * (c.allocation / 100) * 1000 , 0); // Simplified allocation calculation for example

export default function Home() {
  const router = useRouter();

  const columns = [
    { key: "coin", label: "Coin" },
    { key: "price", label: "Price" },
    { key: "change", label: "24h Change" },
    { key: "marketCap", label: "Market Cap" },
    { key: "allocation", label: "Allocation" },
    { key: "actions", label: "" },
  ];

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
      <Card className="flex flex-col md:flex-row justify-between items-start gap-6 p-6 shadow-lg bg-background">
        <div className="flex flex-col">
          <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
          <div className="text-3xl md:text-4xl font-bold">${portfolioValue.toLocaleString()}</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center mt-2 md:mt-0">
          <Chip color="primary" variant="flat">Coins: {cryptoData.length}</Chip>
          <Chip color="success" variant="flat">24h Change: +2.3%</Chip> {/* This is static, consider making it dynamic later */}
        </div>
      </Card>

      {/* Crypto Table */}
      <Card className="p-0">
        <Table aria-label="Crypto Portfolio Table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key} className={`${column.key === "actions" ? "text-right" : ""} ${column.key === "allocation" ? "w-48" : ""}`}>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody items={cryptoData}>
            {(item) => (
              <TableRow key={item.symbol}>
                <TableCell>
                  <div className="flex items-center gap-3 font-medium">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary-50 text-primary font-semibold rounded-full text-sm">
                      {item.name.charAt(0)}
                    </span>
                    {item.name} <span className="text-muted-foreground text-xs">({item.symbol})</span>
                  </div>
                </TableCell>
                <TableCell>${item.price.toLocaleString()}</TableCell>
                <TableCell className={`font-medium ${item.change >= 0 ? "text-success" : "text-danger"}`}>
                  {item.change >= 0 ? "+" : ""}{item.change}%
                </TableCell>
                <TableCell>{item.marketCap}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 w-full">
                    <Progress value={item.allocation} color="primary" className="h-2 flex-grow" />
                    <span className="text-xs text-muted-foreground w-8 text-right">{item.allocation}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Tooltip content="View details">
                    <Button size="sm" variant="light" color="primary" onClick={() => router.push(item.redirect)}>
                      Details
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}

