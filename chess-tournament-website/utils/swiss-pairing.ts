// Swiss pairing system implementation

export interface Player {
  id: string
  firstName: string
  lastName: string
  rating: string | number
  points: number
  buchholz: number
  buchholzCut1: number
  wins: number
  games: number
  opponents: string[]
  colorHistory: string[]
  lastColor: string
}

export interface Pairing {
  table: number
  white: Player
  black: Player
  result: string
  status: string
}

export interface GameResult {
  whiteId: string
  blackId: string
  result: string // "1-0", "0-1", "0.5-0.5"
}

// Convert registered players to the Player format needed for the pairing system
export function preparePlayersForPairing(registeredPlayers: any[]): Player[] {
  return registeredPlayers.map((player) => ({
    id: player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    rating: player.rating ? Number.parseInt(player.rating) : 0,
    points: player.points || 0,
    buchholz: player.buchholz || 0,
    buchholzCut1: player.buchholzCut1 || 0,
    wins: player.wins || 0,
    games: player.games || 0,
    opponents: player.opponents || [],
    colorHistory: player.colorHistory || [],
    lastColor: player.lastColor || "",
  }))
}

// Generate pairings for the first round (random pairing with rating consideration)
export function generateFirstRoundPairings(players: Player[]): Pairing[] {
  // Sort players by rating for better initial pairings
  const sortedPlayers = [...players].sort((a, b) => {
    const ratingA = typeof a.rating === "string" ? Number.parseInt(a.rating) || 0 : a.rating || 0
    const ratingB = typeof b.rating === "string" ? Number.parseInt(b.rating) || 0 : b.rating || 0
    return ratingB - ratingA
  })

  const pairings: Pairing[] = []

  // Pair players: 1 vs n/2+1, 2 vs n/2+2, etc.
  const halfPoint = Math.ceil(sortedPlayers.length / 2)

  for (let i = 0; i < halfPoint && i + halfPoint < sortedPlayers.length; i++) {
    const white = sortedPlayers[i]
    const black = sortedPlayers[i + halfPoint]

    pairings.push({
      table: i + 1,
      white,
      black,
      result: "",
      status: "not_started",
    })

    // Update player data
    white.opponents.push(black.id)
    black.opponents.push(white.id)
    white.colorHistory.push("w")
    black.colorHistory.push("b")
    white.lastColor = "w"
    black.lastColor = "b"
  }

  // Handle odd number of players (bye)
  if (sortedPlayers.length % 2 !== 0 && sortedPlayers.length > 0) {
    // The last player gets a bye (automatically gets 1 point)
    const byePlayer = sortedPlayers[sortedPlayers.length - 1]
    byePlayer.points += 1
    byePlayer.games += 1
    byePlayer.wins += 1
  }

  return pairings
}

// Generate pairings for subsequent rounds
export function generateSwissPairings(players: Player[], round: number): Pairing[] {
  if (round === 1) {
    return generateFirstRoundPairings(players)
  }

  // Group players by points
  const playersByPoints: { [key: number]: Player[] } = {}
  players.forEach((player) => {
    const points = player.points
    if (!playersByPoints[points]) {
      playersByPoints[points] = []
    }
    playersByPoints[points].push(player)
  })

  // Sort point groups in descending order
  const pointGroups = Object.keys(playersByPoints)
    .map(Number)
    .sort((a, b) => b - a)

  const pairings: Pairing[] = []
  let tableNumber = 1
  const unpairedPlayers: Player[] = []

  // Try to pair players within the same point group first
  for (const points of pointGroups) {
    const group = playersByPoints[points]

    // Sort players by rating within each point group
    group.sort((a, b) => {
      const ratingA = typeof a.rating === "string" ? Number.parseInt(a.rating) || 0 : a.rating || 0
      const ratingB = typeof b.rating === "string" ? Number.parseInt(b.rating) || 0 : b.rating || 0
      return ratingB - ratingA
    })

    const pairedPlayers = new Set<string>()

    // Try to pair players within the same point group
    for (let i = 0; i < group.length; i++) {
      if (pairedPlayers.has(group[i].id)) continue

      let pairFound = false

      for (let j = i + 1; j < group.length; j++) {
        if (pairedPlayers.has(group[j].id)) continue

        // Check if these players have already played each other
        if (group[i].opponents.includes(group[j].id)) continue

        // Try to balance colors
        let white = group[i]
        let black = group[j]

        // If both players had the same color last time, give opposite colors
        if (white.lastColor === black.lastColor) {
          if (white.lastColor === "w") {
            ;[white, black] = [black, white]
          }
        }
        // If color history is unbalanced, try to balance
        else if (
          white.colorHistory.filter((c) => c === "w").length > white.colorHistory.filter((c) => c === "b").length
        ) {
          ;[white, black] = [black, white]
        }

        pairings.push({
          table: tableNumber++,
          white,
          black,
          result: "",
          status: "not_started",
        })

        // Update player data
        white.opponents.push(black.id)
        black.opponents.push(white.id)
        white.colorHistory.push("w")
        black.colorHistory.push("b")
        white.lastColor = "w"
        black.lastColor = "b"

        pairedPlayers.add(white.id)
        pairedPlayers.add(black.id)
        pairFound = true
        break
      }

      if (!pairFound && !pairedPlayers.has(group[i].id)) {
        unpairedPlayers.push(group[i])
      }
    }
  }

  // Pair remaining players across point groups
  while (unpairedPlayers.length >= 2) {
    const white = unpairedPlayers[0]

    // Find a suitable opponent
    let opponentIndex = 1
    for (let i = 1; i < unpairedPlayers.length; i++) {
      if (!white.opponents.includes(unpairedPlayers[i].id)) {
        opponentIndex = i
        break
      }
    }

    const black = unpairedPlayers[opponentIndex]

    pairings.push({
      table: tableNumber++,
      white,
      black,
      result: "",
      status: "not_started",
    })

    // Update player data
    white.opponents.push(black.id)
    black.opponents.push(white.id)
    white.colorHistory.push("w")
    black.colorHistory.push("b")
    white.lastColor = "w"
    black.lastColor = "b"

    // Remove paired players
    unpairedPlayers.splice(opponentIndex, 1)
    unpairedPlayers.splice(0, 1)
  }

  // Handle odd number of players (bye)
  if (unpairedPlayers.length === 1) {
    // The last player gets a bye (automatically gets 1 point)
    const byePlayer = unpairedPlayers[0]
    byePlayer.points += 1
    byePlayer.games += 1
    byePlayer.wins += 1
  }

  return pairings
}

// Update player standings based on game results
export function updateStandings(players: Player[], results: GameResult[]): Player[] {
  const updatedPlayers = [...players]
  const playerMap = new Map<string, Player>()

  // Create a map for easy player lookup
  updatedPlayers.forEach((player) => {
    playerMap.set(player.id, player)
  })

  // Update points based on results
  results.forEach((result) => {
    const white = playerMap.get(result.whiteId)
    const black = playerMap.get(result.blackId)

    if (!white || !black) return

    white.games += 1
    black.games += 1

    if (result.result === "1-0") {
      white.points += 1
      white.wins += 1
    } else if (result.result === "0-1") {
      black.points += 1
      black.wins += 1
    } else if (result.result === "0.5-0.5") {
      white.points += 0.5
      black.points += 0.5
    }
  })

  // Calculate tiebreaks
  updatedPlayers.forEach((player) => {
    // Calculate Buchholz (sum of opponents' scores)
    player.buchholz = player.opponents
      .map((oppId) => playerMap.get(oppId)?.points || 0)
      .reduce((sum, points) => sum + points, 0)

    // Calculate Buchholz Cut-1 (Buchholz minus the lowest opponent score)
    if (player.opponents.length > 0) {
      const opponentScores = player.opponents.map((oppId) => playerMap.get(oppId)?.points || 0)
      const minScore = Math.min(...opponentScores)
      player.buchholzCut1 = player.buchholz - minScore
    }
  })

  // Sort players by points, then tiebreaks
  updatedPlayers.sort((a, b) => {
    // First by points (descending)
    if (b.points !== a.points) return b.points - a.points

    // Then by Buchholz (descending)
    if (b.buchholz !== a.buchholz) return b.buchholz - a.buchholz

    // Then by Buchholz Cut-1 (descending)
    if (b.buchholzCut1 !== a.buchholzCut1) return b.buchholzCut1 - a.buchholzCut1

    // Then by number of wins (descending)
    if (b.wins !== a.wins) return b.wins - a.wins

    // Finally by rating (descending)
    const ratingA = typeof a.rating === "string" ? Number.parseInt(a.rating) || 0 : a.rating || 0
    const ratingB = typeof b.rating === "string" ? Number.parseInt(b.rating) || 0 : b.rating || 0
    return ratingB - ratingA
  })

  return updatedPlayers
}

// Check if all games in current round are finished
export function canAdvanceRound(pairings: Pairing[]): boolean {
  return pairings.length > 0 && pairings.every((p) => p.status === "finished")
}

// Get tournament statistics
export function getTournamentStats(players: Player[], pairings: Pairing[]) {
  const totalGames = players.reduce((sum, p) => sum + p.games, 0)
  const totalWins = players.reduce((sum, p) => sum + p.wins, 0)
  const completedGames = pairings.filter((p) => p.status === "finished").length
  const ongoingGames = pairings.filter((p) => p.status === "ongoing").length
  const notStartedGames = pairings.filter((p) => p.status === "not_started").length

  return {
    totalGames,
    totalWins,
    drawRate: totalGames > 0 ? ((totalGames - totalWins) / totalGames) * 100 : 0,
    completedGames,
    ongoingGames,
    notStartedGames,
    averageRating:
      players.length > 0
        ? players.reduce((sum, p) => {
            const rating = typeof p.rating === "string" ? Number.parseInt(p.rating) || 0 : p.rating || 0
            return sum + rating
          }, 0) / players.length
        : 0,
  }
}
