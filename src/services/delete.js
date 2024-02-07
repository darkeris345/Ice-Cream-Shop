import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import {getOne} from "./get";

export const deleteData = async (id) => {
  const { email } = await getOne(id);
  const confirm = window.confirm(`Are you sure you want to delete ${email}?`);
  if (!confirm) return;
  const deleteResponse = await axios.delete(`${API_URL}/${id}`);
  return deleteResponse.data;
};
