import { useEffect, useRef, useState } from "react";
import { GptMessages, MyMessage, TextMessageBox, TypingLoader } from "../../components";
import { prosConsUseCase } from "../../../Core/use-cases";



interface Messages {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }; 
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handlePost = async (text: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]); //no es necesario el text:text pero quiero que sea mas simple de leer.

    //  ToDo UseCase
    const { ok, content } = await prosConsUseCase(text);
      setLoading(false)
    
      if ( !ok ) return; 
    setMessages((prev) => [...prev, { text: content, isGpt: true }]);
      


  
    //  ToDo: Añadir mensage de isGpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gapy2">
          {/* Bienvenida */}
          <GptMessages text="Hola, Puedes escribir lo que necesites comparar y te dare mi punto de vista" />

          {/* User message */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessages key={index} text={message.text} />
            ) : (
                <MyMessage key={index} text={message.text} />
            )
          )}

          {/*LOADER  */}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>

          )
          }
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* TEXT MESSAGE BOX */}

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escriba su mensaje aquí"
        disableCorrections
      />
    </div>
  );
};


