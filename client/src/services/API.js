import axios from "axios";

export const searchUser = async (
  username,
  page = 1
) => {
  const response = await axios.get(
    `http://localhost:5000/api/github/${username}?page=${page}`
  );

  return response.data;
};