const STUDENT_NAME = "Zaher Abuamro"
const STUDENT_NUMBER = "22365417"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const currentDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} {STUDENT_NAME} | Student No: {STUDENT_NUMBER} | {currentDate}
          </p>
          <p className="mt-1">
            La Trobe University - CSE3CWA Assignment
          </p>
        </div>
      </div>
    </footer>
  )
}