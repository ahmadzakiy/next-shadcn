'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (value: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tokens..."
        className="pl-9 bg-background/50 border-muted"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

