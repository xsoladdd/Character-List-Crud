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


export const addUpdateCharacter =  async (body: ICharacter) => {
  if (body.id) {
    const response = await fetch(`/api/character/${body.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } else {
    const response = await fetch("/api/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ ...body, id: undefined }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }
}

export const toggleCharacterCombatStatus =  async (body: ICharacter) => {
    const response = await fetch(`/api/character/${body.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
}

export const deleteCharacter =  async (id:string) => {
    const response = await fetch(`/api/character/${id}`, {
      method: "DELETE",
    });
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