import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: "Tournament Registration Reaches Record Numbers",
      excerpt:
        "With over 200 players registered, the Bir El Ater Chess Championship 2025 has become the largest chess tournament in Algeria's history.",
      content:
        "The enthusiasm for chess in Algeria continues to grow as we witness unprecedented registration numbers for our national championship. Players from all 48 wilayas have registered, making this truly a national celebration of chess.",
      author: "Tournament Director",
      date: "March 10, 2025",
      category: "Tournament News",
      featured: true,
    },
    {
      id: 2,
      title: "International Arbiter Confirmed for Championship",
      excerpt:
        "FIDE International Arbiter Mohammed Larbi will oversee the Open Championship, ensuring world-class tournament standards.",
      content:
        "We are honored to announce that IA Mohammed Larbi, one of Algeria's most respected chess arbiters, will be the chief arbiter for our Open Championship section.",
      author: "Chess Academy Club",
      date: "March 8, 2025",
      category: "Officials",
    },
    {
      id: 3,
      title: "Youth Chess Program Launches in Bir El Ater",
      excerpt:
        "Chess Academy Club announces new youth development program to nurture the next generation of Algerian chess talents.",
      content:
        "Following the success of our tournament preparations, we are launching a comprehensive youth chess program that will provide training and development opportunities for young players across the region.",
      author: "Youth Coordinator",
      date: "March 5, 2025",
      category: "Youth Development",
    },
    {
      id: 4,
      title: "Venue Preparations Complete",
      excerpt:
        "The Bir El Ater Cultural Center has been transformed into a world-class chess tournament venue with modern facilities.",
      content:
        "Our venue team has worked tirelessly to create the perfect environment for competitive chess. The main hall now features professional lighting, comfortable seating for 300 players, and state-of-the-art equipment.",
      author: "Venue Manager",
      date: "March 3, 2025",
      category: "Venue",
    },
    {
      id: 5,
      title: "Sponsorship Partnership Announced",
      excerpt:
        "Local businesses join forces to support Algeria's premier chess championship with substantial prize pool contributions.",
      content:
        "We are grateful to our sponsors who have made it possible to offer one of the largest prize pools in Algerian chess history. Their support demonstrates the growing recognition of chess as a sport in our country.",
      author: "Sponsorship Team",
      date: "February 28, 2025",
      category: "Sponsorship",
    },
    {
      id: 6,
      title: "Chess Academy Club History",
      excerpt:
        "Learn about the rich history of Chess Academy Club and its contribution to chess development in Algeria.",
      content:
        "Founded in 2018, Chess Academy Club has been at the forefront of chess development in the Bir El Ater region. Our club has produced numerous national champions and continues to promote chess excellence.",
      author: "Club Historian",
      date: "February 25, 2025",
      category: "Club History",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tournament News":
        return "bg-red-100 text-red-800"
      case "Officials":
        return "bg-blue-100 text-blue-800"
      case "Youth Development":
        return "bg-green-100 text-green-800"
      case "Venue":
        return "bg-purple-100 text-purple-800"
      case "Sponsorship":
        return "bg-yellow-100 text-yellow-800"
      case "Club History":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const featuredArticle = newsArticles.find((article) => article.featured)
  const regularArticles = newsArticles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Latest Updates</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Tournament News</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and developments from the Bir El Ater Chess Championship
            2025
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Article */}
          {featuredArticle && (
            <Card className="mb-12 border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-600">Featured</Badge>
                  <Badge className={getCategoryColor(featuredArticle.category)}>{featuredArticle.category}</Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl">{featuredArticle.title}</CardTitle>
                <CardDescription className="text-lg">{featuredArticle.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">{featuredArticle.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredArticle.date}</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{article.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    Read Full Article <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-12 bg-gradient-to-r from-blue-900 to-slate-800 text-white">
            <CardContent className="pt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-blue-100 mb-6">
                  Subscribe to our newsletter for the latest tournament updates, chess tips, and club news delivered
                  directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                  />
                  <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
                </div>
                <p className="text-xs text-blue-200 mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Live Updates</h4>
                <p className="text-sm text-gray-600 mb-4">Follow live tournament progress</p>
                <Button variant="outline" size="sm">
                  <Link href="/rankings">View Rankings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Schedule</h4>
                <p className="text-sm text-gray-600 mb-4">Complete tournament schedule</p>
                <Button variant="outline" size="sm">
                  <Link href="/schedule">View Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Registration</h4>
                <p className="text-sm text-gray-600 mb-4">Register for the tournament</p>
                <Button variant="outline" size="sm">
                  <Link href="/register">Register Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <ArrowRight className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-sm text-gray-600 mb-4">Get in touch with organizers</p>
                <Button variant="outline" size="sm">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
