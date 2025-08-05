import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          HTML5 Tab Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Build interactive HTML5 tabs with JavaScript and inline CSS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Tabs Generator Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            🏷️ Tabs Generator
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create dynamic HTML5 tabs with customizable headers and content. Generate clean code with inline CSS.
          </p>
          <Link
            href="/tabs"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus-visible:focus"
          >
            Start Building →
          </Link>
        </div>

        {/* Coming Soon Cards */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 opacity-75">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            🚪 Escape Room
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interactive puzzle game with HTML5 elements and JavaScript logic.
          </p>
          <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Coming Soon
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 opacity-75">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            🏁 Coding Races
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Competitive coding challenges with real-time progress tracking.
          </p>
          <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Coming Soon
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 opacity-75">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            ⚖️ Court Room
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Legal case simulation with interactive decision-making elements.
          </p>
          <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Coming Soon
          </span>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 opacity-75">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            📝 Pre-lab Questions
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interactive quiz system with instant feedback and progress tracking.
          </p>
          <span className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Coming Soon
          </span>
        </div>

        {/* About Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            ℹ️ About
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Learn more about this project, view the demo video, and get usage instructions.
          </p>
          <Link
            href="/about"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors focus-visible:focus"
          >
            Learn More →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dark/Light Mode</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Toggle between themes with system preference support
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hamburger menu and mobile-friendly interface
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">♿</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Accessible</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              WCAG compliant with keyboard navigation
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🍪</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cookies</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remembers your last visited tab
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}