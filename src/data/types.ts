export interface LocationData {
  id: number;
  name: string;
  city: string;
  state: string;
  type: string;
  latitude: number;
  longitude: number;
  zoom: number;
  stars: number;
  votes: number;
  street: string;
  zip: string;
  webpage: string;
  related: string;
  picture: string;
  gallery?: string;
  description: null | string;
  audio: null | string;
  icon: string;
}
export interface Icon {
  name: string;
  icon: string;
}

export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  license: string;
  dateupload: string;
  ownername: string;
  latitude: number;
  longitude: number;
  accuracy: string;
  context: number;
  place_id: string;
  woeid: string;
  geo_is_public: number;
  geo_is_contact: number;
  geo_is_friend: number;
  geo_is_family: number;
  url_t: string;
  height_t: number;
  width_t: number;
}

export const iconsData: Icon[] = [
  { name: 'Schwimmbäder und Sauna', icon: 'image/swimming.svg' },
  { name: 'Tierparks, Wildparks und Zoos', icon: 'image/zoo.svg' },
  { name: 'Parks und Gärten', icon: 'image/park.svg' },
  { name: 'Museen und Ausstellungen', icon: 'image/museum.svg' },
  {
    name: 'Freizeitparks und Indoor-Spielplätze',
    icon: 'image/attraction.svg',
  },
  { name: 'Schlösser und Burgen', icon: 'image/castle.svg' },
  { name: 'Berühmte Gebäude', icon: 'image/monument.svg' },
  { name: 'Landschaften und Seen', icon: 'image/landscape.svg' },
  { name: 'Denkmäler, Aussichtspunkte und Plätze', icon: 'image/view.svg' },
  { name: 'Kirchen, Klöster und Dome', icon: 'image/church.svg' },
  { name: 'Einkaufszentren und Kinos', icon: 'image/shopping.svg' },
  {
    name: 'Sportstätten, Klettergärten und Kletterwände',
    icon: 'image/sports.svg',
  },
  { name: 'Flughäfen', icon: 'image/airport.svg' },
  { name: 'Krankenhäuser und Kliniken', icon: 'image/hospital.svg' },
  { name: 'Hotels', icon: 'image/hotel.svg' },
  { name: 'Baumärkte', icon: 'image/hardware_store.svg' },
  { name: 'Restaurants', icon: 'image/restaurant.svg' },
  { name: 'Banken', icon: 'image/bank.svg' },
  { name: 'Universitäten und Hochschulen', icon: 'image/university.svg' },
  { name: 'Schulen und Internate', icon: 'image/school.svg' },
  { name: 'Bahnhöfe', icon: 'image/train_statio.svg' },
];
