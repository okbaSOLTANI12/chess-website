import { CardDescription } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function TournamentInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">National Rapid Chess Championship</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Tournament Information</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete details about the National Rapid Chess Championship - Open BIR EL ATER - FIDE Recognized organized
            by Youth and Sports Directorate in partnership with Bir El Ater Chess Academy
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="prizes">Prizes</TabsTrigger>
            <TabsTrigger value="venue">Venue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <CardTitle>Tournament Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-slate-800">June 21</p>
                  <p className="text-gray-600">2025</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <CardTitle>Expected Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-slate-800">200+</p>
                  <p className="text-gray-600">From across Algeria</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                  <CardTitle>Total Prize Pool</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-slate-800">40,000</p>
                  <p className="text-gray-600">DZD</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-red-600 mx-auto mb-2" />
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-slate-800">Youth House</p>
                  <p className="text-gray-600">Bir El Ater</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>About the Tournament</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  The Bir El Ater Chess Championship 2025 is Algeria's premier national chess tournament, organized by
                  the prestigious Chess Academy Club. This one-day event brings together the finest chess players from
                  across the country to compete in a celebration of strategic excellence and intellectual prowess.
                </p>
                <p className="text-gray-700 mb-4">
                  Our tournament features a single open category to accommodate players of all skill levels. With FIDE
                  rating opportunities, substantial prize pools, and professional organization, this championship
                  represents the pinnacle of competitive chess in Algeria.
                </p>
                <p className="text-gray-700">
                  Join us in Bir El Ater for an unforgettable chess experience that combines competitive excellence with
                  cultural celebration, fostering the growth of chess throughout Algeria.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Rules & Regulations</CardTitle>
                <CardDescription>Please read all rules carefully before registering</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">General Rules</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Tournament follows FIDE Laws of Chess</li>
                    <li>Swiss system pairing will be used</li>
                    <li>No draws allowed in first 30 moves without arbiter approval</li>
                    <li>Electronic devices are strictly prohibited in playing area</li>
                    <li>Players must arrive 15 minutes before round start</li>
                    <li>Default time is 30 minutes after round start</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Time Controls</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Open Championship: 15 minutes + 5 seconds increment per move</li>
                    <li>Games must be recorded from move 1</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Conduct & Fair Play</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Respectful behavior towards opponents and officials required</li>
                    <li>Anti-cheating measures will be strictly enforced</li>
                    <li>Smoking and loud conversations prohibited in playing hall</li>
                    <li>Dress code: Smart casual, no shorts or flip-flops</li>
                    <li>Disputes must be reported to chief arbiter immediately</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Registration & Fees</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>Registration deadline: June 15, 2025</li>
                    <li>Payment must be completed for registration confirmation</li>
                    <li>Refunds available only for medical emergencies with documentation</li>
                    <li>Late registration subject to availability and additional fees</li>
                    <li>Registration Fee: 1,000 DZD (Participation) + 1,000 DZD (FIDE ID)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prizes" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                  <CardTitle>Open Championship</CardTitle>
                  <CardDescription>Total Prize Pool: 40,000 DZD</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="font-semibold">1st Place</span>
                      <span className="text-yellow-600 font-bold">15000 DZD</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">2nd Place</span>
                      <span className="text-gray-600 font-bold">10000 DZD</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="font-semibold">3rd Place</span>
                      <span className="text-orange-600 font-bold">7000 DZD</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="font-semibold">4th Place</span>
                      <span className="text-blue-600 font-bold">5000 DZD</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="font-semibold">5th Place</span>
                      <span className="text-green-600 font-bold">3000 DZD</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="venue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Tournament Venue
                </CardTitle>
                <CardDescription>Youth House Bir El Ater - Premier chess tournament facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Venue Details</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Name:</strong> Youth House Bir El Ater
                      </p>
                      <p>
                        <strong>Address:</strong> Avenue de la Jeunesse, Bir El Ater, Algeria
                      </p>
                      <p>
                        <strong>Capacity:</strong> 150 players in main hall
                      </p>
                      <p>
                        <strong>Facilities:</strong> Air conditioning, modern lighting, comfortable seating
                      </p>
                      <p>
                        <strong>Accessibility:</strong> Wheelchair accessible, parking available
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>Professional chess sets and boards</li>
                      <li>Digital clocks for games</li>
                      <li>Live game broadcasting system</li>
                      <li>Cafeteria and refreshment area</li>
                      <li>Prayer room and rest areas</li>
                      <li>Free WiFi throughout venue</li>
                      <li>Medical assistance on-site</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Getting There</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">By Car</h4>
                      <p className="text-gray-700 text-sm">
                        The venue is located in the city center with parking available. GPS coordinates: 35.2345N,
                        7.8901E
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Public Transport</h4>
                      <p className="text-gray-700 text-sm">
                        Regular bus services connect to the cultural center. Taxi services are readily available
                        throughout the city.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Accommodation</h3>
                  <p className="text-gray-700 mb-3">
                    We have partnered with local hotels to offer special rates for participants:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Hotel Atlas</h4>
                      <p className="text-sm text-gray-600">4-star hotel, 5 min walk</p>
                      <p className="text-sm font-medium text-green-600">Special rate: 8000 DZD/night</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Residence El Nour</h4>
                      <p className="text-sm text-gray-600">3-star hotel, 10 min walk</p>
                      <p className="text-sm font-medium text-green-600">Special rate: 5500 DZD/night</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Youth Hostel</h4>
                      <p className="text-sm text-gray-600">Budget option, 15 min walk</p>
                      <p className="text-sm font-medium text-green-600">Special rate: 2500 DZD/night</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Join the Championship?</h3>
              <p className="text-gray-600 mb-6">
                Register now and secure your place in Algeria's premier chess tournament
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/register">Register Now</Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/contact">Contact Organizers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
