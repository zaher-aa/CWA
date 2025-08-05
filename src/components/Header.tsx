'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

const STUDENT_NUMBER = "12345678" // Replace with your actual student number

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system')
  const pathname = usePathname()

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Tabs', href: '/tabs' },
    { name: 'Pre-lab Questions', href: '/prelab' },
    { name: 'Escape Room', href: '/escape-room' },
    { name: 'Coding Races', href: '/coding-races' },
    { name: 'Court Room', href: '/court-room' },
    { name: 'About', href: '/about' },
  ]

  // Handle hydration and theme
  useEffect(() => {
    setMounted(true)
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system'
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    
    if (currentTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.setAttribute('data-theme', systemTheme)
    } else {
      root.setAttribute('data-theme', currentTheme)
    }
    
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme, mounted])

  // Save current page to cookies (only after mounted)
  useEffect(() => {
    if (mounted) {
      const currentTab = navigationItems.find(item => item.href === pathname)
      if (currentTab) {
        Cookies.set('lastVisitedTab', currentTab.name, { expires: 7 })
      }
    }
  }, [pathname, mounted])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'
    setCurrentTheme(newTheme)
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Student Number */}
          <div className="flex-shrink-0">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Student No: {STUDENT_NUMBER}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:focus ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus-visible:focus"
              aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'} mode`}
            >
              {mounted ? (currentTheme === 'light' ? '🌙' : currentTheme === 'dark' ? '💻' : '☀️') : '☀️'}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus-visible:focus ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}