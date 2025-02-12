"use client"

import { TabsView } from "@/components/TabsView"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function Page() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="flex gap-2 absolute top-0 right-0 p-4">
        <WalletMultiButton style={{}} />
        <Button variant="secondary" size="sm">
          Connect Wallet
        </Button>
        <Button variant="default" size="sm">
          Create Tokens
        </Button>
      </div>
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-bold mb-2">Dumb Fun</h1>
        <p className="text-center text-xl mb-8 font-bold text-trending">
          Effortlessly Create and Trade Your Tokens
        </p>
        <TabsView />
      </div>
    </main>
  )
}
