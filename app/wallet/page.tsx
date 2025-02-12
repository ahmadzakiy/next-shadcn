"use client"

import { useEffect, useState } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    if (publicKey) {
      ;(async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey)
        setBalance(newBalance / LAMPORTS_PER_SOL)
        setTimeout(getBalanceEvery10Seconds, 10000)
      })()
    }
  }, [publicKey, connection, balance])

  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) {
        throw new Error("Wallet is not Connected")
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL),
      ])
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed",
      )
      if (sigResult) {
        alert("Airdrop was confirmed!")
      }
    } catch (err) {
      alert("You are Rate limited for Airdrop")
      console.error(err)
    }
  }

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
      <div className="flex flex-col justify-center items-center mt-20">
        {publicKey ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-bold mb-2">
              Your Public key is: {publicKey?.toString()}
            </h1>
            <h2 className="text-center text-xl mb-8 font-bold text-trending">
              Your Balance is: {balance} SOL
            </h2>
            <Button variant="destructive" onClick={getAirdropOnClick}>
              Get Airdrop
            </Button>
          </div>
        ) : (
          <h1>Wallet is not connected</h1>
        )}
      </div>
    </main>
  )
}
