import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components"

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className ="grid grid-cols-12 gapy2">   
          {/* Bienvenida */}
          <GptMessages text ="Hola, Puedes excribir tu texto en español y te ayudare con las correcciones"/>




        {/* User message */}
          <MyMessage text="User text here"/>

               
               {/*LOADER  */}
         <TypingLoader className="fade-in"/>
        
        </div>
      </div>

    {/* TEXT MESSAGE BOX */}

      <TextMessageBox
        onSendMessage={ (message) => console.log(message) }
        placeholder="Escribe su mensaje aquí"
        disableCorrections

      />
      
    </div>
  )
}
