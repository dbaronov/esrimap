# POC Component - Esri Map Implementation

## Overview

This Proof of Concept (POC) implements an interactive Esri ArcGIS map component for exploring Yorkshire and The Humber region with full WCAG AA accessibility compliance.

## Implementation Details

### 1. Map Configuration

**Location**: Yorkshire and The Humber, England
- **Center Coordinates**: 53.963°N, 1.221°W
- **Initial Zoom Level**: 8
- **Basemap**: Streets Vector

### 2. Regional Boundaries

**Data Source**: UK Planning Data (Open Government Licence v3.0)
- **Format**: GeoJSON
- **URL**: https://www.staging.planning.data.gov.uk/entity/30100002.geojson
- **Visualization**: Solid dark outline (RGB: 68, 68, 68) with 3px stroke width
- **Coverage**: Complete regional boundary polygon

### 3. City Markers

Six major cities are displayed with interactive markers:

| City | Coordinates | Population* |
|------|-------------|------------|
| Leeds | 53.8008°N, 1.5491°W | 800k+ |
| Sheffield | 53.3811°N, 1.4701°W | 580k+ |
| Bradford | 53.7952°N, 1.7558°W | 350k+ |
| York | 53.9581°N, 1.0873°W | 200k+ |
| Kingston upon Hull | 53.7444°N, 0.3368°W | 260k+ |
| Wakefield | 53.6832°N, 1.4977°W | 330k+ |

**Marker Styling**:
- **Color**: Slate Blue (RGB: 55, 122, 171, 80% opacity)
- **Size**: 12px
- **Outline**: White, 2px stroke
- **Interaction**: Clickable to reveal city information panel

### 4. User Interaction

#### Mouse/Touch
- **Click city marker**: Display information panel
- **Pan**: Click and drag on map
- **Zoom**: Mouse wheel or pinch gesture
- **Close panel**: Click close button (×) or outside panel

#### Keyboard
- **Arrow Keys**: Pan the map (up/down/left/right)
- **+ or =**: Zoom in (1.5x scale)
- **- Key**: Zoom out (1.5x scale)
- **Escape**: Close information panels
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and interactive elements

### 5. Accessibility Features

#### WCAG 2.1 AA Compliance

**Semantic HTML**:
- Proper heading hierarchy (`<h2>` for city names)
- Semantic button elements
- List structure for navigation help
- Details/summary elements for expandable content

**ARIA Implementation**:
- `role="region"` on map container with descriptive `aria-label`
- `role="dialog"` on information panels
- `aria-modal="true"` for modal dialogs
- `aria-labelledby` linking dialog to title
- `aria-label` on all interactive controls
- Keyboard-only accessible labels via `title` attributes

**Focus Management**:
- Visible focus indicators (3px blue outline)
- Focus ring with contrasting colors
- Focus outline offset for better visibility
- All interactive elements are keyboard accessible
- Logical tab order through controls

**Color & Contrast**:
- Minimum 7:1 contrast ratio for text on backgrounds
- Dark boundaries (RGB: 68, 68, 68) against light backgrounds
- Blue focus indicators (RGB: 0, 102, 204) with sufficient contrast
- High contrast mode support via `@media (prefers-contrast: more)`

**Motion & Animation**:
- Respects `@media (prefers-reduced-motion: reduce)`
- Smooth transitions disabled for users who prefer reduced motion
- Slide-up animation (300ms) has reduced-motion alternative

**Screen Reader Support**:
- Page title identifies the application purpose
- Region landmark with descriptive label
- Dialog announcements with title associations
- Help content is available and descriptive
- Interactive element labels are clear and concise
- No empty buttons or unlabeled controls

#### User Experience Features
- **Help Panel**: Expandable details element with keyboard navigation guide
- **Navigation Instructions**: Clear visual guide for all interaction methods
- **Error Prevention**: Escape key to dismiss modals
- **Feedback**: Click feedback, focus indicators, smooth transitions
- **Print Styles**: Help panel hidden in print mode

### 6. Technical Stack

**Core Libraries**:
- React 16.13.1 - Component framework
- @arcgis/core - Esri mapping library
- esri-loader - Module loading utility (deprecated notice for future migration)

**Build Tools**:
- Webpack 5 - Module bundler
- Babel 7 - JavaScript transpiler
- Webpack Dev Server - Hot reload development

**Styling**:
- CSS3 with media queries for accessibility
- Flexbox for responsive layout
- CSS animations with prefers-reduced-motion support

### 7. Component Structure

**Files**:
- `src/components/EsriMap.js` - Main map component (169 lines)
- `src/components/EsriMap.css` - Styling with accessibility features (320 lines)
- `src/data/regionData.js` - Region and city data
- `src/App.js` - Root component wrapper

**Component Props**: None (self-contained POC)

**State Management**:
- `selectedCity` - Currently selected city info
- `mapReady` - Map initialization status

**Refs**:
- `mapDiv` - DOM container for Esri map
- `mapView` - Esri MapView instance

### 8. Data Licensing

- **Regional Boundaries**: Open Government Licence v3.0
- **Contains OS data**: © Crown copyright and database right 2025
- **Source Attribution**: UK Planning Data via planning.data.gov.uk

### 9. Browser Support

**Supported**:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Not Supported**:
- IE11 and below (no support for modern JavaScript/CSS)

### 10. Performance Considerations

- **Lazy Loading**: Esri modules loaded dynamically on component mount
- **Bundle Size**: @arcgis/core adds ~500KB gzipped
- **Map Rendering**: Handled by Esri's optimized renderer
- **Event Throttling**: Keyboard events handled efficiently with native event listeners
- **Memory**: View cleanup on component unmount prevents leaks

### 11. Future Enhancement Suggestions

**Functionality**:
- Add more cities and landmarks
- Implement search/filter functionality
- Add historical information about regions
- Layer toggling (streets, satellite, terrain)
- Drawing tools for annotations

**Accessibility**:
- Add audio descriptions for regions
- Implement voice control
- Add contrast enhancement toggle
- Language selection (i18n)

**UX**:
- Responsive design for mobile
- Touch gesture support (pinch-zoom, two-finger pan)
- Save map state to local storage
- Share map view via URL
- Print functionality

**Data**:
- Real-time data integration
- Population statistics
- Economic indicators
- Tourism information
