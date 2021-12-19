const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24011723-51ecfad92349740cba3768f0d';

export default async function fetchPicturesApi(searchName, page) {
  const response = await fetch(
    `${BASE_URL}?q=${searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return await response.json();
}
