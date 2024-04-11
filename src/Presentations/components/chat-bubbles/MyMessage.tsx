

interface Props{
    text:string;
};


export const MyMessage = ({text}:Props)  => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-15 w-25 rounded-full bg-indigo-500 flex-shrink-0">
                    User
            </div>
            <div className="relative ml-3 text-sm bg-indigo-700 py-2 px-2 shadow rounded-xl">
                <div>{ text }</div>
            </div>
        </div>
    </div>
  )
}
