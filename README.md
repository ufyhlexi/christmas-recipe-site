# 🎄 Recipes for Christmas

A modern, full-featured recipe website for Christmas recipes built with Next.js, React, and TypeScript. This application fetches recipe data from a REST API and displays beautiful recipe cards with categories, search functionality, ratings, and comments.

## ✨ Features

- 🍰 **Recipe Gallery** - Browse through a collection of Christmas recipes
- 🔍 **Search Functionality** - Find recipes by name or ingredients
- 📂 **Category Filtering** - Filter recipes by categories
- ⭐ **Rating System** - Rate recipes and view average ratings
- 💬 **Comments** - Add and view comments for each recipe
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful, clean interface built with Tailwind CSS
- 🔄 **Hybrid Data Approach** - Combines API data with local metadata for optimal performance

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Next.js 16.0.1** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Icons** - Icon library for UI elements
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation
- **TanStack Query** - Data fetching and caching
- **React Hot Toast** - Toast notifications

### Backend Integration
- **Axios** - HTTP client for API requests
- **REST API** - External API for recipe data storage and retrieval

## 📁 Project Structure

```
christmas-recipe-site/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── recipe/[id]/       # Recipe detail page
│   ├── category/[slug]/   # Category page
│   └── ...
├── components/            # React components
│   ├── RecipeCard.tsx    # Recipe card component
│   ├── RecetionsGrid.tsx # Recipe grid layout
│   ├── SearchBar.tsx     # Search functionality
│   ├── CategoryList.tsx  # Category filtering
│   ├── RatingStars.tsx   # Rating display
│   ├── CommentForm.tsx   # Comment submission
│   ├── CommentList.tsx   # Comments display
│   └── ...
├── lib/                   # Utility functions and types
│   ├── api.ts            # API service functions
│   ├── recipeUtils.ts    # Recipe data merging utilities
│   └── types.ts          # TypeScript type definitions
├── data/                  # Local data files
│   └── recipes.json      # Recipe metadata (difficulty, time)
├── backend/               # Backend scripts
│   ├── sendRecipes.ts    # Script to send recipes to API
│   ├── getRecipes.ts     # Script to fetch recipes from API
│   └── README.md         # Backend documentation
└── public/               # Static assets
    └── ...
```

## 🏗️ Architecture

### Hybrid Data Approach

The application uses a hybrid approach to combine data from two sources:

1. **API Data** - Main recipe data (title, description, ingredients, instructions, etc.) is fetched from the REST API
2. **Local Metadata** - Additional metadata (difficulty, cooking time) is stored locally in `recipes.json` and merged with API data

This approach provides:
- ✅ Real-time data updates from the API
- ✅ Additional metadata that may not be available in the API
- ✅ Better performance with local metadata caching
- ✅ Flexibility to update metadata without API changes

### API Integration

- **Base URL**: `https://grupp1-xjvta.reky.se`
- **Endpoints**:
  - `GET /recipes` - Fetch all recipes
  - `GET /recipes/{id}` - Fetch single recipe
  - `POST /recipes` - Create new recipe
  - `PATCH /recipes/{id}` - Update recipe
  - `DELETE /recipes/{id}` - Delete recipe
  - `GET /clear` - Clear all recipes (development)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd christmas-recipe-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📝 Backend Scripts

The `backend/` directory contains utility scripts for managing recipe data:

### Send Recipes to API

```bash
cd backend
npm run send
```

This script:
- Reads recipes from `data/recipes.json`
- Checks for existing recipes to avoid duplicates
- Creates new recipes or updates existing ones
- Prevents duplicate entries

### Fetch Recipes from API

```bash
cd backend
npm start
```

This script fetches all recipes from the API and displays them.

For more information, see [backend/README.md](./backend/README.md).

## 🎨 Key Components

### RecipeCard
Displays a single recipe with image, title, cooking time, and difficulty level.

### RecetionsGrid
Grid layout component that fetches recipes from API and merges them with local metadata.

### SearchBar
Real-time search functionality to filter recipes by name or keywords.

### CategoryList
Category filtering component to browse recipes by category.

### RatingStars
Interactive rating display and input component.

### CommentForm & CommentList
Comment submission and display functionality.

## 🔧 Configuration

### API Configuration

API base URL is configured in `lib/api.ts`:

```typescript
const API_BASE_URL = "https://grupp1-xjvta.reky.se";
```

### Data Merging

Recipe data merging is handled in `lib/recipeUtils.ts`, which:
- Fetches recipes from API
- Loads metadata from local JSON
- Merges data by recipe title (case-insensitive)
- Provides fallback values for missing metadata

## 🚀 Deployment

### Netlify (Recommended)

This project is optimized for deployment on [Netlify](https://www.netlify.com/). Netlify provides excellent support for Next.js applications with automatic builds and deployments.

#### Deployment Steps:

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Automatic Configuration**
   - Netlify will automatically detect Next.js project
   - Build settings will be auto-configured (no manual setup needed)
   - The `@netlify/plugin-nextjs` plugin will be automatically installed

4. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your project automatically
   - Your site will be live after the build completes

#### Netlify Features:

- ✅ **Automatic Deployments** - Deploys on every push to main branch
- ✅ **Preview Deployments** - Creates preview URLs for pull requests
- ✅ **Next.js Runtime** - Full support for Next.js App Router and Server Components
- ✅ **API Integration** - External API calls work perfectly
- ✅ **Hybrid Data Approach** - Both API data and local metadata work correctly
- ✅ **Free SSL** - Automatic HTTPS certificates
- ✅ **CDN** - Global content delivery network

## 📦 Dependencies

### Production Dependencies
- `next` - Next.js framework
- `react` & `react-dom` - React library
- `axios` - HTTP client
- `react-icons` - Icon library
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@tanstack/react-query` - Data fetching
- `react-hot-toast` - Notifications
- `date-fns` - Date utilities

### Development Dependencies
- `typescript` - TypeScript compiler
- `tailwindcss` - CSS framework
- `eslint` - Code linting
- `@types/*` - TypeScript type definitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Recipe data provided by the API
- Icons from React Icons
- Built with Next.js and React

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for Christmas recipes**
