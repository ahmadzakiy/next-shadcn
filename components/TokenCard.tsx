import { Card, CardContent, CardHeader } from "@/components/ui/card"

export type TokenData = {
  name: string
  symbol: string
  price: number
  marketCap: number
  description: string
  isTrending?: boolean
}

export function TokenCard({ name, symbol, price, marketCap, description, isTrending }: TokenData) {
  const borderColor = isTrending ? 'border-trending' : 'border-muted'
  return (
    <Card className={`${borderColor} bg-background hover:bg-neutral-800 transition-colors`}>
      <CardHeader className="p-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10" />
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">{symbol}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="truncate overflow-hidden whitespace-nowrap text-lg font-bold">${price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="truncate overflow-hidden whitespace-nowrap text-lg font-bold">${marketCap.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-sm line-clamp-2 mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

