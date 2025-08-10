# HTML5 Tab Generator - Assignment 1

A Next.js application that generates HTML5 tabs with JavaScript and inline CSS for MOODLE LMS deployment.

## Student Information
- **Student Name:** Zaher Abuamro
- **Student Number:** 22365417
- **Course:** CSE3CWA
- **Assignment:** Freelance Services Agreement (Assignment 1)

## Project Overview

This application creates HTML5 code with JavaScript and inline CSS that can be deployed on MOODLE LMS. The focus is on generating clean, standalone HTML that works without external dependencies.

## Assignment 1 Demo
[▶ Watch the demo on Google Drive](https://drive.google.com/file/d/1KxPGqMS9WJSG8FXZpgkfG7mOl-91TJE7/view?usp=sharing)

## Features Implemented

### ✅ Required Features (Assignment 1)

#### User Interface (4 points)
- ✅ Navigation Bar with tab navigation
- ✅ Header component with student number display
- ✅ Footer with copyright, student name, number, and date
- ✅ About page with student information

#### Themes (3 points)
- ✅ Dark Mode / Light Mode toggle
- ✅ System preference detection
- ✅ Theme persistence using localStorage

#### Hamburger Menu (3 points)
- ✅ Responsive hamburger menu for mobile
- ✅ CSS Transform animations for menu toggle
- ✅ Accessible with proper ARIA labels

#### Tabs Page Operations (6 points)
- ✅ Generate up to 15 tabs with + and - controls
- ✅ Editable tab headers
- ✅ Editable tab content
- ✅ Tab configuration stored in localStorage
- ✅ Live preview of tabs

#### Output Button (6 points)
- ✅ Generates standalone HTML5 code
- ✅ Uses only inline CSS (no CSS classes)
- ✅ Code can be copied and pasted into .html file
- ✅ Downloadable HTML file
- ✅ Copy to clipboard functionality

#### GitHub Requirements (3 points)
- ✅ Multiple commits planned
- ✅ Feature branches for development
- ✅ .gitignore excludes node_modules
- ✅ Updated README file

## Technical Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React hooks + localStorage
- **Cookie Management:** js-cookie
- **Accessibility:** WCAG compliant

## Installation and Setup

```bash
# Clone the repository
git clone [your-repo-url]
cd tab-generator

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── about/page.tsx
│   ├── tabs/page.tsx
│   ├── escape-room/page.tsx
│   ├── coding-races/page.tsx
│   ├── court-room/page.tsx
│   ├── prelab/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
└── types/
```

## Usage Instructions

1. **Home Page:** Overview of the application and available features
2. **Tabs Page:** Main functionality for creating and editing tabs
3. **About Page:** Student information and project details
4. **Other Pages:** Placeholder pages for future assignments

### Creating Tabs

1. Navigate to the Tabs page
2. Use "Add Tab" to create new tabs (maximum 15)
3. Click on any tab header to edit its name
4. Click in the content area to edit tab content
5. Use "Remove Tab" to delete the current tab
6. Click "Generate HTML5 Output" to create exportable code

### Generated Code Features

- Standalone HTML5 document
- Inline CSS styling (no external classes)
- JavaScript for tab functionality
- Responsive design
- Accessibility features

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Color contrast compliance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Assignment Progress

### Week 1 ✅
- [x] Project setup with Next.js 14
- [x] TypeScript configuration
- [x] Initial file structure

### Week 2 ✅
- [x] About page implementation
- [x] Cookie management for navigation
- [x] Basic styling setup

### Week 3 ✅
- [x] Header with hamburger menu
- [x] Footer implementation
- [x] Theme system (Dark/Light mode)
- [x] Breadcrumb navigation
- [x] CSS Transform animations

### Week 4 ✅
- [x] Interactive tab generator
- [x] HTML5 code output
- [x] localStorage integration
- [x] Copy/download functionality

## Development Notes

### AI Tools Used
- **GitHub Copilot:** Code completion and suggestions
- **ChatGPT:** Architecture planning and problem-solving
- **Claude:** Code review and optimization

*All AI-generated code has been reviewed, tested, and customized for this specific assignment.*

### Testing

The application has been tested for:
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance
- Generated HTML5 code validity
- localStorage functionality

## Future Enhancements (Assignment 2+)

- Escape Room game implementation
- Coding Races challenge system
- Court Room simulation
- Pre-lab Questions quiz system
- API integration
- Database connectivity
- Docker containerization
- Authentication system

## License

This project is created for educational purposes as part of La Trobe University coursework.
