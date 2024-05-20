import Markdown from "react-markdown";



interface Props{
    text:string;
};




export const GptMessages = ( {text} : Props ) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-15 w-20 rounded-full bg-green-600 flex-shrik=0">
                    VoiBot
            </div>
            <div className="relative ml-3 text-sm bg-black gb-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <Markdown>{ text }</Markdown>
            </div>
        </div>
    </div>
  )
};
