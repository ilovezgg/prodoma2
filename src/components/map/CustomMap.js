'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomMap.module.css';

export default function CustomMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const leafletLoaded = useRef(false);

  useEffect(() => {
    // Защита от дублирования
    if (mapInstance.current || typeof window === 'undefined') return;

    let isMounted = true;

    const initMap = async () => {
      try {
       
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

      
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const container = mapRef.current;
        if (!container || !isMounted) return;

        container.style.height = '400px';
        container.style.width = '100%';

        const map = L.map(container, {
          center: [58.591947, 35.824912],
          zoom: 15,
          minZoom: 10,
          maxZoom: 16,
          attributionControl: false,
        });

       L.tileLayer('https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1', {
  maxZoom: 18,
  updateWhenIdle: false,
  updateWhenZooming: true,
  keepBuffer: 2,
}).addTo(map);

        const marker = L.marker([58.591947, 35.824912]);
        marker.bindPopup(
          '<div style="color:black; font-weight:300; font-family:\'Unbounded\', sans-serif; font-size:14px;">Офис компании Prodoma</div>',
          { closeButton: false, autoClose: false }
        ).addTo(map);
        marker.openPopup();

        mapInstance.current = map;

      } catch (err) {
        console.error('Ошибка загрузки карты:', err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className={styles.mapContainer} />;
}