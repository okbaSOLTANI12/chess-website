import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Star, Target, Heart, Award, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const achievements = [
    { year: "2024", title: "Regional Championship Winners", description: "Our players won 3 regional titles" },
    { year: "2023", title: "Youth Development Award", description: "Recognized for outstanding youth programs" },
    { year: "2022", title: "Club of the Year", description: "Awarded by Algerian Chess Federation" },
    { year: "2021", title: "Community Impact Award", description: "For promoting chess in rural areas" },
  ]

  const boardMembers = [
    { name: "Ahmed Bensalem", position: "President", experience: "15 years in chess administration" },
    { name: "Fatima Khelifi", position: "Vice President", experience: "Former national champion" },
    { name: "Omar Belkacem", position: "Tournament Director", experience: "FIDE Arbiter, 20+ years experience" },
    { name: "Leila Mansouri", position: "Youth Coordinator", experience: "Chess educator and trainer" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Chess Academy Club</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            نادي الأكاديمية للشطرنج - Promoting chess excellence in Bir El Ater and across Algeria since 2018
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Club Logo and Mission */}
          <Card className="mb-12">
            <CardContent className="pt-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <Image
                    src="/images/chess-club-logo.png"
                    alt="Chess Academy Club Logo"
                    width={200}
                    height={200}
                    className="mx-auto md:mx-0 mb-6"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Chess Academy Club is dedicated to promoting the royal game of chess throughout Algeria. We believe
                    in the power of chess to develop critical thinking, strategic planning, and character building in
                    players of all ages.
                  </p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our motto "Learn • Play • Grow" reflects our commitment to providing comprehensive chess education,
                    competitive opportunities, and personal development through the game we love.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800">Learn</Badge>
                    <Badge className="bg-green-100 text-green-800">Play</Badge>
                    <Badge className="bg-purple-100 text-purple-800">Grow</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from tournament organization to player development and
                  community engagement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Inclusivity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chess is for everyone. We welcome players of all backgrounds, ages, and skill levels to join our chess
                  community and grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We embrace modern technology and innovative teaching methods to make chess more accessible and
                  engaging for the digital generation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Club History */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Our Journey
              </CardTitle>
              <CardDescription>From humble beginnings to national recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">2018 - Foundation</h3>
                  <p className="text-gray-600">
                    Chess Academy Club was founded by a group of passionate chess enthusiasts in Bir El Ater, with the
                    vision of creating a center of chess excellence in the region.
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">2019 - First Tournament</h3>
                  <p className="text-gray-600">
                    Organized our first local tournament with 50 participants, establishing ourselves as a serious chess
                    organization in the community.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">2020-2021 - Growth & Recognition</h3>
                  <p className="text-gray-600">
                    Despite challenges, we expanded our youth programs and gained recognition from the Algerian Chess
                    Federation for our contribution to chess development.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">2022-2024 - National Impact</h3>
                  <p className="text-gray-600">
                    Our players began competing at national level, winning multiple championships and establishing our
                    reputation as a premier chess club in Algeria.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-lg font-semibold text-slate-800">2025 - National Championship</h3>
                  <p className="text-gray-600">
                    Proud to host the Bir El Ater Chess Championship 2025, Algeria's largest national chess tournament,
                    marking our emergence as a major force in Algerian chess.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Our Achievements
              </CardTitle>
              <CardDescription>Recognition and awards that reflect our commitment to excellence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-100 text-blue-800">{achievement.year}</Badge>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Board Members */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Leadership Team
              </CardTitle>
              <CardDescription>
                Meet the dedicated individuals who guide our club's vision and operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {boardMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.position}</p>
                      <p className="text-sm text-gray-600">{member.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Programs & Services */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Our Programs & Services</CardTitle>
              <CardDescription>Comprehensive chess development opportunities for all skill levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Youth Training</h4>
                  <p className="text-sm text-gray-600">
                    Structured chess education for children and teenagers, focusing on fundamentals and competitive
                    play.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Adult Classes</h4>
                  <p className="text-sm text-gray-600">
                    Chess lessons for adults of all levels, from beginners to advanced players seeking improvement.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Tournament Organization</h4>
                  <p className="text-sm text-gray-600">
                    Regular tournaments and competitions to provide competitive experience for our members.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Online Training</h4>
                  <p className="text-sm text-gray-600">
                    Digital chess platforms and online coaching to reach players across Algeria.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">School Programs</h4>
                  <p className="text-sm text-gray-600">
                    Chess education programs in local schools to introduce the game to young minds.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Community Outreach</h4>
                  <p className="text-sm text-gray-600">
                    Chess promotion activities and events to grow the chess community in our region.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Contact */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                Visit Our Club
              </CardTitle>
              <CardDescription>Located in the heart of Bir El Ater, welcoming chess enthusiasts daily</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Club Location</h4>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <strong>Address:</strong> Avenue de l'Indépendance, Bir El Ater, Algeria
                    </p>
                    <p>
                      <strong>Training Hours:</strong> Daily 16:00 - 20:00
                    </p>
                    <p>
                      <strong>Weekend Sessions:</strong> Saturday & Sunday 09:00 - 17:00
                    </p>
                    <p>
                      <strong>Phone:</strong> +213 XXX XXX XXX
                    </p>
                    <p>
                      <strong>Email:</strong> info@chessacademyclub.dz
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Facilities</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Professional chess sets and boards</li>
                    <li>• Digital clocks and scoresheets</li>
                    <li>• Chess library and study materials</li>
                    <li>• Computer analysis room</li>
                    <li>• Comfortable training environment</li>
                    <li>• Refreshment area</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
            <CardContent className="pt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Chess Family</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Whether you're a beginner looking to learn or an experienced player seeking competition, Chess Academy
                Club welcomes you to be part of our growing chess community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/register">Join Tournament</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-slate-900"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
