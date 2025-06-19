import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, MapPin, Users, Trophy, Coffee, Star } from "lucide-react"

export default function SchedulePage() {
  const scheduleData = [
    {
      day: "Saturday, June 21, 2025",
      date: "One-Day Tournament",
      events: [
        {
          time: "08:30",
          event: "Registration confirmation",
          icon: Users,
          location: "Youth House Bir El Ater",
          category: "admin",
        },
        {
          time: "09:30",
          event: "Round 1",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        {
          time: "10:20",
          event: "Round 2",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        {
          time: "11:30",
          event: "Round 3",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        { time: "12:30 - 13:30", event: "Lunch Break", icon: Coffee, location: "Cafeteria", category: "break" },
        {
          time: "15:00",
          event: "Round 4",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        {
          time: "15:50",
          event: "Round 5",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        {
          time: "16:40",
          event: "Round 6",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        { time: "16:30 - 17:00", event: "Coffee Break", icon: Coffee, location: "Cafeteria", category: "break" },
        {
          time: "17:30",
          event: "Round 7",
          icon: Trophy,
          location: "Playing Hall",
          category: "round",
        },
        {
          time: "18:00 - 18:30",
          event: "Final Results Calculation",
          icon: Users,
          location: "Admin Office",
          category: "admin",
        },
        {
          time: "18:30 - 19:30",
          event: "Closing Ceremony & Prize Distribution",
          icon: Star,
          location: "Main Hall",
          category: "ceremony",
        },
      ],
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "round":
        return "bg-red-100 text-red-800"
      case "break":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "social":
        return "bg-purple-100 text-purple-800"
      case "ceremony":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Tournament Schedule 2025</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">National Rapid Chess Championship</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete schedule for the Bir El Ater Rapid Chess Tournament 2025. All times are local (GMT+1). Please
            arrive 15 minutes before each round.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Open BIR EL ATER - FIDE Recognized</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Tournament Date</p>
              <p className="text-sm text-gray-600">June 21, 2025</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">First Round</p>
              <p className="text-sm text-gray-600">9:30 AM</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-semibold">Venue</p>
              <p className="text-sm text-gray-600">Youth House Bir El Ater</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-semibold">Total Rounds</p>
              <p className="text-sm text-gray-600">7 Rounds</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-6xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{scheduleData[0].day}</CardTitle>
            <CardDescription className="text-lg">{scheduleData[0].date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduleData[0].events.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <event.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-800">{event.time}</span>
                      <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                    </div>
                    <h3 className="font-medium text-lg text-slate-700">{event.event}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Important Timing Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Players must arrive 15 minutes before each round</li>
                <li>• Default time is 15 minutes after round start</li>
                <li>• Time control: 15 minutes + 5 seconds increment</li>
                <li>• Results will be posted 15 minutes after each round</li>
                <li>• Pairings for next round available 30 minutes after results</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Venue Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Main Hall: Opening/Closing ceremonies</li>
                <li>• Playing Hall: Tournament rounds</li>
                <li>• Cafeteria: Meals and refreshments</li>
                <li>• Registration desk at the entrance</li>
                <li>• Admin Office: Tournament direction</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Live Updates */}
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Live Tournament Updates</CardTitle>
            <CardDescription>Follow live games and results during the tournament</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Live game broadcasting, real-time results, and player standings will be available on our website and
              social media channels during the tournament.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-green-600">Live Games Available</Badge>
              <Badge className="bg-blue-600">Real-time Results</Badge>
              <Badge className="bg-purple-600">Social Media Updates</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
