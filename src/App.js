import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Profile from './ProfilePage/profile'
import Dashboard from './Dashboard/dashboard'
import Root from './Root/root'
import Error from './Error/error'
import PDFViewer from './PdfViewer/pdfViewer';
import { Children } from 'react';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Root />,
    errorElement: <Error/>, 
    children: [
      { path: "/", element: <Profile />},
      { path: "/dashboard", element: <Dashboard />},
      { path: "/pdfview", element: <PDFViewer/>
      }
    ],
  },
  
  ]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
