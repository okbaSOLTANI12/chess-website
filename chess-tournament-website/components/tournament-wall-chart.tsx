"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTournament } from "@/contexts/tournament-context"

export default function TournamentWallChart() {
  const { players, currentRound, totalRounds } = useTournament()

  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tournament Wall Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-1 sticky left-0 bg-white">Rank</th>
                <th className="text-left py-2 px-1 sticky left-12 bg-white">Player</th>
                <th className="text-center py-2 px-1">Rating</th>
                {rounds.map((round) => (
                  <th key={round} className="text-center py-2 px-1 min-w-[60px]">
                    R{round}
                  </th>
                ))}
                <th className="text-center py-2 px-1 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-1 sticky left-0 bg-white">
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
                      {index + 1}
                    </Badge>
                  </td>
                  <td className="py-2 px-1 sticky left-12 bg-white font-medium">
                    {player.firstName} {player.lastName}
                  </td>
                  <td className="py-2 px-1 text-center">{player.rating || "UR"}</td>
                  {rounds.map((round) => (
                    <td key={round} className="py-2 px-1 text-center">
                      {round <= currentRound - 1 ? (
                        <span className="text-xs">
                          {/* This would show actual round results */}
                          {round <= player.games ? "1" : "-"}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-1 text-center font-bold text-lg">{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
