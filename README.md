# JSONotations – Advanced Frontend JSON Editor

JSONotations is a premium, client-side JSON workspace designed for developers who demand superior visualization, security, and usability. It replaces basic online editors with a powerful, intuitive environment that works entirely in your browser.

## 🚀 Key Features

- **Interactive Editor**: Real-time syntax highlighting, error detection, and automatic formatting/minification.
- **Deep Visualization**:
  - **Tree View**: Navigate complex structures with collapsible, searchable nodes.
  - **Table View**: Analyze arrays of objects in a clean, spreadsheet-like interface.
  - **Visual Diff**: Compare two JSON sets side-by-side with highlighted changes.
- **Schema Inference**: Automatically generate and preview JSON Schema from your data.
- **Privacy First**: 100% client-side processing. Your data never leaves your browser.
- **Developer Tools**: Keyboard shortcuts, export to CSV/PDF, and drag-and-drop file support.
- **Premium UI**: Modern dark-mode aesthetic with micro-interactions and smooth animations.

## 🛠️ Technology Stack

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Editor**: CodeMirror 6

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/art70x/JSONotation.git

# Navigate to the project
cd JSONotation

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## ⌨️ Keyboard Shortcuts

- `Shift + Alt + F`: Format JSON
- `Ctrl + S`: Download JSON
- `Alt + 1-5`: Switch Editor Tabs (Editor, Tree, Table, Diff, Schema)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](https://github.com/art70x/JSONotation/blob/main/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is open source and available under the [MIT License](https://github.com/art70x/JSONotation/blob/main/LICENSE).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) – Provides the accessible, composable component system and design foundation that power the refined, production-grade UI.
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror) – Powers the core editing engine through CodeMirror 6’s modular architecture, enabling structured JSON parsing, real-time syntax validation, extensible behaviors, and high-performance rendering.
- [@unhead/react](https://github.com/unjs/unhead/tree/main/packages/react) – Enables reactive and scalable document head management for dynamic metadata, improving maintainability and SEO control.
- [Nuxpert](https://github.com/MFM-347/nuxpert) – Inspired the project’s architecture, CI workflow, formatting standards, and Vite configuration.
- [MeDo](https://medo.dev/) – Served as the original prototype foundation.

---

<p align="center">
  Made with ❤️ for the web development community
</p>
