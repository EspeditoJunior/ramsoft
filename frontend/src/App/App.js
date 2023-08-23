import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import  Home from '../pages/Home/Home';
import  DashBoardMain from '../pages/DashBoardMain/DashBoardMain';
import ErrorPage from '../pages/Error';
import RootElement from '../pages/Root';
import DashBoardCreate from '../pages/DashboardCreate/DashBoardCreate';
import CreateRow from '../pages/CreateRow/CreateRow';
import CreateTask from '../pages/CreateTask/CreateTask';
import EditTask from '../pages/EditTask/EditTask';


const router = createBrowserRouter([
  {
    path: '/',
    element : <RootElement/>,
    errorElement: <ErrorPage/>,
    children : [
      {path: '/', element: <Home/>},
      {path: '/dashboard/:dashBoardId', element: <DashBoardMain/>},
      {path: '/dashboard/create', element: <DashBoardCreate/>},
      {path: '/dashboard/createrow/:dashBoardId', element: <CreateRow/>},
      {path: '/dashboard/createtask/:rowId', element: <CreateTask/>},
      {path: '/dashboard/edittask/:taskId', element: <EditTask/>},
    ]
  },
]);


function App(){
  return <RouterProvider router={router}/>
}

export default App;