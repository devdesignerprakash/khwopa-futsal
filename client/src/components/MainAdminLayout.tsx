import { Outlet } from "react-router-dom"
import AdminNav from "./AdminNav"




const MainAdminLayout = () => {
  return (
    <>
    <div className="flex h-screen" >
        <AdminNav/>
    <main className='flex-1 overflow-y-auto p-6 bg-muted/30'>
        <Outlet/>
    </main>
</div>
    </>
  )
}

export default MainAdminLayout