"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Clock, Target, TrendingUp, Award, Calendar, MapPin } from "lucide-react"
import { useTournament } from "@/contexts/tournament-context"
import Link from "next/link"

export default function TournamentDashboard() {
  const { players, pairings, currentRound, totalRounds, isLoading } = useTournament()

  const completedGames = pairings.filter((p) => p.status === "finished").length
  const ongoingGames = pairings.filter((p) => p.status === "ongoing").length
  const notStartedGames = pairings.filter((p) => p.status === "not_started").length

  const topPlayers = players.slice(0, 3)
  const averageRating =
    players.length > 0
      ? Math.round(
          players.reduce((sum, p) => {
            const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
            return sum + rating
          }, 0) / players.length,
        )
      : 0

  const totalGamesPlayed = players.reduce((sum, p) => sum + p.games, 0)
  const totalWins = players.reduce((sum, p) => sum + p.wins, 0)
  const drawRate = totalGamesPlayed > 0 ? (((totalGamesPlayed - totalWins) / totalGamesPlayed) * 100).toFixed(1) : 0

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Tournament Dashboard</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Tournament Control Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete overview and management of the National Rapid Chess Championship - Bir El Ater 2025
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800">
                {currentRound}/{totalRounds}
              </h3>
              <p className="text-gray-600">Current Round</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800">{players.length}</h3>
              <p className="text-gray-600">Registered Players</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800">
                {completedGames}/{pairings.length}
              </h3>
              <p className="text-gray-600">Games Completed</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800">{averageRating}</h3>
              <p className="text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="standings">Live Standings</TabsTrigger>
            <TabsTrigger value="pairings">Current Pairings</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Tournament Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Tournament Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tournament Status:</span>
                      <Badge
                        className={
                          currentRound <= totalRounds ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {currentRound <= totalRounds ? "Active" : "Completed"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Current Round:</span>
                      <span className="font-bold">
                        {currentRound} of {totalRounds}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Progress:</span>
                      <span className="font-bold">{Math.round(((currentRound - 1) / totalRounds) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.round(((currentRound - 1) / totalRounds) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Tournament Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">June 21, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue:</span>
                      <span className="font-medium">Youth House Bir El Ater</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-medium">Swiss System</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Control:</span>
                      <span className="font-medium">15 min + 5 sec</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prize Pool:</span>
                      <span className="font-medium">50,000 DZD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Round Status */}
            <Card>
              <CardHeader>
                <CardTitle>Round {currentRound} Status</CardTitle>
                <CardDescription>Current round game status and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{completedGames}</div>
                    <p className="text-gray-600">Completed Games</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{ongoingGames}</div>
                    <p className="text-gray-600">Ongoing Games</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-600 mb-2">{notStartedGames}</div>
                    <p className="text-gray-600">Not Started</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Players */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Current Leaders
                </CardTitle>
                <CardDescription>Top 3 players in the tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">
                            {player.firstName} {player.lastName}
                          </p>
                          <p className="text-sm text-gray-600">Rating: {player.rating || "Unrated"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{player.points}</p>
                        <p className="text-sm text-gray-600">{player.games} games</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Tournament management shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button asChild className="h-auto p-4 flex-col">
                    <Link href="/pairing">
                      <Trophy className="h-6 w-6 mb-2" />
                      Manage Pairings
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto p-4 flex-col">
                    <Link href="/rankings">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      View Rankings
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto p-4 flex-col">
                    <Link href="/register">
                      <Users className="h-6 w-6 mb-2" />
                      Register Players
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-auto p-4 flex-col">
                    <Link href="/schedule">
                      <Clock className="h-6 w-6 mb-2" />
                      View Schedule
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="standings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Tournament Standings</CardTitle>
                <CardDescription>Current player rankings with tiebreaks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Rank</th>
                        <th className="text-left py-3 px-2">Player</th>
                        <th className="text-center py-3 px-2">Points</th>
                        <th className="text-center py-3 px-2">Buchholz</th>
                        <th className="text-center py-3 px-2">Wins</th>
                        <th className="text-center py-3 px-2">Games</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.slice(0, 10).map((player, index) => (
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
                          <td className="py-3 px-2 font-medium">
                            {player.firstName} {player.lastName}
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-lg">{player.points}</td>
                          <td className="py-3 px-2 text-center">{player.buchholz.toFixed(1)}</td>
                          <td className="py-3 px-2 text-center">{player.wins}</td>
                          <td className="py-3 px-2 text-center">{player.games}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {players.length > 10 && (
                  <div className="text-center mt-4">
                    <Button asChild variant="outline">
                      <Link href="/rankings">View All Rankings</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pairings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Round {currentRound} Pairings</CardTitle>
                <CardDescription>Current round game pairings and results</CardDescription>
              </CardHeader>
              <CardContent>
                {pairings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No pairings generated for round {currentRound}</p>
                    <Button asChild>
                      <Link href="/pairing">Generate Pairings</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Table</th>
                          <th className="text-left py-3 px-2">White</th>
                          <th className="text-left py-3 px-2">Black</th>
                          <th className="text-center py-3 px-2">Result</th>
                          <th className="text-center py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pairings.slice(0, 8).map((pairing) => (
                          <tr key={pairing.table} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2 font-bold text-center">{pairing.table}</td>
                            <td className="py-3 px-2">
                              {pairing.white.firstName} {pairing.white.lastName}
                            </td>
                            <td className="py-3 px-2">
                              {pairing.black.firstName} {pairing.black.lastName}
                            </td>
                            <td className="py-3 px-2 text-center font-bold">{pairing.result || "-"}</td>
                            <td className="py-3 px-2 text-center">
                              <Badge
                                className={
                                  pairing.status === "finished"
                                    ? "bg-green-100 text-green-800"
                                    : pairing.status === "ongoing"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {pairing.status === "finished"
                                  ? "Finished"
                                  : pairing.status === "ongoing"
                                    ? "Ongoing"
                                    : "Not Started"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {pairings.length > 8 && (
                  <div className="text-center mt-4">
                    <Button asChild variant="outline">
                      <Link href="/pairing">View All Pairings</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Players:</span>
                      <span className="font-bold">{players.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Games Played:</span>
                      <span className="font-bold">{totalGamesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Decisive Games:</span>
                      <span className="font-bold">{totalWins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Draw Rate:</span>
                      <span className="font-bold">{drawRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Rating:</span>
                      <span className="font-bold">{averageRating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Score:</span>
                      <span className="font-bold">{players.length > 0 ? players[0].points : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Most Wins:</span>
                      <span className="font-bold">
                        {players.length > 0 ? Math.max(...players.map((p) => p.wins)) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest Buchholz:</span>
                      <span className="font-bold">
                        {players.length > 0 ? Math.max(...players.map((p) => p.buchholz)).toFixed(1) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rounds Completed:</span>
                      <span className="font-bold">
                        {currentRound - 1} / {totalRounds}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Player Distribution</CardTitle>
                <CardDescription>Analysis of player ratings and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {
                        players.filter((p) => {
                          const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                          return rating >= 2000
                        }).length
                      }
                    </div>
                    <p className="text-gray-600">Players ≥ 2000</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {
                        players.filter((p) => {
                          const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                          return rating >= 1500 && rating < 2000
                        }).length
                      }
                    </div>
                    <p className="text-gray-600">Players 1500-1999</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {
                        players.filter((p) => {
                          const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
                          return rating < 1500 || rating === 0
                        }).length
                      }
                    </div>
                    <p className="text-gray-600">Players &lt; 1500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
