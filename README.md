# Git Commit Visualization

A TypeScript React application that creates a GitHub-style visualization of git commit history. This project provides a heatmap visualization showing commit frequency over time, similar to GitHub's contribution graph.

## Features

- 📊 GitHub-style contribution heatmap
- 🎨 Color-coded commit intensity
- 📱 Responsive design
- 💪 Fully typed with TypeScript
- 🛠 Built with modern tools (Vite, React, TailwindCSS)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/milesburton/git-commit-viz.git
cd git-commit-viz
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/git-commit-viz/`

## Building

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

To deploy to GitHub Pages:
```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch of your repository.

## Preview

Once deployed (to your Github account) you can view the sample at: https://milesburton.github.io/git-commit-viz/ (replace my github with yours)

## Configuration

### Customizing the Visualization

The visualization can be customized by modifying the following files:

- `src/types/index.ts` - Type definitions
- `src/components/ContributionHeatmap.tsx` - Main visualization component
- `tailwind.config.js` - Styling configuration

### Environment Variables

The project uses the following environment variables:

```env
VITE_BASE_URL=/git-commit-viz/
```

## Project Structure

```
git-commit-viz/
├── src/
│   ├── components/
│   │   └── ContributionHeatmap.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .eslintrc.json
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by GitHub's contribution graph
- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)
