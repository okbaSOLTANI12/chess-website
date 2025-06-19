import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { TournamentProvider } from "@/contexts/tournament-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bir El Ater Chess Championship 2025 | Chess Academy Club",
  description:
    "Join Algeria's premier national chess tournament organized by Chess Academy Club in Bir El Ater. Register now for the ultimate chess competition.",
  keywords: "chess tournament, Algeria, Bir El Ater, chess championship, national tournament, chess club",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TournamentProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </TournamentProvider>
      </body>
    </html>
  )
}
