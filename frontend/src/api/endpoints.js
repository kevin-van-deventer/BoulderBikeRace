import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/"
const GET_URL_RIDERS = `${BASE_URL}riders`
const GET_URL_SUBMISSIONS = `${BASE_URL}submissions`
const POST_URL_SUBMISSIONS = `${BASE_URL}submissions`

export const get_riders = async () => {
    const response = await axios.get(GET_URL_RIDERS);
    return response.data
}

export const get_submissions = async () => {
    const response = await axios.get(GET_URL_SUBMISSIONS);
    return response.data
}

export const create_slogan = async (data) => {
    try {
      const response = await axios.post(`${POST_URL_SUBMISSIONS}`, data);
      return response.data; // Return the created slogan
    } catch (error) {
      console.error("Error creating slogan:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

  