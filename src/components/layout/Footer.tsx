import Link from 'next/link';
import { Leaf, Globe, Mail, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold tracking-tight text-green-700">Green Pulse</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Empowering individuals to take daily green actions for a sustainable future. 
              Join the movement and start your eco-journey today.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-green-600 transition-colors">
                <Info className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/challenges" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  All Challenges
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-green-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Green Pulse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for the Earth.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
