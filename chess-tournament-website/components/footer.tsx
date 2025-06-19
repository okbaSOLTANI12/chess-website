import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/chess-club-logo.png"
                alt="Chess Academy Club"
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <h3 className="font-bold text-lg">Chess Academy Club</h3>
                <p className="text-sm text-gray-400">نادي الأكاديمية للشطرنج</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Promoting chess excellence in Bir El Ater and across Algeria. Learn • Play • Grow with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tournament-info" className="text-gray-300 hover:text-white transition-colors">
                  Tournament Info
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-300 hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-gray-300 hover:text-white transition-colors">
                  Rankings
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Tournament Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">National Rapid Chess Championship 2025</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Youth House Bir El Ater</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm">Saturday, June 21, 2025</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm">FIDE recognized rapid tournament</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+213 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@chessacademyclub.dz</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">Stay updated with tournament news and chess tips</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Chess Academy Club Bir El Ater. All rights reserved. | Organized with passion for chess excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}
