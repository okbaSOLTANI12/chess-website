"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Calendar, Trophy } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Tournament Venue",
      details: ["Bir El Ater Cultural Center", "Avenue de l'Indépendance", "Bir El Ater, Algeria"],
      color: "text-red-600",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["Tournament Hotline: +213 XXX XXX XXX", "Club Office: +213 XXX XXX XXX", "WhatsApp: +213 XXX XXX XXX"],
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "Tournament: tournament@chessacademyclub.dz",
        "General Info: info@chessacademyclub.dz",
        "Media: media@chessacademyclub.dz",
      ],
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 09:00 - 17:00", "Saturday: 09:00 - 14:00", "Tournament Days: 08:00 - 22:00"],
      color: "text-purple-600",
    },
  ]

  const departments = [
    {
      icon: Trophy,
      title: "Tournament Direction",
      name: "Omar Belkacem",
      role: "Tournament Director",
      email: "tournament@chessacademyclub.dz",
      phone: "+213 XXX XXX XXX",
    },
    {
      icon: Users,
      title: "Registration & Players",
      name: "Fatima Khelifi",
      role: "Registration Coordinator",
      email: "registration@chessacademyclub.dz",
      phone: "+213 XXX XXX XXX",
    },
    {
      icon: Calendar,
      title: "Media & Press",
      name: "Ahmed Bensalem",
      role: "Media Coordinator",
      email: "media@chessacademyclub.dz",
      phone: "+213 XXX XXX XXX",
    },
    {
      icon: MessageSquare,
      title: "General Inquiries",
      name: "Leila Mansouri",
      role: "Club Secretary",
      email: "info@chessacademyclub.dz",
      phone: "+213 XXX XXX XXX",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600">Get In Touch</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about the tournament, registration, or our chess club? We're here to help and would love to
            hear from you.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    Send Us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+213 XXX XXX XXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Inquiry Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tournament">Tournament Information</SelectItem>
                            <SelectItem value="registration">Registration Help</SelectItem>
                            <SelectItem value="accommodation">Accommodation</SelectItem>
                            <SelectItem value="media">Media & Press</SelectItem>
                            <SelectItem value="sponsorship">Sponsorship</SelectItem>
                            <SelectItem value="club">Club Membership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief subject of your message"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                  <CardDescription>Get in touch with us directly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${info.color}`}>
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800">Tournament Emergency</CardTitle>
                  <CardDescription className="text-red-600">For urgent matters during tournament days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold text-red-800">24/7 Hotline</p>
                    <p className="text-red-700">+213 XXX XXX XXX</p>
                    <p className="text-sm text-red-600">
                      Available March 15-17, 2025 for urgent tournament-related issues
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                  <CardDescription>Stay connected on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                        f
                      </div>
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-sm text-gray-600">@ChessAcademyClubBirElAter</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-white text-sm font-bold">
                        @
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-gray-600">@chessacademyclub</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-sm font-bold">
                        W
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-gray-600">+213 XXX XXX XXX</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Department Contacts */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Department Contacts</CardTitle>
              <CardDescription>Reach out to specific departments for specialized assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <dept.icon className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-slate-800">{dept.title}</h4>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800">{dept.name}</p>
                      <p className="text-sm text-gray-600">{dept.role}</p>
                      <p className="text-sm text-blue-600">{dept.email}</p>
                      <p className="text-sm text-gray-600">{dept.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FAQ Quick Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Registration Deadline?</h4>
                  <p className="text-sm text-gray-600">
                    Registration closes on March 10, 2025. Early bird discounts available until February 28.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Tournament Format?</h4>
                  <p className="text-sm text-gray-600">
                    Swiss system with different round numbers for each category. See tournament info for details.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Accommodation Help?</h4>
                  <p className="text-sm text-gray-600">
                    We have partnerships with local hotels offering special rates for tournament participants.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-slate-800 mb-2">Payment Methods?</h4>
                  <p className="text-sm text-gray-600">
                    We accept bank transfers, cash payments, and mobile payment methods for registration fees.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
