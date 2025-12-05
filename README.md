# EsriMap - React 16 Application

A React 16 application featuring an interactive Esri ArcGIS map with accessible UI for exploring Yorkshire and The Humber region, major cities, and regional boundaries.

## Features

### Interactive Map
- **Esri ArcGIS Maps**: Built with the latest ArcGIS JavaScript API for interactive mapping
- **Yorkshire and The Humber Mapping**: 
  - Map centered on Yorkshire and The Humber region (coordinates: 53.96°N, 1.22°W)
  - Regional boundaries displayed with a solid dark outline for clear visibility
  - Boundary data sourced from UK Planning Data (Open Government Licence v3.0)

### City Markers
Interactive markers for major cities in the region:
- **Leeds** - Largest city with vibrant cultural scene and shopping district
- **Sheffield** - Major city known for steel heritage and research institutions
- **Bradford** - Historic textile city with multicultural heritage
- **York** - Historic walled city famous for medieval architecture
- **Kingston upon Hull** - Major port city with maritime heritage
- **Wakefield** - Cathedral city and West Yorkshire administrative center

Click any city marker to view detailed information about that city.

### Accessibility Features (WCAG AA Standards)
- **Keyboard Navigation**:
  - Arrow keys to pan the map
  - `+` or `=` to zoom in, `-` to zoom out
  - `Escape` to close information panels
- **Screen Reader Support**:
  - Semantic HTML structure
  - ARIA labels for interactive elements
  - Dialog roles for information panels
  - Comprehensive alt text
- **Visual Accessibility**:
  - High contrast mode support
  - Focus indicators for keyboard navigation
  - Respects `prefers-reduced-motion` user preference
  - Large touch targets for interactive elements
  - Sufficient color contrast ratios
- **Help Panel**: Built-in navigation guide accessible via expandable details element

## Prerequisites

- Node.js >= 12.0.0
- npm >= 6.0.0

## Project Setup

This project uses:
- **React 16.13.1** - UI library
- **Webpack 5** - Module bundler
- **Babel 7** - JavaScript compiler
- **ArcGIS Core JavaScript API** - Esri mapping library
- **Webpack Dev Server** - Development server with hot reload

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

The application will open automatically at `http://localhost:3000`.

The dev server supports hot module reloading - changes will automatically reload in the browser.

## Build

Create a production build:

```bash
npm run build
```

Output will be generated in the `dist/` directory.

## Project Structure

```
esrimap/
├── public/
│   └── index.html                  # HTML template with Esri CSS
├── src/
│   ├── components/
│   │   ├── EsriMap.js             # Main map component
│   │   └── EsriMap.css            # Map styling with accessibility
│   ├── data/
│   │   └── regionData.js          # Region and city data
│   ├── index.js                   # Application entry point
│   ├── index.css                  # Global styles
│   ├── App.js                     # Root React component
│   └── App.css                    # App component styles
├── package.json                    # Project dependencies and scripts
├── webpack.config.js              # Webpack configuration
├── .babelrc                       # Babel configuration
└── .gitignore                     # Git ignore rules
```

## Data Sources

- **Regional Boundaries**: [UK Planning Data - Yorkshire and The Humber](https://www.staging.planning.data.gov.uk/entity/30100002)
  - Format: GeoJSON
  - License: Open Government Licence v3.0
  - Contains OS data © Crown copyright and database right 2025

- **City Coordinates**: Standard geographic coordinates for major UK cities

## Supported Browsers

This project uses modern JavaScript and CSS features. It supports all modern browsers including:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Accessibility

This application follows WCAG 2.1 AA accessibility guidelines. Users can:
- Navigate using keyboard only
- Access all features with screen readers
- Use high contrast mode
- Disable animations if preferred
- Access navigation help via the built-in help panel

## License

This project uses data licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)
