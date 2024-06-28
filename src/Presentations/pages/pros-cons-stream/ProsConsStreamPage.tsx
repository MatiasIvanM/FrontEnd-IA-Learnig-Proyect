import { useEffect, useRef, useState } from "react";
import { GptMessages, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsStreamGeneratorUseCase, /* prosConsStreamUseCase */ } from "../../../Core/use-cases";


interface Messages {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {

  const abortController = useRef(new AbortController());
  const isRunning = useRef(false)

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

    if (isRunning.current) {
      abortController.current.abort();
      abortController.current = new AbortController();
    }


    setLoading(true);
    isRunning.current = true;
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // Funcion generadora

    const stream = await prosConsStreamGeneratorUseCase(text, abortController.current.signal);
    setLoading(false);

    setMessages((messages) => [...messages, { text: '', isGpt: true }]);

    for await ( const text of stream){

      setMessages((messages) => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1].text = text;

        return newMessages;
      });

    }

    // Concatenando texto 
    // const reader = await prosConsStreamUseCase(text);
    // setLoading(false)

    // if (!reader) return alert('no se pudo generar reader')

    // // Generar el ultimo mensaje 

    // const decoder = new TextDecoder();

    // let message = '';

    // setMessages((messages) => [...messages, { text: message, isGpt: true }]);

    // while (true) {

    //   const { value, done } = await reader.read();
    //   if (done) break;

    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   message += decodedChunk;


      // setMessages((messages) => {
      //   const newMessages = [...messages];
      //   newMessages[newMessages.length - 1].text = message;

      //   return newMessages;
      // });
    // }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gapy2">
          {/* Bienvenida */}
          <GptMessages text="Que deseas comparar hoy?" />

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
