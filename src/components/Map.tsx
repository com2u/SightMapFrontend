'use client';

import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
  Popup,
  Marker,
} from 'react-leaflet';
import { LocationData } from '@/data/types';
import MarkerCluster from './MarkerCluster';
import { useEffect, useState } from 'react';
import Fliker from './Fliker';

interface MapProps {
  locations: LocationData[];
}

const Map: React.FC<MapProps> = ({ locations }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLoading(false); // Set loading to false when the location is obtained
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          setLoading(false); // Set loading to false on error as well
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false); // Set loading to false if geolocation is not supported
    }
  }, []);
  return (
    <>
      {loading ? (
        <p style={{ marginLeft: '20px' }}>Map is loading</p>
      ) : (
        <MapContainer
          style={{ width: '100%', height: '100vh' }}
          center={userLocation || [51.1657, 10.4515]}
          zoom={10}
          minZoom={5}
        >
          <LayersControl>
            <LayersControl.Overlay name="Flickr">
              <Fliker />
            </LayersControl.Overlay>

            <LayersControl.BaseLayer name="OpenStreetMap Mapnik">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors OpenStreetMap Mapnik (Strassenkarte)'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="OpenStreetMap Deutschland">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked name="Google Maps">
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Google Maps Satellite">
              <LayerGroup>
                <TileLayer
                  attribution="Google Maps Satellite"
                  url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                />
                <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
              </LayerGroup>
            </LayersControl.BaseLayer>
          </LayersControl>
          <MarkerCluster locations={locations} />
        </MapContainer>
      )}
    </>
  );
};

export default Map;
