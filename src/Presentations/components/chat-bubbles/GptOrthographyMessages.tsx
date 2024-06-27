
interface Props {
  userScore: number;
  errors: string[];
  prompCorregida: string;
  message: string;
};




export const GptOrthographyMessages = ({ userScore, errors, prompCorregida, message }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-15 w-20 rounded-full bg-green-600 flex-shrik=0">
          VoiBot
        </div>
        <div className="relative ml-3 text-sm bg-black gb-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          {/* <Markdown>{ text }</Markdown> */}

          <h3 className="text-2xl"> Puntaje: {userScore} </h3>
          <p> {message} </p>
          {
            (errors.length === 0) ?
              <p>No se econtraton errores, esta Perfecto!</p>
              : (<>
                <h3 className="text-xl text"> Errores Encontrados </h3>
                <ul>
                  {
                    errors.map((err, i) => (
                      <li key={i}> {err} </li>
                    ))
                  }
                </ul>
              </>
              )}
          <br />
          <h2 className="text-xl text"> Tu texto corregido:  </h2>
          <p> {prompCorregida} </p>

        </div>
      </div>
    </div>
  )
};
