'use client'

import { useState } from 'react'
import { TokenCard } from './TokenCard'
import { SearchBar } from './SearchBar'
import type { TokenData } from './TokenCard'

interface TokenGridProps {
  tokens: TokenData[]
}

export function TokenGrid({ tokens }: TokenGridProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-8 flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTokens.map((token, index) => (
          <TokenCard key={index} {...token} />
        ))}
      </div>
    </div>
  )
}

