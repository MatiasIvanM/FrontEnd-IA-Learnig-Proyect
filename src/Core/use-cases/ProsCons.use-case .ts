import { ProsConsResponse } from "../../Interfaces";


export const prosConsUseCase = async ( prompt : string) => {

  try {
   
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) {
      throw new Error("Lo siento, no se pudo realizar la comparacion");
    }

    const data = (await resp.json()) as ProsConsResponse;

    return{
        ok : true,
        ...data
    };

  } catch (error) {
    return {
      ok: false,
        content: 'Lo siento, no puede realizar la comparacion'
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