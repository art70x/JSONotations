# JSONotations – Advanced Frontend JSON Editor Requirements Document

## 1. Application Overview

### 1.1 Application Name
JSONotations – Advanced Frontend JSON Editor

### 1.2 Application Description
A fully interactive JSON editor built with HTML, CSS, and JavaScript, designed to replace basic online editors by offering superior visualization, usability, and developer tools, all client-side.

## 2. Core Features

### 2.1 Interactive Editing
- Real-time syntax highlighting using JS libraries (like CodeMirror or Prism.js)
- Error detection on the fly (invalid JSON shows red lines and error messages)
- Auto-format & minify buttons to quickly clean JSON or compress it
- Tree view & collapsible nodes for easy navigation in nested JSON
- Drag-and-drop rearrangement for arrays and objects

### 2.2 Data Visualization
- Table view for arrays of objects (like spreadsheet view)
- Expandable/collapsible nodes for large JSON
- Inline JSON key search & filter
- Highlight matching brackets & keys

### 2.3 Developer-Friendly Tools
- Copy/Paste individual nodes or entire JSON
- Undo/Redo support using local JS state
- Compare JSONs side by side (diff view purely on frontend)
- Download JSON as .json file
- Export tabular structure as PDF/CSV
- Keyboard shortcuts for navigation, collapsing, formatting

### 2.4 Data Search Tool
- Advanced search functionality to query and filter data within JSON
- Search results highlighting and navigation
- Support for complex search patterns and filters

### 2.5 Customization & UI Enhancements
- Dark/light mode toggle
- Resizable panels: editor, tree view, table view
- Custom themes for syntax highlighting
- Responsive design: works well on desktop and tablets
- Micro-interactions for enhanced A11Y and UX (hover effects, focus states, smooth transitions)

### 2.6 Extra Frontend-Only Edge Features
- JSON Schema preview: validate keys/types visually (no backend required)
- Local storage auto-save: saves JSON in browser memory
- Drag-and-drop JSON file upload from local system
- Inline explanations: show hover tooltips for JSON types (string, number, array, object)

### 2.7 Accessibility & Usability
- Tooltips for all icon-only controls with descriptive labels
- Full keyboard navigation support
- ARIA labels and roles for screen reader compatibility
- Focus indicators and skip links
- High contrast mode support

### 2.8 SEO Optimization
- Semantic HTML structure with proper heading hierarchy
- Meta tags for description, keywords, and Open Graph
- Structured data markup for tool description
- Optimized page title and meta descriptions

### 2.9 Additional Pages
- Landing page at '/': introduction to JSONotations, key features overview, call-to-action to start editing
- Settings page: user preferences, theme selection, editor configurations
- Help page: user guide, feature documentation, usage instructions
- FAQ page: common questions and troubleshooting tips with at least 3 FAQs for each tool feature

## 3. Design Requirements

### 3.1 Typography
- Primary font: Geist for UI text and headings
- Monospace font: Geist Mono for code editor and JSON display

### 3.2 Color Palette
- Update the application color scheme to align with JSONotations website UI
- Ensure sufficient contrast ratios for accessibility compliance
- Provide distinct color variations for dark and light modes

### 3.3 Branding
- Application icon: generate a new icon that aligns with the JSONotations brand identity

## 4. Project Documentation

### 4.1 TODO.md
- Create a TODO.md file listing future feature ideas (non-backend)
- Include planned enhancements and improvements for the application

### 4.2 README.md
- Create a README.md file with project overview
- Include usage instructions and setup guide
- Document key features and capabilities

### 4.3 CONTRIBUTING.md
- Create a CONTRIBUTING.md file with contribution guidelines
- Include code style requirements and pull request process

### 4.4 Rebuild Prompts Documentation
- Create a file in docs/ directory
- Include prompts to rebuild this application
- Format the prompts following the example structure:
  - Application description and key features
  - Step-by-step implementation instructions
  - Technical requirements and constraints
  - Note about prompt refinement from original versions