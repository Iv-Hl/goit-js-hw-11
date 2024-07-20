const API_KEY = '44800036-3797b6ab3e55b410f8e06bcc9';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}