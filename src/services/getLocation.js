function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const location = {
            lat: latitude,
            lon: longitude,
          };

          resolve(location);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject("Location Access Denied");
              break;
            case error.POSITION_UNAVAILABLE:
              reject("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              reject("The request to get user location timed out.");
              break;
            default:
              reject("An unknown error occurred.");
          }
        }
      );
    } else {
      reject("Geolocation is not supported by your browser.");
    }
  });
}

//cityName to cityCoordinates
const searchCity = async (cityName) => {
  let access_token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${access_token}`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      const [lon, lat] = data.features[0].center;
      return { lat, lon };
    } else {
      return { lat: 40, lon: -74.5 };
    }
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
};
export { getLocation, searchCity };
