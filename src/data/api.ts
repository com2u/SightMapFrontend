import { FlickrPhoto } from './types';

export async function fetchFlickrData(
  bboxData: string
): Promise<FlickrPhoto[]> {
  const apiKey: string = 'f3ae94d5edd9e926aa8324460afaaf13';
  const url: string = `https://api.flickr.com/services/rest/?method=flickr.photos.search&bbox=${bboxData}&has_geo=1&format=json&extras=geo,url_t,owner_name,date_upload,license&per_page=20&api_key=${apiKey}&nojsoncallback=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {},
    });

    const data = await response.json();

    if (data) {
      return data?.photos?.photo || [];
    }
    return [];
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    return [];
  }
}
