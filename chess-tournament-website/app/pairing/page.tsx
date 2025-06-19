"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Clock, Search, RefreshCw, AlertTriangle } from "lucide-react"
import { useTournament } from "@/contexts/tournament-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PairingPage() {
  const {
    players,
    pairings,
    currentRound,
    totalRounds,
    isLoading,
    generatePairings,
    submitResult,
    advanceToNextRound,
    resetTournament,
  } = useTournament()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRound, setSelectedRound] = useState(currentRound)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [editingTable, setEditingTable] = useState<number | null>(null)
  const [selectedResult, setSelectedResult] = useState("")

  useEffect(() => {
    setSelectedRound(currentRound)
  }, [currentRound])

  const filteredPairings = pairings.filter((pairing) => {
    const searchLower = searchTerm.toLowerCase()
    const whitePlayerName = `${pairing.white.firstName} ${pairing.white.lastName}`.toLowerCase()
    const blackPlayerName = `${pairing.black.firstName} ${pairing.black.lastName}`.toLowerCase()

    return whitePlayerName.includes(searchLower) || blackPlayerName.includes(searchLower)
  })

  const filteredPlayers = players.filter((player) => {
    const searchLower = searchTerm.toLowerCase()
    const playerName = `${player.firstName} ${player.lastName}`.toLowerCase()

    return playerName.includes(searchLower) || player.id.toLowerCase().includes(searchLower)
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-blue-100 text-blue-800">Ongoing</Badge>
      case "finished":
        return <Badge className="bg-green-100 text-green-800">Finished</Badge>
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getResultDisplay = (result: string) => {
    if (!result) return "-"
    return result
  }

  const handleResultSubmit = () => {
    if (editingTable && selectedResult) {
      submitResult(editingTable, selectedResult)
      setEditingTable(null)
      setSelectedResult("")
    }
  }

  const handleAdvanceRound = () => {
    advanceToNextRound()
    setShowConfirmDialog(false)
  }

  const handleResetTournament = () => {
    resetTournament()
    setShowResetDialog(false)
  }

  const allGamesFinished = pairings.length > 0 && pairings.every((p) => p.status === "finished")
  const canAdvanceRound = allGamesFinished && currentRound < totalRounds

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Tournament Management</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Swiss Pairing System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            FIDE Swiss system pairings and results for the National Rapid Chess Championship - Bir El Ater 2025
          </p>
        </div>

        {/* Tournament Status */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-semibold">Current Round</p>
              <p className="text-2xl font-bold text-slate-800">
                {currentRound}/{totalRounds}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Total Players</p>
              <p className="text-2xl font-bold text-slate-800">{players.length}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Games Finished</p>
              <p className="text-2xl font-bold text-slate-800">
                {pairings.filter((p) => p.status === "finished").length}/{pairings.length}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">Next Round</p>
              <p className="text-sm text-gray-600">
                {currentRound < totalRounds ? `Round ${currentRound + 1}` : "Final Round"}
              </p>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-8">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Tournament Data</h3>
              <p className="text-gray-500">Please wait while we load the tournament information...</p>
            </CardContent>
          </Card>
        ) : players.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-8">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Players Registered</h3>
              <p className="text-gray-500 mb-6">Players need to register before pairings can be generated.</p>
              <Button className="bg-red-600 hover:bg-red-700">
                <a href="/register">Register Players</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="pairings" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pairings">Current Pairings</TabsTrigger>
              <TabsTrigger value="standings">Live Standings</TabsTrigger>
            </TabsList>

            <TabsContent value="pairings" className="space-y-6">
              {/* Controls */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Select
                        value={selectedRound.toString()}
                        onValueChange={(value) => setSelectedRound(Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select round" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: totalRounds }, (_, i) => i + 1).map((round) => (
                            <SelectItem key={round} value={round.toString()}>
                              Round {round}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search players..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-[250px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {pairings.length === 0 && (
                        <Button onClick={generatePairings} className="bg-blue-600 hover:bg-blue-700">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Generate Round {currentRound} Pairings
                        </Button>
                      )}
                      {canAdvanceRound && (
                        <Button onClick={() => setShowConfirmDialog(true)} className="bg-green-600 hover:bg-green-700">
                          Advance to Round {currentRound + 1}
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => setShowResetDialog(true)}>
                        Reset Tournament
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pairings Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Round {currentRound} Pairings</CardTitle>
                  <CardDescription>
                    Swiss system pairings • Time control: 15 minutes + 5 seconds increment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {pairings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No pairings generated yet. Click "Generate Pairings" to create round {currentRound} pairings.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Table</th>
                            <th className="text-left py-3 px-2">White</th>
                            <th className="text-center py-3 px-2">Rating</th>
                            <th className="text-left py-3 px-2">Black</th>
                            <th className="text-center py-3 px-2">Rating</th>
                            <th className="text-center py-3 px-2">Result</th>
                            <th className="text-center py-3 px-2">Status</th>
                            <th className="text-center py-3 px-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPairings.map((pairing) => (
                            <tr key={pairing.table} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-2 font-bold text-center">{pairing.table}</td>
                              <td className="py-3 px-2">
                                <div>
                                  <p className="font-medium">
                                    {pairing.white.firstName} {pairing.white.lastName}
                                  </p>
                                  <p className="text-xs text-gray-500">{pairing.white.id}</p>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">{pairing.white.rating || "Unrated"}</td>
                              <td className="py-3 px-2">
                                <div>
                                  <p className="font-medium">
                                    {pairing.black.firstName} {pairing.black.lastName}
                                  </p>
                                  <p className="text-xs text-gray-500">{pairing.black.id}</p>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">{pairing.black.rating || "Unrated"}</td>
                              <td className="py-3 px-2 text-center font-bold">{getResultDisplay(pairing.result)}</td>
                              <td className="py-3 px-2 text-center">{getStatusBadge(pairing.status)}</td>
                              <td className="py-3 px-2 text-center">
                                {pairing.status !== "finished" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setEditingTable(pairing.table)
                                      setSelectedResult("")
                                    }}
                                  >
                                    Enter Result
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Result Entry Dialog */}
              <Dialog open={editingTable !== null} onOpenChange={(open) => !open && setEditingTable(null)}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Enter Game Result</DialogTitle>
                    <DialogDescription>Select the result for table {editingTable}</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Select value={selectedResult} onValueChange={setSelectedResult}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-0">1-0 (White wins)</SelectItem>
                        <SelectItem value="0-1">0-1 (Black wins)</SelectItem>
                        <SelectItem value="0.5-0.5">½-½ (Draw)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingTable(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleResultSubmit} disabled={!selectedResult}>
                      Submit Result
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Advance Round Confirmation Dialog */}
              <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advance to Next Round</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to advance to round {currentRound + 1}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAdvanceRound} className="bg-green-600 hover:bg-green-700">
                      Advance to Round {currentRound + 1}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Reset Tournament Confirmation Dialog */}
              <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset Tournament</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to reset the entire tournament? All pairings, results, and standings will be
                      lost.
                    </DialogDescription>
                  </DialogHeader>
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      This action cannot be undone. All tournament data will be permanently deleted.
                    </AlertDescription>
                  </Alert>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleResetTournament}>
                      Reset Tournament
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="standings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Standings</CardTitle>
                  <CardDescription>
                    Live tournament standings after Round {currentRound - 1} • Updated automatically
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Rank</th>
                          <th className="text-left py-3 px-2">Player</th>
                          <th className="text-center py-3 px-2">Rating</th>
                          <th className="text-center py-3 px-2">Points</th>
                          <th className="text-center py-3 px-2">Games</th>
                          <th className="text-center py-3 px-2">Buchholz</th>
                          <th className="text-center py-3 px-2">Buchholz Cut-1</th>
                          <th className="text-center py-3 px-2">Wins</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPlayers.map((player, index) => (
                          <tr key={player.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">
                              <Badge
                                className={
                                  index === 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                }
                              >
                                #{index + 1}
                              </Badge>
                            </td>
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-medium">
                                  {player.firstName} {player.lastName}
                                </p>
                                <p className="text-xs text-gray-500">{player.id}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">{player.rating || "Unrated"}</td>
                            <td className="py-3 px-2 text-center font-bold text-lg">{player.points}</td>
                            <td className="py-3 px-2 text-center">{player.games}</td>
                            <td className="py-3 px-2 text-center">{player.buchholz.toFixed(1)}</td>
                            <td className="py-3 px-2 text-center">{player.buchholzCut1.toFixed(1)}</td>
                            <td className="py-3 px-2 text-center">{player.wins}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Tiebreak Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle>Tiebreak Systems</CardTitle>
                  <CardDescription>Understanding how players are ranked when they have the same score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Primary Tiebreaks</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>
                          • <strong>Buchholz:</strong> Sum of all opponents' scores
                        </li>
                        <li>
                          • <strong>Buchholz Cut-1:</strong> Buchholz minus the lowest opponent score
                        </li>
                        <li>
                          • <strong>Number of Wins:</strong> Total number of games won
                        </li>
                        <li>
                          • <strong>Rating:</strong> Player's rating (if tied on all other criteria)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Ranking Order</h4>
                      <ol className="space-y-1 text-sm text-gray-700 list-decimal list-inside">
                        <li>Points (highest first)</li>
                        <li>Buchholz (highest first)</li>
                        <li>Buchholz Cut-1 (highest first)</li>
                        <li>Number of wins (highest first)</li>
                        <li>Rating (highest first)</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Tournament Rules */}
        <Card className="mt-8 max-w-6xl mx-auto">
          <CardHeader>
            <CardTitle>Swiss System Rules</CardTitle>
            <CardDescription>FIDE pairing rules and tournament regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Pairing System</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Swiss system with 7 rounds</li>
                  <li>• Players paired by points and rating</li>
                  <li>• Color balance maintained when possible</li>
                  <li>• No player meets the same opponent twice</li>
                  <li>• First round: players paired by rating</li>
                  <li>• Subsequent rounds: players paired by score</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Scoring & Tiebreaks</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Win = 1 point, Draw = 0.5 points, Loss = 0 points</li>
                  <li>• 1st Tiebreak: Buchholz (sum of opponents' scores)</li>
                  <li>• 2nd Tiebreak: Buchholz Cut-1</li>
                  <li>• 3rd Tiebreak: Number of wins</li>
                  <li>• 4th Tiebreak: Rating</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
