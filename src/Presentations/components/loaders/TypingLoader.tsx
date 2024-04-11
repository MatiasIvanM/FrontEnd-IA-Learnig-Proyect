import "./TypingLoader.css"


interface Prop{
    className?: string,
}

export const TypingLoader = ({ className }:Prop) => {
  return (
    <div className ={`typing ${className}`}>
        <span className ="circle scaling"></span>
        <span className ="circle scaling"></span>
        <span className ="circle scaling"></span>
     </div>
  )
}
