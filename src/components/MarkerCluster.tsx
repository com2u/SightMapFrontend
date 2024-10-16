'use client';
import { useMemo, useState } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Leaflet from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { Icon, LocationData, iconsData } from '@/data/types';
import MapPopup from './Popup';
import Input from './Input';
import Filter from './Filter';

import './MarkupCluster.css';
import 'react-icons/fa';

interface Props {
  locations: LocationData[];
}

const MarkerCluster = ({ locations }: Props) => {
  const map = useMap();
  const [searchedValue, setSearchedValue] = useState('');
  const [selectedIcons, setSelectedIcons] = useState<Icon[]>(iconsData);

  const filteredLocations = useMemo(() => {
    const value = searchedValue.toLowerCase().trim();
    const data = locations.filter((item) =>
      selectedIcons.some((selectedIcon) => selectedIcon.icon === item.icon)
    );
    const searchedData = data.filter(
      (location) =>
        location.name.toLowerCase().includes(value) ||
        location.street.toLowerCase().includes(value) ||
        location.state.toLowerCase().includes(value) ||
        location.city.toLowerCase().includes(value) ||
        location.zip === value
    );

    if (value && searchedData.length > 0) {
      map.flyTo(
        [Number(searchedData[0].latitude), Number(searchedData[0].longitude)],
        15
      );
    }
    return searchedData;
  }, [selectedIcons, searchedValue]);

  const removeNonNumeric = (str: string) => {
    const val = str.replace(/[^\d.-]/g, '');
    return parseFloat(val);
  };

  return (
    <>
      <Input isPressed={searchedValue} setIsPressed={setSearchedValue} />
      <Filter
        setSelectedIcons={setSelectedIcons}
        selectedIcons={selectedIcons}
      />
      <MarkerClusterGroup chunkedLoading>
        {filteredLocations.map((location, index) => {
          return (
            location.latitude &&
            location.longitude && (
              <Marker
                key={index}
                position={[
                  removeNonNumeric(location.latitude),
                  removeNonNumeric(location.longitude),
                ]}
                icon={Leaflet.icon({
                  iconUrl: location.icon || '',
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                })}
              >
                <MapPopup location={location} />
              </Marker>
            )
          );
        })}
      </MarkerClusterGroup>
    </>
  );
};
export default MarkerCluster;
