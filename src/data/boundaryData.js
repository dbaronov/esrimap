// Yorkshire and The Humber boundary - simplified polygon outline
// Approximate corners of the region
export const yorkshireHumberBoundary = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-2.5, 54.6],   // NW corner
      [-0.5, 54.6],   // NE corner  
      [-0.5, 53.2],   // SE corner
      [-2.5, 53.2],   // SW corner
      [-2.5, 54.6]    // Close ring
    ]]
  },
  properties: {
    name: 'Yorkshire and The Humber'
  }
};

// More detailed boundary from approximate coastal and regional borders
// This represents the actual boundaries more accurately
export const yorkshireHumberBoundaryDetailed = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-2.628, 54.563],  // Cumbria/North Yorkshire border - west
      [-2.4, 54.6],      // Pennines
      [-2.0, 54.65],     // North Yorkshire
      [-1.2, 54.7],      // North Yorkshire
      [-0.7, 54.65],     // Tees estuary area
      [-0.5, 54.5],      // Yorkshire coast
      [-0.3, 54.3],      // Hull area
      [-0.4, 54.0],      // South coast
      [-0.8, 53.8],      // Lincolnshire border
      [-1.5, 53.6],      // Nottinghamshire border
      [-2.3, 53.6],      // Derbyshire border
      [-2.5, 53.8],      // Staffordshire border
      [-2.4, 54.2],      // West Yorkshire
      [-2.628, 54.563]   // Close ring
    ]]
  },
  properties: {
    name: 'Yorkshire and The Humber'
  }
};
