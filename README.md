# Contemporary Arch Icons

A React + Redux Toolkit web app that explores contemporary architecture themes
using live data from the public Wikipedia API.

- Uses **React** for the component-based UI
- Uses **Redux Toolkit** for global state (selected theme, search term, results, favorites)
- Uses **AJAX** (`fetch`) to call the Wikipedia search API and render results into the DOM
- Lets the user:
  - Choose from curated contemporary architecture themes (Brutalism, parametric design, etc.)
  - Refine with a custom search term (e.g. "museum", "housing", a specific architect)
  - View search results from Wikipedia
  - Save favorites to a personal "studio board" stored in Redux state

## Tech

- React + Vite
- Redux Toolkit + React-Redux
- Modern CSS (no framework)
- Deployed by building with `npm run build` and hosting the `dist/` folder

## Scripts

```bash
npm install
npm run dev      # start dev server
npm run build    # production build in dist/
npm run preview  # preview built app locally
```
