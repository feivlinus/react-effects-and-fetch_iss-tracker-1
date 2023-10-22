import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  async function getISSCoords() {
    const URL = "https://api.wheretheiss.at/v1/satellites/25544";

    const apiData = await fetch(URL);
    const result = await apiData.json();
    await handleCords(result.longitude, result.latitude);
  }

  function handleCords(newlongitude, newlatitude) {
    setCoords({ longitude: newlongitude, latitude: newlatitude });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getISSCoords();
    }, 5000);
    return () => clearInterval(intervalId);
  });

  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
