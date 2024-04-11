import {RouterProvider} from 'react-router-dom'
import {router} from './Presentations/router/router'



export const ReactGpt = () => {
    return(
        <RouterProvider router={router}/>
    )
}