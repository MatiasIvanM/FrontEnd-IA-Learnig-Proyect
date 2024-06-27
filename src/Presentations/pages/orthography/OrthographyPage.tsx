import { useEffect, useRef, useState } from "react";
import {
  GptMessages,
  GptOrthographyMessages,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { orthographyUseCase } from "../../../Core/use-cases";

interface Messages {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number,
    errors: string[],
    prompCorregida: string,
    message: string,
  };
}

export const OrthographyPage = () => {
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

    const { ok, errors, prompCorregida, message, userScore } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [...prev, { text: message, isGpt: false }]); //error de de la response de la data 

    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            userScore: userScore,
            errors: errors,
            prompCorregida: prompCorregida,
            message: message,
          }
        },
      ]);
    }

    setLoading(false);

    //  ToDo: Añadir mensage de isGpt en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gapy2">
          {/* Bienvenida */}
          <GptMessages text="Hola, Puedes excribir tu texto en español y te ayudare con las correcciones" />

          {/* User message */}
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessages
                key={index}
                {...message.info!}
                // userScore={message.info!.userScore}
                // errors={message.info!.errors}
                // prompCorregida={message.info!.prompCorregida}
                // message={message.info!.message}
              />
            ) : (
                <MyMessage key={index} text={message.text} />
            )
          )}

          {/*LOADER  */}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
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
