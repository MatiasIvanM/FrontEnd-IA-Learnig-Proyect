// Importar todos los archivs desde dashboardLayout para utilizarlos en lugar del codigo comleto 

import { NavLink } from 'react-router-dom'


interface Props{
    to: string,
    icon: string,
    title: string,
    description:string,
}

export const SidebarMenuTab = ({
    to,icon,title, description
}:Props) => {
  return (
        <NavLink 
        to= {to} 
        className={
          ({ isActive }) =>
            isActive 
          ? 'flex justify-center item-center bg-gray-800 rounded-md p-2 transition '
          : 'flex justify-center item-center hover:bg-gray-800 rounded-md p-2 transition '
        }
        >

          <i className ={`${icon} text-2xl mr-4 text-indigo-400`}></i>
          <div className="felx flex-col felx-grow">
            <span className="text-white text-lg font-bold ">
              {title}
            </span><br/>
            <span className="text-gray-400 text-sm ">
              {description}
            </span>
          </div>


        </NavLink>
      )
};
