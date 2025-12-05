# Yorkshire & Humber Interactive Map

A modern, mobile-first React application using Esri ArcGIS for interactive mapping of the Yorkshire and The Humber region with city markers and boundary visualization.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Architecture](#architecture)
- [Development](#development)
- [Accessibility](#accessibility)
- [Mobile-First Design](#mobile-first-design)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Configuration](#configuration)

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17.1 or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
cd /Users/denissbar/Git/YW/esrimap

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000` with hot module reloading enabled.

### Build for Production

```bash
npm run build
```

## ✨ Features

### Interactive Map
- **Esri ArcGIS Integration** - Powered by @arcgis/core library
- **Vector Basemap** - Streets vector tiles for better readability
- **Region Boundary** - Teal dashed boundary outline for Yorkshire and The Humber
- **City Markers** - Blue markers for 6 major cities with clickable popups

### Cities Included
- **Leeds** - Largest city in the region
- **Sheffield** - Major commercial and research hub
- **Bradford** - Historic textile city with cultural heritage
- **York** - Historic walled city with medieval architecture
- **Kingston upon Hull** - Major port city with maritime heritage
- **Wakefield** - Cathedral city and administrative center

### Keyboard Navigation
- **Arrow Keys** - Pan the map (Up, Down, Left, Right)
- **+ or =** - Zoom in
- **-** - Zoom out
- **Escape** - Close information popup

### Touch Gestures (Mobile)
- **Pinch to Zoom** - Multi-finger pinch for zooming
- **Pan** - Two-finger drag to move the map
- **Double Tap** - Standard zoom behavior

### Accessibility Features
- **WCAG AA Compliant** - High contrast support
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Semantic HTML structure
- **Reduced Motion** - Respects prefers-reduced-motion
- **Dark Mode** - Supports system dark mode preference
- **Touch Targets** - 48px minimum on mobile devices

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   └── EsriMap.js          # Main map component
├── data/
│   ├── regionData.js       # Cities and region center coordinates
│   └── boundaryData.js     # Fallback boundary polygon
├── App.js                  # Root component
└── index.js                # Application entry point
```

### Map Initialization

1. **Dynamic Module Loading** - Esri modules loaded asynchronously
2. **Boundary Loading** - Fetches from planning.data.gov.uk with local fallback
3. **Auto-Fit View** - Automatically zooms to boundary extent with animation
4. **Layers Organization**:
   - Boundary Layer - Region outline visualization
   - Cities Layer - City marker collection

### Responsive Behavior

- **Mobile (<768px)** - Full-width layout, bottom docking
- **Tablet (768-1024px)** - Side panels, increased spacing
- **Desktop (>1024px)** - Full optimization, enhanced UI

## 💻 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Build with Webpack
webpack --mode development
```

### Hot Module Reloading
The development server includes automatic reloading when files change. No manual refresh needed.

### Code Quality

All `console.log()` statements have been removed for cleaner production builds. Only `console.error()` and `console.warn()` remain for debugging critical issues.

## ♿ Accessibility

The application meets WCAG 2.1 AA standards:

### Visual
- High contrast color schemes
- Minimum 48px touch targets
- Readable font sizes (16px minimum on inputs)
- Clear focus indicators

### Interactive
- Full keyboard navigation support
- Semantic HTML structure
- ARIA labels and descriptions
- Popup dismissal with Escape key

### Preferences
- Respects `prefers-color-scheme` (dark mode)
- Respects `prefers-reduced-motion` (no animations)
- Respects `prefers-contrast` (high contrast mode)

### Help
- Built-in navigation help panel
- Keyboard shortcut reference
- Accessible details/summary elements

## 📱 Mobile-First Design

### Strategy
Built ground-up for mobile, progressively enhanced for larger screens.

### Responsive Breakpoints

| Size | Use Case | Key Features |
|------|----------|-------------|
| <600px | Mobile phones | Full-width, bottom popups, compact spacing |
| 600-768px | Small tablets | Optimized padding, readable text |
| 768-1024px | Tablets | Side panels possible, increased spacing |
| >1024px | Desktops | Maximum optimization, enhanced UI |

### Touch Optimization
- Larger buttons and interactive areas
- Disabled hover effects on touch devices
- Smooth pinch-to-zoom (native browser)
- Better landscape orientation handling

### Viewport Optimization
- `viewport-fit=cover` - Handles notches (iPhone X+)
- `100dvh` - Dynamic viewport height for mobile browsers
- Apple web app meta tags - Better PWA experience

## 📁 Project Structure

### Source Files

```
src/
├── components/
│   ├── EsriMap.js         # Main map component (20KB)
│   └── EsriMap.css        # Map styling with responsive media queries
├── data/
│   ├── regionData.js      # Yorkshire & Humber coordinates
│   └── boundaryData.js    # Fallback boundary polygon
├── App.js                 # Root component
├── index.js               # Bootstrap file
└── App.css                # Global styles
```

### Configuration Files

```
.babelrc               # Babel configuration for transpilation
webpack.config.js      # Webpack bundler configuration
package.json           # Dependencies and scripts
.gitignore            # Git exclude patterns
public/
├── index.html         # HTML template with mobile optimizations
└── favicon.ico        # App icon
```

### Documentation

- `README.md` - This file
- `MOBILE_FIRST_APPROACH.md` - Detailed mobile-first implementation
- `ACCESSIBILITY.md` - WCAG compliance details
- `QUICKSTART.md` - Quick reference guide

## 🔧 Technologies

### Core
- **React 16.13.1** - UI framework
- **Node.js 18.17.1** - JavaScript runtime
- **npm** - Package manager

### Build & Development
- **Webpack 5** - Module bundler
- **Babel 7** - JavaScript transpiler
- **CSS Loader** - CSS module handling
- **Webpack Dev Server** - Development server with HMR

### Mapping
- **@arcgis/core (Latest)** - Esri ArcGIS JavaScript API
- **WGS84 (WKID 4326)** - Spatial reference system

### Data Sources
- **planning.data.gov.uk** - Official boundary GeoJSON (with fallback)
- **Embedded coordinates** - City locations and region center

## ⚙️ Configuration

### MapView Options

```javascript
{
  zoom: 8,                              // Initial zoom level
  popup: {
    autoOpenEnabled: true,              // Auto-open on marker click
    dockEnabled: true,                  // Dock instead of floating
    dockOptions: {
      position: 'bottom-right',         // Desktop position
      breakpoint: 768                   // Mobile breakpoint
    }
  },
  constraints: {
    minZoom: 5,                         // Prevent over-zooming
    maxZoom: 18
  }
}
```

### Styling

**Boundary Outline**
- Color: Teal `[28, 150, 176]`
- Width: 3px
- Style: Dashed
- Transparent fill: 0% opacity

**City Markers**
- Color: Blue `[55, 122, 171, 0.8]`
- Size: 14px
- Outline: 2px white border
- PopupTemplate: Title + description

## 🐛 Troubleshooting

### Map Not Loading
1. Check internet connection (GeoJSON fetch)
2. Verify browser console for errors
3. Clear cache: Cmd+Shift+Delete (Chrome) or Cmd+Opt+E (Safari)

### Markers Not Visible
1. Ensure zoom level includes city coordinates
2. Check if layer is added to map
3. Verify PopupTemplate configuration

### Performance Issues
1. Close developer tools (can impact performance)
2. Check for large number of listeners
3. Reduce animation duration in landscape mode

## 📝 License

This project is part of the Yorkshire & Humber initiative.

## 👤 Support

For issues, questions, or contributions, please refer to the project documentation or contact the development team.

---

**Last Updated:** December 1, 2025
**Node.js Version:** 18.17.1+
**React Version:** 16.13.1
**Build Tool:** Webpack 5
