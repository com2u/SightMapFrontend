import { useState, useEffect } from 'react';
import {
  FeatureGroup,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Leaflet from 'leaflet';
import { fetchFlickrData } from '@/data/api';
import { FlickrPhoto } from '@/data/types';
import moment from 'moment';

function Fliker() {
  const map = useMap();
  const [locations, setLocations] = useState<FlickrPhoto[]>([]);

  const fetchData = async (
    minLat: number,
    minLong: number,
    maxLat: number,
    maxLong: number
  ) => {
    const data = await fetchFlickrData(
      `${minLong}, ${minLat}, ${maxLong}, ${maxLat}`
    );
    setLocations((prevLocations) => [...prevLocations, ...data]);
  };

  useEffect(() => {
    const moveendHandler = () => {
      const bounds = map.getBounds();
      const minLat = bounds.getSouthWest().lat;
      const maxLat = bounds.getNorthEast().lat;
      const minLng = bounds.getSouthWest().lng;
      const maxLng = bounds.getNorthEast().lng;
      fetchData(minLat, minLng, maxLat, maxLng);
    };

    map.addEventListener('overlayadd', (event) => {
      if (event.name === 'Flickr') {
        map.addEventListener('moveend', moveendHandler);
      }
    });

    map.addEventListener('overlayremove', (event) => {
      if (event.name === 'Flickr') {
        map.removeEventListener('moveend', moveendHandler);
      }
    });

    return () => {
      map.removeEventListener('moveend', moveendHandler);
    };
  }, [map]);

  const removeNonNumeric = (str: string) => {
    const val = str.replace(/[^\d.-]/g, '');
    return parseFloat(val);
  };

  return (
    <FeatureGroup>
      {locations.map((location, index) => {
        return (
          location?.latitude &&
          location?.longitude && (
            <Marker
              key={index}
              position={[
                removeNonNumeric(location.latitude),
                removeNonNumeric(location.longitude),
              ]}
              icon={Leaflet.icon({
                iconUrl: location.url_t || '',
                iconSize: [20, 20],
                iconAnchor: [16, 16],
              })}
            >
              <Popup>
                <div style={{ padding: '10px 5px 10px 20px' }}>
                  <div className="owner-name">{location?.ownername}</div>
                  <div className="fliker-img">
                    <img
                      src={location.url_t}
                      width={100}
                      height={100}
                      alt="Flickr"
                    />
                  </div>
                  <div className="Rights">
                    ⓒ
                    <a
                      href={`https://www.flickr.com/people/${location.owner}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {location.owner}
                    </a>
                    , All Rights Reserved{' '}
                    {moment
                      .unix(Number(location.dateupload))
                      .format('DD MMMM YYYY')}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        );
      })}
    </FeatureGroup>
  );
}

export default Fliker;
