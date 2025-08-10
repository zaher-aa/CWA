const STUDENT_NAME = "Zaher Abuamro";
const STUDENT_NUMBER = "22365417";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          About This Project
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Student Information */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Student Information
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-lg">
                <strong>Name:</strong> {STUDENT_NAME}
              </p>
              <p className="text-lg">
                <strong>Student Number:</strong> {STUDENT_NUMBER}
              </p>
              <p className="text-lg">
                <strong>Course:</strong> CSE3CWA
              </p>
              <p className="text-lg">
                <strong>Assignment:</strong> Freelance Services Agreement
                (Assignment 1)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How to Use This Website
            </h2>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
              <div
                className="mx-auto rounded-lg shadow-lg overflow-hidden"
                style={{ maxWidth: 960 }}
              >
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <video
                    controls
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* File must be at: public/videos/Assignment 1.mov */}
                    <source
                      src="/videos/Assignment 1.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Watch the walkthrough of this website. If the video doesn’t
                play,{" "}
                <a
                  href="/videos/Assignment 1.mp4"
                  className="underline"
                  download
                >
                  download it
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Project Overview
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This Next.js application is designed to generate HTML5 code with
              JavaScript and inline CSS for deployment on MOODLE LMS. The
              application focuses on creating interactive tab components that
              can be easily copied and pasted into LMS environments.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Key Features Implemented:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Responsive Navigation:</strong> Header with hamburger
                menu for mobile devices
              </li>
              <li>
                <strong>Theme Support:</strong> Dark mode, light mode, and
                system preference detection
              </li>
              <li>
                <strong>Accessibility:</strong> WCAG compliant with proper ARIA
                labels and keyboard navigation
              </li>
              <li>
                <strong>Cookie Management:</strong> Remembers the last visited
                navigation tab
              </li>
              <li>
                <strong>Tab Generator:</strong> Dynamic creation of up to 15
                tabs with customizable content
              </li>
              <li>
                <strong>Code Output:</strong> Generates clean HTML5 with inline
                CSS (no external classes)
              </li>
              <li>
                <strong>Local Storage:</strong> Persists tab configurations
                between sessions
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Technical Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">⚛️</div>
              <p className="font-semibold">Next.js 14</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                App Router
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">📘</div>
              <p className="font-semibold">TypeScript</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type Safety
              </p>
            </div>
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🎨</div>
              <p className="font-semibold">Tailwind CSS</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Styling
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🍪</div>
              <p className="font-semibold">js-cookie</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                State Persistence
              </p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Use the Tab Generator
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                Navigate to the <strong>Tabs</strong> page from the menu
              </li>
              <li>
                Use the <strong>+ Add Tab</strong> button to create new tabs (up
                to 15)
              </li>
              <li>Click on tab headers to edit their names</li>
              <li>Click on tab content areas to edit their content</li>
              <li>
                Use the <strong>- Remove Tab</strong> button to delete tabs
              </li>
              <li>
                Click <strong>Generate Output</strong> to create the HTML5 code
              </li>
              <li>Copy the generated code and paste it into any HTML file</li>
              <li>
                Your tab configuration is automatically saved in localStorage
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
