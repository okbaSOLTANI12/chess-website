"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Trophy, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface PlayerData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  gender: string
  city: string
  club: string
  fideId: string
  rating: string
  dietary: string
  registrationDate: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    city: "",
    club: "",
    fideId: "",
    rating: "",
    dietary: "",
    terms: false,
    newsletter: false,
  })

  const categories = [
    {
      id: "open",
      name: "Open Championship",
      description: "7 rounds Swiss system. Time control: 15 minutes + 5 seconds increment",
      fee: "1,000 DZD",
      prize: "15,000 DZD",
    },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.terms) {
      alert("Please agree to the tournament rules and regulations")
      return
    }

    // Create player object
    const newPlayer: PlayerData = {
      id: `PLR${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      gender: formData.gender,
      city: formData.city,
      club: formData.club,
      fideId: formData.fideId,
      rating: formData.rating,
      dietary: formData.dietary,
      registrationDate: new Date().toISOString(),
    }

    // Get existing players from localStorage
    const existingPlayers = JSON.parse(localStorage.getItem("registeredPlayers") || "[]")

    // Add new player
    const updatedPlayers = [...existingPlayers, newPlayer]

    // Save to localStorage
    localStorage.setItem("registeredPlayers", JSON.stringify(updatedPlayers))

    setIsSubmitted(true)

    // Redirect to rankings after 3 seconds
    setTimeout(() => {
      router.push("/rankings")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Welcome {formData.firstName} {formData.lastName}! You have been successfully registered for the
              tournament.
            </p>
            <Badge className="bg-green-100 text-green-800 mb-4">Player ID: PLR{Date.now().toString().slice(-6)}</Badge>
            <p className="text-sm text-gray-500">Redirecting to rankings page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">National Rapid Chess Championship</h1>
            <p className="text-lg text-gray-600">Open BIR EL ATER - FIDE Recognized</p>
            <Badge className="mt-4 bg-red-600">Registration Fee: 1,000 DZD + 1,000 DZD (FIDE ID)</Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Player Information
                  </CardTitle>
                  <CardDescription>Please fill in your details accurately</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+213 XXX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthDate">Date of Birth *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <select
                          id="gender"
                          value={formData.gender}
                          onChange={(e) => handleInputChange("gender", e.target.value)}
                          className="w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Your city"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="club">Chess Club</Label>
                        <Input
                          id="club"
                          value={formData.club}
                          onChange={(e) => handleInputChange("club", e.target.value)}
                          placeholder="Your chess club (optional)"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fideId">FIDE ID</Label>
                        <Input
                          id="fideId"
                          value={formData.fideId}
                          onChange={(e) => handleInputChange("fideId", e.target.value)}
                          placeholder="FIDE ID (if available)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rating">Current Rating</Label>
                        <Input
                          id="rating"
                          value={formData.rating}
                          onChange={(e) => handleInputChange("rating", e.target.value)}
                          placeholder="Your current ELO rating"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Tournament Category *</Label>
                      <Input type="text" value={`${categories[0].name} - ${categories[0].fee}`} readOnly />
                    </div>

                    <div>
                      <Label htmlFor="dietary">Dietary Requirements</Label>
                      <Textarea
                        id="dietary"
                        value={formData.dietary}
                        onChange={(e) => handleInputChange("dietary", e.target.value)}
                        placeholder="Any dietary restrictions or special requirements..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.terms}
                          onCheckedChange={(checked) => handleInputChange("terms", checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the tournament rules and regulations *
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to tournament updates and chess news
                        </Label>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      Payment of 1,000 DZD will be collected at the venue on the day of the tournament.
                    </p>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg">
                      Register for Tournament
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Tournament Categories & Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Tournament Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors border-red-500 bg-red-50`}
                    >
                      <h4 className="font-semibold text-slate-800">{category.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 font-medium">Prize: {category.prize}</span>
                        <span className="text-blue-600 font-medium">Fee: {category.fee}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Registration Deadline:</span>
                    <span className="text-sm font-medium">June 18, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tournament Date:</span>
                    <span className="text-sm font-medium">June 21, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Venue:</span>
                    <span className="text-sm font-medium">Youth House Bir El Ater</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Contact our tournament organizers for assistance</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> tournament@chessacademyclub.dz
                    </p>
                    <p>
                      <strong>Phone:</strong> +213 XXX XXX XXX
                    </p>
                    <p>
                      <strong>WhatsApp:</strong> +213 XXX XXX XXX
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
