"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Crown, Star, Download, Share2, Calendar } from "lucide-react"
import { useTournament } from "@/contexts/tournament-context"
import Link from "next/link"

export default function ResultsPage() {
  const { players, currentRound, totalRounds, isLoading } = useTournament()
  const [tournamentCompleted, setTournamentCompleted] = useState(false)

  useEffect(() => {
    setTournamentCompleted(currentRound > totalRounds)
  }, [currentRound, totalRounds])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />
      case 3:
        return <Award className="h-8 w-8 text-orange-500" />
      default:
        return <Star className="h-6 w-6 text-blue-500" />
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case 2:
        return "bg-gray-100 text-gray-800 border-gray-300"
      case 3:
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  const getPrize = (rank: number) => {
    switch (rank) {
      case 1:
        return "15,000 DZD"
      case 2:
        return "10,000 DZD"
      case 3:
        return "7,000 DZD"
      case 4:
        return "5,000 DZD"
      case 5:
        return "3,000 DZD"
      default:
        return "-"
    }
  }

  const topThree = players.slice(0, 3)
  const otherWinners = players.slice(3, 10)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-8">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Results</h3>
            <p className="text-gray-500">Please wait while we load the tournament results...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tournamentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600">Tournament In Progress</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Tournament Results</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The tournament is still in progress. Final results will be available after Round {totalRounds}.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-8">
              <Trophy className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Tournament Still Active</h3>
              <p className="text-gray-500 mb-6">
                Currently in Round {currentRound} of {totalRounds}. Check back after all rounds are completed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/rankings">View Current Standings</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/pairing">View Pairings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600">Tournament Completed</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">National Rapid Chess Championship</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Open BIR EL ATER - FIDE Recognized</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-gray-500">Completed on {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Champions Podium */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">🏆 Champions Podium 🏆</CardTitle>
              <CardDescription>The top 3 finishers of the tournament</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="text-center order-1 md:order-1">
                    <div className="bg-gray-100 rounded-lg p-6 h-32 flex flex-col justify-end relative">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <Medal className="h-12 w-12 text-gray-400" />
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 mb-2">2nd Place</Badge>
                      <h3 className="font-bold text-lg">
                        {topThree[1].firstName} {topThree[1].lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{topThree[1].points} points</p>
                      <p className="text-sm font-semibold text-green-600">10,000 DZD</p>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div className="text-center order-2 md:order-2">
                    <div className="bg-yellow-100 rounded-lg p-6 h-40 flex flex-col justify-end relative">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <Crown className="h-16 w-16 text-yellow-500" />
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 mb-2">🥇 CHAMPION</Badge>
                      <h3 className="font-bold text-xl">
                        {topThree[0].firstName} {topThree[0].lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{topThree[0].points} points</p>
                      <p className="text-lg font-bold text-green-600">15,000 DZD</p>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="text-center order-3 md:order-3">
                    <div className="bg-orange-100 rounded-lg p-6 h-32 flex flex-col justify-end relative">
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <Award className="h-12 w-12 text-orange-500" />
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 mb-2">3rd Place</Badge>
                      <h3 className="font-bold text-lg">
                        {topThree[2].firstName} {topThree[2].lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{topThree[2].points} points</p>
                      <p className="text-sm font-semibold text-green-600">7,000 DZD</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="final-standings" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="final-standings">Final Standings</TabsTrigger>
            <TabsTrigger value="prize-winners">Prize Winners</TabsTrigger>
            <TabsTrigger value="statistics">Tournament Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="final-standings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  Final Tournament Standings
                </CardTitle>
                <CardDescription>
                  Complete final standings after {totalRounds} rounds • FIDE Swiss System
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Final Rank</th>
                        <th className="text-left py-3 px-2">Player</th>
                        <th className="text-center py-3 px-2">Rating</th>
                        <th className="text-center py-3 px-2">Final Score</th>
                        <th className="text-center py-3 px-2">Buchholz</th>
                        <th className="text-center py-3 px-2">Buchholz Cut-1</th>
                        <th className="text-center py-3 px-2">Wins</th>
                        <th className="text-center py-3 px-2">Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr
                          key={player.id}
                          className={`border-b hover:bg-gray-50 ${
                            index < 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50" : ""
                          }`}
                        >
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {getRankIcon(index + 1)}
                              <Badge className={`${getRankBadge(index + 1)} border`}>#{index + 1}</Badge>
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
                          <td className="py-3 px-2 text-center">{player.buchholz.toFixed(1)}</td>
                          <td className="py-3 px-2 text-center">{player.buchholzCut1.toFixed(1)}</td>
                          <td className="py-3 px-2 text-center">{player.wins}</td>
                          <td className="py-3 px-2 text-center font-semibold text-green-600">{getPrize(index + 1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prize-winners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-green-600" />
                  Prize Distribution
                </CardTitle>
                <CardDescription>Prize money awarded to top finishers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.slice(0, 5).map((player, index) => (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        index === 0
                          ? "bg-yellow-50 border-yellow-200"
                          : index === 1
                            ? "bg-gray-50 border-gray-200"
                            : index === 2
                              ? "bg-orange-50 border-orange-200"
                              : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(index + 1)}
                        <div>
                          <h3 className="font-bold text-lg">
                            {player.firstName} {player.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {player.points} points • {player.wins} wins • Rating: {player.rating || "Unrated"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{getPrize(index + 1)}</p>
                        <p className="text-sm text-gray-500">Prize Money</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Total Prize Pool Distributed</h4>
                  <p className="text-2xl font-bold text-green-600">40,000 DZD</p>
                  <p className="text-sm text-green-700">Awarded to top 5 finishers</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Players:</span>
                      <span className="font-bold">{players.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Rounds:</span>
                      <span className="font-bold">{totalRounds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Games:</span>
                      <span className="font-bold">{players.reduce((sum, p) => sum + p.games, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Decisive Games:</span>
                      <span className="font-bold">{players.reduce((sum, p) => sum + p.wins, 0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Score:</span>
                      <span className="font-bold">{players.length > 0 ? players[0].points : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Perfect Score:</span>
                      <span className="font-bold">
                        {players.filter((p) => p.points === totalRounds).length > 0 ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score:</span>
                      <span className="font-bold">
                        {players.length > 0
                          ? (players.reduce((sum, p) => sum + p.points, 0) / players.length).toFixed(1)
                          : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Draw Rate:</span>
                      <span className="font-bold">
                        {players.length > 0
                          ? (
                              ((players.reduce((sum, p) => sum + p.games, 0) -
                                players.reduce((sum, p) => sum + p.wins, 0)) /
                                players.reduce((sum, p) => sum + p.games, 0)) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">2000+ Rated:</span>
                      <span className="font-bold">
                        {
                          players.filter((p) => {
                            const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                            return rating >= 2000
                          }).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">1500-1999:</span>
                      <span className="font-bold">
                        {
                          players.filter((p) => {
                            const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                            return rating >= 1500 && rating < 2000
                          }).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Under 1500:</span>
                      <span className="font-bold">
                        {
                          players.filter((p) => {
                            const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                            return rating < 1500 || rating === 0
                          }).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Rating:</span>
                      <span className="font-bold">
                        {players.length > 0
                          ? Math.round(
                              players.reduce((sum, p) => {
                                const rating =
                                  typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                                return sum + rating
                              }, 0) / players.length,
                            )
                          : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Share Tournament Results</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Results PDF
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
                <Button variant="outline">
                  <Link href="/rankings">View Live Rankings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
