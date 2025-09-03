import axios from "axios";

export const getUserById = async (id: string) => {
  const response = await axios.get(`https://localhost:7228/api/Users/${id}`);
  return response.data;
};
