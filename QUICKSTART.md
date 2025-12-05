# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The app automatically opens at `http://localhost:3000`

### 3. Explore the Map!
- **Pan**: Use arrow keys or click and drag
- **Zoom**: Press `+` to zoom in, `-` to zoom out
- **Click Cities**: Click any blue marker to see city information
- **Close Panel**: Press `Escape` or click the × button
- **Get Help**: Click "Map Navigation Help" for all keyboard shortcuts

---

## 📍 What You'll See

An interactive map showing:
- **Yorkshire and The Humber region** centered on the screen
- **Regional boundaries** outlined in dark gray
- **6 major cities** marked with blue dots:
  - Leeds (northwest)
  - Sheffield (south-center)
  - Bradford (north)
  - York (northeast)
  - Kingston upon Hull (east)
  - Wakefield (center)

Click any city to see its description!

---

## ♿ Accessibility Features

This map is fully accessible. Try:
- **Keyboard only**: Navigate entirely with arrow keys, +/-, and Escape
- **Screen reader**: All content is properly labeled for assistive technology
- **High contrast**: Works great with your OS high contrast mode
- **Motion**: Respects your motion preferences

---

## 🔨 Available Commands

```bash
npm start       # Run dev server with auto-open (http://localhost:3000)
npm run dev     # Run dev server without auto-open
npm run build   # Create production build in dist/
```

---

## 📚 Documentation

- **README.md** - Full project documentation
- **ACCESSIBILITY.md** - WCAG 2.1 AA compliance details
- **POC_IMPLEMENTATION.md** - Technical architecture
- **COMPLETION_SUMMARY.md** - Project status and deliverables

---

## 🌐 Browser Support

Works on:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Any modern browser with ES6+ support

---

## 🎯 Next Steps

### To Extend the Application:
1. Add more cities in `src/data/regionData.js`
2. Customize map styling in `src/components/EsriMap.css`
3. Add new features in `src/components/EsriMap.js`

### To Deploy:
1. Run `npm run build` to create production bundle
2. Deploy the `dist/` folder to your server
3. Update ArcGIS API configuration if needed

### To Test Accessibility:
1. Navigate with keyboard only
2. Use screen reader (JAWS, NVDA, or VoiceOver)
3. Enable high contrast mode in OS settings
4. Review ACCESSIBILITY.md for compliance details

---

## 💡 Tips

- Use **Arrow Keys** for smooth panning
- Press **Escape** anytime to close popups
- Check **Map Navigation Help** (bottom-left) for all shortcuts
- All city info is **generic** - feel free to customize!

---

## ❓ Need Help?

See the **Map Navigation Help** panel in the bottom-left corner of the app for keyboard shortcuts and tips.

---

Happy exploring! 🗺️
