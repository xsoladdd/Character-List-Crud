import { object, string } from "yup";


export const getWeapons = async () => {
  const response = await fetch("/api/weapons");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const getCharacters = async () => {
  const response = await fetch("/api/characters");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}





export const validationSchema = object({
  name:string().required('Name is required'),
  weapon:string().required('Must select one weapon'),
  description:string(),
})