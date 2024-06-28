import { useEffect, useRef, useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../components";


interface Messages {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
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

    setLoading(false)

    //  ToDo: Añadir mensage de isGpt en true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gapy2">
          {/* Bienvenida */}
          <GptMessages text="Hola, Puedes excribir tu texto en español y te ayudare con las correcciones" />

          {/* User message */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessages key={index} text="OpenAi Response" />
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
        placeholder="Escriba ssu mensaje aquí"
        disableCorrections
      />
    </div>
  );
};
