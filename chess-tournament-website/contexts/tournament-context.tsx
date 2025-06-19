"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type Player,
  type Pairing,
  type GameResult,
  preparePlayersForPairing,
  generateSwissPairings,
  updateStandings,
} from "@/utils/swiss-pairing"

interface TournamentContextType {
  players: Player[]
  pairings: Pairing[]
  currentRound: number
  totalRounds: number
  isLoading: boolean
  registeredPlayersCount: number
  tournamentCompleted: boolean
  generatePairings: () => void
  submitResult: (tableNumber: number, result: string) => void
  advanceToNextRound: () => void
  resetTournament: () => void
  refreshPlayers: () => void
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined)

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [pairings, setPairings] = useState<Pairing[]>([])
  const [currentRound, setCurrentRound] = useState(1)
  const [totalRounds, setTotalRounds] = useState(7)
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState<GameResult[][]>([])
  const [registeredPlayersCount, setRegisteredPlayersCount] = useState(0)
  const [tournamentCompleted, setTournamentCompleted] = useState(false)

  // Function to refresh players from localStorage
  const refreshPlayers = () => {
    try {
      const registeredPlayers = JSON.parse(localStorage.getItem("registeredPlayers") || "[]")
      setRegisteredPlayersCount(registeredPlayers.length)

      // Check if tournament has started
      const savedTournament = localStorage.getItem("tournamentState")

      if (savedTournament) {
        // Tournament is active, load tournament state
        const tournamentState = JSON.parse(savedTournament)
        setPlayers(tournamentState.players || [])
        setPairings(tournamentState.pairings || [])
        setCurrentRound(tournamentState.currentRound || 1)
        setResults(tournamentState.results || [])
        setTournamentCompleted(tournamentState.currentRound > totalRounds)
      } else if (registeredPlayers.length > 0) {
        // Tournament not started, prepare players for tournament
        const initialPlayers = preparePlayersForPairing(registeredPlayers)
        setPlayers(initialPlayers)
        setResults([])
        setPairings([])
        setCurrentRound(1)
        setTournamentCompleted(false)
      } else {
        // No players registered
        setPlayers([])
        setPairings([])
        setCurrentRound(1)
        setResults([])
        setTournamentCompleted(false)
      }
    } catch (error) {
      console.error("Error loading tournament data:", error)
      setPlayers([])
      setPairings([])
      setCurrentRound(1)
      setResults([])
      setRegisteredPlayersCount(0)
      setTournamentCompleted(false)
    }
  }

  // Load registered players and tournament state from localStorage
  useEffect(() => {
    setIsLoading(true)
    refreshPlayers()
    setIsLoading(false)
  }, [])

  // Listen for storage changes (when new players register)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "registeredPlayers") {
        refreshPlayers()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(() => {
      const currentCount = JSON.parse(localStorage.getItem("registeredPlayers") || "[]").length
      if (currentCount !== registeredPlayersCount) {
        refreshPlayers()
      }
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [registeredPlayersCount])

  // Save tournament state to localStorage whenever it changes
  useEffect(() => {
    if (players.length > 0 && (pairings.length > 0 || currentRound > 1)) {
      const tournamentState = {
        players,
        pairings,
        currentRound,
        results,
        tournamentCompleted: currentRound > totalRounds,
      }
      localStorage.setItem("tournamentState", JSON.stringify(tournamentState))
    }
  }, [players, pairings, currentRound, results, totalRounds])

  // Generate pairings for the current round
  const generatePairings = () => {
    if (players.length < 2) {
      alert("Need at least 2 players to generate pairings!")
      return
    }

    if (currentRound > totalRounds) {
      alert("Tournament is completed! Check the results page.")
      return
    }

    const newPairings = generateSwissPairings(players, currentRound)
    setPairings(newPairings)

    // Save the new pairings
    const tournamentState = {
      players,
      pairings: newPairings,
      currentRound,
      results,
      tournamentCompleted: false,
    }
    localStorage.setItem("tournamentState", JSON.stringify(tournamentState))
  }

  // Submit a result for a game
  const submitResult = (tableNumber: number, result: string) => {
    const updatedPairings = [...pairings]
    const pairingIndex = updatedPairings.findIndex((p) => p.table === tableNumber)

    if (pairingIndex === -1) return

    updatedPairings[pairingIndex].result = result
    updatedPairings[pairingIndex].status = "finished"

    setPairings(updatedPairings)

    // Save the updated pairings
    const tournamentState = {
      players,
      pairings: updatedPairings,
      currentRound,
      results,
      tournamentCompleted: false,
    }
    localStorage.setItem("tournamentState", JSON.stringify(tournamentState))
  }

  // Advance to the next round
  const advanceToNextRound = () => {
    // Collect results from current round
    const roundResults: GameResult[] = pairings
      .filter((p) => p.status === "finished")
      .map((p) => ({
        whiteId: p.white.id,
        blackId: p.black.id,
        result: p.result,
      }))

    // Update player standings
    const updatedPlayers = updateStandings(players, roundResults)

    // Save results
    const updatedResults = [...results]
    updatedResults[currentRound - 1] = roundResults

    const newRound = currentRound + 1
    const completed = newRound > totalRounds

    // Move to next round or complete tournament
    setPlayers(updatedPlayers)
    setCurrentRound(newRound)
    setResults(updatedResults)
    setPairings([])
    setTournamentCompleted(completed)

    // Save the updated tournament state
    const tournamentState = {
      players: updatedPlayers,
      pairings: [],
      currentRound: newRound,
      results: updatedResults,
      tournamentCompleted: completed,
    }
    localStorage.setItem("tournamentState", JSON.stringify(tournamentState))

    // Show completion message if tournament is finished
    if (completed) {
      alert(
        `🏆 Tournament Completed! 🏆\n\nChampion: ${updatedPlayers[0]?.firstName} ${updatedPlayers[0]?.lastName}\nFinal Score: ${updatedPlayers[0]?.points} points\n\nCheck the Results page for full standings and prizes!`,
      )
    }
  }

  // Reset the tournament
  const resetTournament = () => {
    // Load registered players
    const registeredPlayers = JSON.parse(localStorage.getItem("registeredPlayers") || "[]")
    const initialPlayers = preparePlayersForPairing(registeredPlayers)

    setPlayers(initialPlayers)
    setPairings([])
    setCurrentRound(1)
    setResults([])
    setTournamentCompleted(false)

    // Clear tournament state
    localStorage.removeItem("tournamentState")
  }

  return (
    <TournamentContext.Provider
      value={{
        players,
        pairings,
        currentRound,
        totalRounds,
        isLoading,
        registeredPlayersCount,
        tournamentCompleted,
        generatePairings,
        submitResult,
        advanceToNextRound,
        resetTournament,
        refreshPlayers,
      }}
    >
      {children}
    </TournamentContext.Provider>
  )
}

export function useTournament() {
  const context = useContext(TournamentContext)
  if (context === undefined) {
    throw new Error("useTournament must be used within a TournamentProvider")
  }
  return context
}
