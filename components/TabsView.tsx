'use client'

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenGrid } from "./TokenGrid"

// Sample data with descriptions and categorization
const defaultTokens = {
  all: [
    { name: "Bitcoin", symbol: "BTC", price: 35000, marketCap: 680000000000, description: "The first and largest cryptocurrency by market capitalization." },
    { name: "Ethereum", symbol: "ETH", price: 2150.75, marketCap: 250000000000, description: "A decentralized platform that enables smart contracts and DApps." },
    { name: "Cardano", symbol: "ADA", price: 0.35, marketCap: 12000000000, description: "A proof-of-stake blockchain platform with a focus on sustainability." },
    { name: "Solana", symbol: "SOL", price: 40, marketCap: 17000000000, description: "High-performance blockchain platform with fast transaction speeds." },
    { name: "Polkadot", symbol: "DOT", price: 5.5, marketCap: 7000000000, description: "Multi-chain network enabling interoperability between different blockchains." },
    { name: "Ripple", symbol: "XRP", price: 0.6, marketCap: 32000000000, description: "Digital payment protocol and cryptocurrency for financial transactions." },
    { name: "Dogecoin", symbol: "DOGE", price: 0.08, marketCap: 11000000000, description: "Started as a meme, now a popular cryptocurrency for digital payments." },
    { name: "Chainlink", symbol: "LINK", price: 13, marketCap: 7300000000, description: "Decentralized oracle network connecting smart contracts with real-world data." },
    { name: "Uniswap", symbol: "UNI", price: 5, marketCap: 3800000000, description: "Decentralized exchange protocol on Ethereum." },
    { name: "Avalanche", symbol: "AVAX", price: 22, marketCap: 7900000000, description: "Platform for launching decentralized finance applications." },
  ],
  newListing: [
    { name: "New Token 1", symbol: "NT1", price: 0.5, marketCap: 1000000, description: "Recently launched DeFi protocol with innovative features." },
    { name: "New Token 2", symbol: "NT2", price: 1.2, marketCap: 2000000, description: "New gaming platform token with strong community backing." },
    { name: "New Token 3", symbol: "NT3", price: 0.8, marketCap: 1500000, description: "Fresh DEX token with unique tokenomics." },
  ],
  trending: [
    { name: "Bitcoin", symbol: "BTC", price: 35000, marketCap: 680000000000, description: "The first and largest cryptocurrency by market capitalization." },
    { name: "Ethereum", symbol: "ETH", price: 2150.75, marketCap: 250000000000, description: "A decentralized platform that enables smart contracts and DApps." },
    { name: "Solana", symbol: "SOL", price: 40, marketCap: 17000000000, description: "High-performance blockchain platform with fast transaction speeds." },
  ],
  marketCap: [
    { name: "Bitcoin", symbol: "BTC", price: 35000, marketCap: 680000000000, description: "The first and largest cryptocurrency by market capitalization." },
    { name: "Ethereum", symbol: "ETH", price: 2150.75, marketCap: 250000000000, description: "A decentralized platform that enables smart contracts and DApps." },
    { name: "Ripple", symbol: "XRP", price: 0.6, marketCap: 32000000000, description: "Digital payment protocol and cryptocurrency for financial transactions." },
    { name: "Solana", symbol: "SOL", price: 40, marketCap: 17000000000, description: "High-performance blockchain platform with fast transaction speeds." },
  ],
}

interface Token {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  description: string;
  isTrending?: boolean;
}

interface Tokens {
  all: Token[];
  newListing: Token[];
  trending: Token[];
  marketCap: Token[];
}

function useRandomTrending(initialTokens: Tokens): Tokens {
  const [tokens, setTokens] = useState<Tokens>(initialTokens);

  useEffect(() => {
    // Function to update random trending
    const updateTrending = () => {
      setTokens(prevTokens => {
        // Create a new copy of the tokens object
        const newTokens = { ...prevTokens };
        
        // Reset all isTrending to false first
        newTokens.all = newTokens.all.map(token => ({
          ...token,
          isTrending: false
        }));
        
        // Randomly select 3 different indices
        const indices = new Set<number>();
        while(indices.size < 3) {
          indices.add(Math.floor(Math.random() * newTokens.all.length));
        }
        
        // Set isTrending to true for selected tokens
        indices.forEach(index => {
          newTokens.all[index].isTrending = true;
        });

        // Update trending array with the new trending tokens
        newTokens.trending = newTokens.all.filter(token => token.isTrending);
        
        return newTokens;
      });
    };

    // Initial update
    updateTrending();

    // Set interval for updates
    const interval = setInterval(updateTrending, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return tokens;
}

export function TabsView() {
  const tokens = useRandomTrending(defaultTokens);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="all">All Coins ✨</TabsTrigger>
        <TabsTrigger value="newListing">New Listing 🎉</TabsTrigger>
        <TabsTrigger value="trending">Trending 🚀</TabsTrigger>
        <TabsTrigger value="marketCap">Market Cap 🏦</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <TokenGrid tokens={tokens.all} />
      </TabsContent>
      <TabsContent value="newListing">
        <TokenGrid tokens={tokens.newListing} />
      </TabsContent>
      <TabsContent value="trending">
        <TokenGrid tokens={tokens.trending} />
      </TabsContent>
      <TabsContent value="marketCap">
        <TokenGrid tokens={tokens.marketCap} />
      </TabsContent>
    </Tabs>
  )
}

