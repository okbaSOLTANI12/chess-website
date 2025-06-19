"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Award, Search, Download, Users, RefreshCw } from "lucide-react"
import { useTournament } from "@/contexts/tournament-context"

export default function RankingsPage() {
  const { players, currentRound, isLoading, registeredPlayersCount, refreshPlayers } = useTournament()
  const [searchTerm, setSearchTerm] = useState("")
  const [registeredPlayers, setRegisteredPlayers] = useState<any[]>([])

  useEffect(() => {
    // Load registered players from localStorage
    const loadRegisteredPlayers = () => {
      const storedPlayers = JSON.parse(localStorage.getItem("registeredPlayers") || "[]")
      setRegisteredPlayers(storedPlayers)
    }

    loadRegisteredPlayers()

    // Refresh every second to catch new registrations
    const interval = setInterval(loadRegisteredPlayers, 1000)

    return () => clearInterval(interval)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800"
      case 2:
        return "bg-gray-100 text-gray-800"
      case 3:
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // Filter players based on tournament state
  const filteredPlayers =
    players.length > 0
      ? players.filter((player) => {
          const searchLower = searchTerm.toLowerCase()
          const playerName = `${player.firstName} ${player.lastName}`.toLowerCase()
          return playerName.includes(searchLower) || player.id.toLowerCase().includes(searchLower)
        })
      : []

  // Filter registered players for pre-tournament display
  const filteredRegisteredPlayers = registeredPlayers.filter((player) => {
    const searchLower = searchTerm.toLowerCase()
    const playerName = `${player.firstName} ${player.lastName}`.toLowerCase()
    return playerName.includes(searchLower) || player.id.toLowerCase().includes(searchLower)
  })

  const handleRefresh = () => {
    refreshPlayers()
    const storedPlayers = JSON.parse(localStorage.getItem("registeredPlayers") || "[]")
    setRegisteredPlayers(storedPlayers)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Tournament Standings</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Player Rankings</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Current standings and player rankings for the National Rapid Chess Championship - Bir El Ater 2025
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search players by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-8">
              <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Rankings</h3>
              <p className="text-gray-500">Please wait while we load the tournament standings...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Show registered players if tournament hasn't started */}
            {players.length === 0 && registeredPlayers.length > 0 ? (
              <Card className="max-w-6xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    Registered Players ({registeredPlayers.length})
                  </CardTitle>
                  <CardDescription>
                    Players registered for the tournament • Tournament hasn't started yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">#</th>
                          <th className="text-left py-3 px-2">Player</th>
                          <th className="text-center py-3 px-2">Rating</th>
                          <th className="text-center py-3 px-2">City</th>
                          <th className="text-center py-3 px-2">Club</th>
                          <th className="text-center py-3 px-2">Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRegisteredPlayers.map((player, index) => (
                          <tr key={player.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">
                              <Badge className="bg-blue-100 text-blue-800">#{index + 1}</Badge>
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
                            <td className="py-3 px-2 text-center">{player.city}</td>
                            <td className="py-3 px-2 text-center">{player.club || "Independent"}</td>
                            <td className="py-3 px-2 text-center">
                              {new Date(player.registrationDate).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <a href="/pairing">Start Tournament</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : players.length === 0 ? (
              <Card className="max-w-2xl mx-auto text-center">
                <CardContent className="pt-8">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Players Registered</h3>
                  <p className="text-gray-500 mb-6">No players have registered yet. Be the first to register!</p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <a href="/register">Register Now</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="max-w-6xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-600" />
                    Tournament Standings
                  </CardTitle>
                  <CardDescription>
                    Current standings after Round {currentRound - 1} of 7 • FIDE Swiss System • Updated:{" "}
                    {new Date().toLocaleDateString()}
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
                              <div className="flex items-center gap-2">
                                {getRankIcon(index + 1)}
                                <Badge className={getRankBadge(index + 1)}>#{index + 1}</Badge>
                              </div>
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
            )}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registered Players:</span>
                  <span className="font-bold">{registeredPlayers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tournament Players:</span>
                  <span className="font-bold">{players.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Round:</span>
                  <span className="font-bold">{currentRound} / 7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Games Played:</span>
                  <span className="font-bold">{players.reduce((sum, p) => sum + p.games, 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration Status:</span>
                  <Badge className="bg-green-100 text-green-800">Open</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tournament Status:</span>
                  <Badge className={players.length > 0 ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                    {players.length > 0 ? "Active" : "Not Started"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Registration:</span>
                  <span className="font-bold text-sm">
                    {registeredPlayers.length > 0
                      ? new Date(
                          Math.max(...registeredPlayers.map((p) => new Date(p.registrationDate).getTime())),
                        ).toLocaleDateString()
                      : "None"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <a href="/register">Register New Player</a>
                </Button>
                {registeredPlayers.length >= 2 && players.length === 0 && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href="/pairing">Start Tournament</a>
                  </Button>
                )}
                {players.length > 0 && (
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <a href="/pairing">Manage Tournament</a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
