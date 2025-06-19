import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Trophy, Users, Clock, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/images/chess-club-logo.png"
                alt="Chess Academy Club Logo"
                width={200}
                height={200}
                className="mx-auto mb-6"
              />
            </div>
            <Badge className="mb-4 bg-red-600 hover:bg-red-700">National Tournament 2025</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">National Rapid Chess Championship</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Open BIR EL ATER - FIDE Recognized</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/register">Register Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Link href="/tournament-info">Tournament Info</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tournament Highlights</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the ultimate chess competition with players from across Algeria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                <CardTitle className="text-xl">Prize Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-800">40,000 DZD</p>
                <p className="text-gray-600">Total</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-xl">Format</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-800">7 Rounds</p>
                <p className="text-gray-600">Swiss System</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-xl">Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-800">1 Day</p>
                <p className="text-gray-600">Saturday, June 21, 2025</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-600 mx-auto mb-2" />
                <CardTitle className="text-xl">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-800">Bir El Ater</p>
                <p className="text-gray-600">Youth House</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tournament Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tournament Details</h2>
            <p className="text-lg text-gray-600">Single category open to all players</p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-8 w-8 text-yellow-600 mb-2" />
                <CardTitle className="text-xl">Open Championship</CardTitle>
                <CardDescription>For all players</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 7 rounds Swiss system</li>
                  <li>• Time control: 15 minutes + 5 seconds increment</li>
                  <li>• Registration fee: 1,000 DZD</li>
                  <li>• Grand prize: 15,000 DZD</li>
                  <li>• 2nd Place: 10,000 DZD</li>
                  <li>• 3rd Place: 7,000 DZD</li>
                  <li>• 4th Place: 5,000 DZD</li>
                  <li>• 5th Place: 3,000 DZD</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Preview */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tournament Schedule</h2>
            <p className="text-lg text-gray-600">A single day of intense chess competition</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Morning - June 21</CardTitle>
                  <CardDescription>Rounds 1-4</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">09:00 - Round 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">10:00 - Round 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">11:00 - Round 3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">12:00 - Round 4</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Afternoon - June 21</CardTitle>
                  <CardDescription>Rounds 5-7 & Awards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">14:00 - Round 5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">15:00 - Round 6</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">16:00 - Round 7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">17:00 - Closing Ceremony</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Compete?</h2>
          <p className="text-xl mb-8 text-blue-100">Register now and be part of Algeria's biggest chess tournament</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/register">Register for Tournament</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="/contact">Contact Organizers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
