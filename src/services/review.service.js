import axios from "axios"



// const BASE_URL = 'review/'
const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3030'
axios.defaults.withCredentials = true;

export const reviewService = {
  add,
  query,
  remove,
}

async function query(filterBy = {}) {

  const review = await axios.get(`${BASE_URL}/api/review`, { params: filterBy })
  return review.data
}

async function remove(reviewId) {
  await axios.delete(`${BASE_URL}/api/review` + reviewId)
}

async function add({ txt, aboutToyId, loggedinUser }) {
  const review = await axios.post(`${BASE_URL}/api/review`, { txt, aboutToyId, loggedinUser })
  return review.data
}
