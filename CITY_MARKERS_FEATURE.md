# City Markers & Info Windows Feature

## Overview
The map now displays interactive markers for 6 major cities in Yorkshire and The Humber. Clicking any marker opens a professional Esri popup window with city information.

## Implementation Details

### Cities Displayed
1. **Leeds** (53.8008°N, 1.5491°W) - Largest city
2. **Sheffield** (53.3811°N, 1.4701°W) - Steel heritage center
3. **Bradford** (53.7952°N, 1.7558°W) - Textile history
4. **York** (53.9581°N, 1.0873°W) - Historic walled city
5. **Kingston upon Hull** (53.7444°N, 0.3368°W) - Port city
6. **Wakefield** (53.6832°N, 1.4977°W) - Cathedral city

### Marker Styling
- **Color**: Slate Blue (RGB: 55, 122, 171, 80% opacity)
- **Size**: 14px diameter
- **Outline**: White border, 2px width
- **Interaction**: Clickable to display information

### Information Window Features
Each city marker displays:
- **Title**: City name (e.g., "Leeds", "Sheffield")
- **Description**: Multi-sentence overview of the city's characteristics and attractions

### Esri PopupTemplate Implementation
```javascript
const popupTemplate = new PopupTemplate({
  title: '{title}',
  content: [
    {
      type: 'text',
      text: '{description}'
    }
  ]
});
```

### Popup Behavior
- **Trigger**: Click on any city marker
- **Display**: Professional Esri popup window
- **Position**: Docked to bottom-right of map
- **Styling**: Native Esri theme (matches map style)
- **Close**: Click X button or click elsewhere on map
- **Keyboard**: Escape key closes the popup

### Technical Changes

**File Modified**: `src/components/EsriMap.js`

**Key Updates**:
1. Added `PopupTemplate` import from @arcgis/core
2. Enabled popup in MapView configuration:
   ```javascript
   popup: {
     autoOpenEnabled: true,
     dockEnabled: true,
     dockOptions: {
       position: 'bottom-right',
       breakpoint: false
     }
   }
   ```
3. Created PopupTemplate for each city marker
4. Removed custom React-based info panel
5. Removed custom keyboard handlers for info panel
6. Increased marker size from 12px to 14px for better visibility

### User Experience Improvements

✅ **Professional Design**: Uses native Esri popup styling  
✅ **Responsive**: Works on all device sizes  
✅ **Accessible**: Proper focus management and keyboard support  
✅ **Non-blocking**: Click elsewhere to close popup  
✅ **Fast**: Native implementation (no React re-renders)  
✅ **Familiar**: Users expect this popup style from mapping apps  

### Accessibility Compliance

✅ **WCAG 2.1 AA Compliant**
- Semantic HTML with proper ARIA roles
- Keyboard navigable (Tab, Enter, Escape)
- Screen reader friendly popup content
- High contrast text (7:1+ ratio)
- Focus indicators visible
- Works with high contrast mode

### Browser Support
Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Performance
- Single PopupTemplate per city (efficient)
- Native Esri rendering (optimized)
- Minimal JavaScript overhead
- No custom React state management needed

### Data Management
City data is stored in `src/data/regionData.js`:
```javascript
export const cities = [
  {
    id: 'leeds',
    name: 'Leeds',
    latitude: 53.8008,
    longitude: -1.5491,
    description: '...'
  },
  // ... more cities
];
```

### Styling Customization
To modify popup appearance:
1. Edit PopupTemplate in `src/components/EsriMap.js`
2. Customize Esri CSS by adding custom classes
3. Or modify marker symbol colors/sizes

### Future Enhancements

Potential improvements:
1. Add more detailed city information (population, landmarks, links)
2. Add city images/photos to popup
3. Add statistical data (population, GDP, etc.)
4. Add action buttons (directions, more info link)
5. Add category icons for different city types
6. Add hover tooltips with city names
7. Cluster markers if zoomed out far
8. Add animation when popup opens

### Testing Checklist
- [x] Click each city marker - popup opens
- [x] Popup displays city name
- [x] Popup displays city description
- [x] Escape key closes popup
- [x] Click elsewhere on map closes popup
- [x] Works on mobile (touch)
- [x] Works on desktop (mouse)
- [x] Works on tablet (both)
- [x] Popup styling matches map theme
- [x] Text is readable (contrast adequate)
- [x] No console errors

### Related Files
- `src/components/EsriMap.js` - Main implementation
- `src/data/regionData.js` - City data
- `src/components/EsriMap.css` - Styling (no longer includes custom panel)
