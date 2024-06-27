import { OrthographyResponse } from "../../Interfaces";


export const orthographyUseCase = async ( prompt : string) => {

  try {
   
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error("Lo siento, no se pudo realizar la correción");
    }

    const data = await resp.json() as OrthographyResponse;

    return{
        ok : true,
        ...data
    };

  } catch (error) {
    return {
      ok: false,
      userScore: 0,
      errors: [],
      prompCorregida: '',
      message: "Lo siento, no se pudo realizar la correción",
    };
  }
};




     // * con Axios
    //  const resp = await axios.post(
    //    `${import.meta.env.VITE__GPT_API}/orthography-check`
    //  );

    //  if (!resp.data.ok) {
    //    throw new Error("Lo siento, no se pudo realizar la correción");
    //  }

    //  const data = (await resp.data) as OrthographyResponse;