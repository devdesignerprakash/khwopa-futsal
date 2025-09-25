import { useEffect, useState } from "react"
import { type UserDTO } from "../DTOs/userDTO"
import { useFetch } from "../hooks/useFetch"
import { Button } from "@shadcn/components/ui/button"
import { Badge } from "@shadcn/components/ui/badge"
import api from "../utils/axiosInterceptor"
import { toast } from "react-toastify"

const AllUsers = () => {
  const { data, loading, error } = useFetch("/user/all-users")
  const [allUsers, setAllUsers] = useState<UserDTO[]>([])


  useEffect(() => {
    if (data) {
      setAllUsers(data?.users)
    }
  }, [data])

  const handleApprove = async (id: string) => {
    try {
      const response = await api.patch(`user/approve-user/${id}`, { withCredentials: true })
      if (response) {
        toast.success(response.data.message)
        setAllUsers(prev =>
          prev.map(user =>
            user.id === id ? { ...user, isUserVerified: true } : user
          )
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleActiveStatus = async (id: string) => {
    try {
      const response = await api.patch(`user/active-deactive-user/${id}`, { withCredentials: true })
      if (response) {
        toast.success(response.data.message)
        setAllUsers(prev =>
          prev.map(user =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
          )
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id: String) => {
    try {
      const response = await api.delete(`user/delete-user/${id}`, { withCredentials: true })
      if (response) {
        toast.success(response.data.message)
        setAllUsers(prev => prev.filter(user => user.id !== id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>
  if (error) return <p className="text-center text-red-500">Failed to load users.</p>

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="max-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">S.N.</th>
              <th className="px-4 py-3 text-left">Full Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email Status</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phoneNumber}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>

                  {/* Email Verified Status */}
                  <td className="px-4 py-3">
                    {user.isEmailVerified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Pending</Badge>
                    )}
                  </td>

                  {/* User Verification Status */}
                  <td className="px-4 py-3">
                    {user.isUserVerified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Pending</Badge>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center space-x-2">
                    <div className="flex gap-2 overflow-x-auto max-w-[250px] mx-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {!user.isUserVerified ? (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(user.id)}>
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}

                      {/* Always show Active/Deactivate toggle */}
                      {user.isActive && user.role == "user" ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => handleActiveStatus(user.id)}
                        >
                          Deactivate
                        </Button>
                      ) : user.role == "user" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleActiveStatus(user.id)}>
                          Activate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8} // fixed colSpan
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers
