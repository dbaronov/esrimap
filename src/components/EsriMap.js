import React, { useEffect, useRef, useState } from 'react';
import { yorkshireHumberCenter, cities } from '../data/regionData';
import { yorkshireHumberBoundaryDetailed } from '../data/boundaryData';
import './EsriMap.css';

const EsriMap = () => {
  const mapDiv = useRef(null);
  const mapView = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let view = null;

    // Dynamically import Esri modules
    const initMap = async () => {
      try {
        const { default: Map } = await import('@arcgis/core/Map');
        const { default: MapView } = await import('@arcgis/core/views/MapView');
        const { default: FeatureLayer } = await import('@arcgis/core/layers/FeatureLayer');
        const { default: Graphic } = await import('@arcgis/core/Graphic');
        const { default: GraphicsLayer } = await import('@arcgis/core/layers/GraphicsLayer');
        const { Polygon, Point } = await import('@arcgis/core/geometry');
        const { default: SimpleFillSymbol } = await import('@arcgis/core/symbols/SimpleFillSymbol');
        const { default: SimpleLineSymbol } = await import('@arcgis/core/symbols/SimpleLineSymbol');
        const { default: SimpleMarkerSymbol } = await import('@arcgis/core/symbols/SimpleMarkerSymbol');
        const { default: PopupTemplate } = await import('@arcgis/core/PopupTemplate');

        if (!mapDiv.current) return;

        // Create the map
        const map = new Map({
          basemap: 'streets-vector'
        });

        // Create the view with popup enabled and mobile-first configuration
        view = new MapView({
          container: mapDiv.current,
          map: map,
          center: [yorkshireHumberCenter.longitude, yorkshireHumberCenter.latitude],
          zoom: 8,
          popup: {
            autoOpenEnabled: true,
            dockEnabled: true,
            dockOptions: {
              // Mobile-first: dock at bottom for small screens
              position: window.innerWidth < 768 ? 'bottom' : 'bottom-right',
              breakpoint: 768 // Breakpoint for responsive docking
            }
          },
          // Mobile optimizations
          constraints: {
            minZoom: 5, // Prevent over-zooming on mobile
            maxZoom: 18
          }
        });

        mapView.current = view;

        // Wait for view to be ready
        await view.when();

        // Try to load boundary from GeoJSON URL
        let boundaryData = null;
        try {
          const response = await fetch('https://www.staging.planning.data.gov.uk/entity/30100002.geojson');
          if (response.ok) {
            boundaryData = await response.json();
          }
        } catch (boundaryError) {
          console.warn('Could not load boundary from URL:', boundaryError);
        }

        // Use fallback if URL fetch failed
        if (!boundaryData) {
          boundaryData = {
            type: 'FeatureCollection',
            features: [yorkshireHumberBoundaryDetailed]
          };
        }

        // Create a graphics layer for the boundary
        const boundaryLayer = new GraphicsLayer({
          title: 'Yorkshire and The Humber Region'
        });

        // Define the fill and outline symbols
        const outlineSymbol = new SimpleLineSymbol({
          color: [28, 150, 176, 1], // Vibrant teal
          width: 1.75,
          style: 'dash'
        });

        const fillSymbol = new SimpleFillSymbol({
          color: [255, 255, 255, 0.0],
          outline: outlineSymbol
        });

        // Process GeoJSON features
        const features = boundaryData.features || [boundaryData];
        
        features.forEach((feature, index) => {
          if (feature.geometry) {
            let geometry = null;

            try {
              // Handle different geometry types
              if (feature.geometry.type === 'Polygon') {
                geometry = new Polygon({
                  rings: feature.geometry.coordinates[0],
                  spatialReference: { wkid: 4326 }
                });
              } else if (feature.geometry.type === 'MultiPolygon') {
                // For MultiPolygon, create a polygon from the first polygon
                if (feature.geometry.coordinates.length > 0) {
                  // MultiPolygon has nested arrays - we need the first polygon's rings
                  geometry = new Polygon({
                    rings: feature.geometry.coordinates[0],
                    spatialReference: { wkid: 4326 }
                  });
                }
              }

              if (geometry) {
                const graphic = new Graphic({
                  geometry: geometry,
                  symbol: fillSymbol,
                  attributes: feature.properties || {}
                });
                boundaryLayer.add(graphic);
              }
            } catch (err) {
              console.error('Error processing feature:', err);
            }
          }
        });

        map.add(boundaryLayer);

        // Fit the view to the boundary extent with padding
        if (boundaryLayer.graphics.length > 0) {
          try {
            const firstGraphic = boundaryLayer.graphics.getItemAt(0);
            if (firstGraphic && firstGraphic.geometry && firstGraphic.geometry.extent) {
              // Use goTo to zoom to the boundary extent with some padding
              view.goTo(
                {
                  target: firstGraphic.geometry.extent.expand(1.2) // Expand by 20% for padding
                },
                {
                  duration: 1000 // 1 second animation
                }
              ).then(() => {
              }).catch((err) => {
                console.warn('Could not zoom to boundary extent:', err);
              });
            }
          } catch (err) {
            console.warn('Error fitting boundary to view:', err);
          }
        }

        // Add city markers with popup templates
        const citiesLayer = new GraphicsLayer({
          title: 'Cities in Yorkshire and The Humber'
        });
        
        cities.forEach((city) => {
          const point = new Point({
            longitude: city.longitude,
            latitude: city.latitude,
            spatialReference: { wkid: 4326 }
          });

          const markerSymbol = new SimpleMarkerSymbol({
            color: [55, 122, 171, 0.8],
            size: 14,
            outline: {
              color: [255, 255, 255, 1],
              width: 2
            }
          });

          // Create popup template for the city
          const popupTemplate = new PopupTemplate({
            title: '{title}',
            content: [
              {
                type: 'text',
                text: '{description}'
              }
            ]
          });

          const graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
              title: city.name,
              description: city.description,
              id: city.id
            },
            popupTemplate: popupTemplate
          });

          citiesLayer.add(graphic);
        });

        map.add(citiesLayer);

        setMapReady(true);
      } catch (err) {
        console.error('Error loading Esri modules:', err);
      }
    };

    initMap();

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!mapReady) return;

      const view = mapView.current;
      if (!view) return;

      const scale = 1.5;
      const panDistance = (view.extent.height / view.height) * 50;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          view.center = {
            latitude: view.center.latitude + panDistance,
            longitude: view.center.longitude
          };
          break;
        case 'ArrowDown':
          event.preventDefault();
          view.center = {
            latitude: view.center.latitude - panDistance,
            longitude: view.center.longitude
          };
          break;
        case 'ArrowLeft':
          event.preventDefault();
          view.center = {
            latitude: view.center.latitude,
            longitude: view.center.longitude - panDistance
          };
          break;
        case 'ArrowRight':
          event.preventDefault();
          view.center = {
            latitude: view.center.latitude,
            longitude: view.center.longitude + panDistance
          };
          break;
        case '+':
        case '=':
          event.preventDefault();
          view.zoom *= scale;
          break;
        case '-':
        case '_':
          event.preventDefault();
          view.zoom /= scale;
          break;
        case 'Escape':
          event.preventDefault();
          // Close the popup if it's open
          if (view.popup && view.popup.visible) {
            view.popup.close();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mapReady]);

  // Handle responsive popup docking on window resize
  useEffect(() => {
    if (!mapReady) return;

    const view = mapView.current;
    if (!view) return;

    const handleResize = () => {
      // Update popup position based on window width
      if (window.innerWidth < 768) {
        view.popup.dockOptions.position = 'bottom';
      } else {
        view.popup.dockOptions.position = 'bottom-right';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mapReady]);

  return (
    <div className="esri-map-container">
      <div
        ref={mapDiv}
        className="esri-map"
        role="region"
        aria-label="Interactive map of Yorkshire and The Humber region showing major cities with clickable information windows"
        tabIndex="0"
      />

      {/* Accessibility help panel */}
      <div className="accessibility-help" role="complementary" aria-label="Map navigation instructions">
        <details>
          <summary>Map Navigation Help</summary>
          <ul>
            <li><kbd>Arrow Keys</kbd> - Pan the map</li>
            <li><kbd>+</kbd> or <kbd>=</kbd> - Zoom in</li>
            <li><kbd>-</kbd> - Zoom out</li>
            <li><kbd>Click City Marker</kbd> - Open city information window</li>
            <li><kbd>Escape</kbd> - Close information window</li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default EsriMap;
