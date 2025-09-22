
import {  RouterProvider } from 'react-router-dom'
import router from './utils/routes'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'



function App() {
  return (
    <>
    <UserProvider>
    <RouterProvider router={router} />
    <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
        </UserProvider>
    </>
  )
}

export default App
