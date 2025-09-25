import { useEffect, useState } from "react"
import { type UserDTO } from "../DTOs/userDTO"
import { useFetch } from "../hooks/useFetch"
import { Button } from "@shadcn/components/ui/button"
import { Badge } from "@shadcn/components/ui/badge"

const AllUsers = () => {
  const { data, loading, error } = useFetch("/user/all-users")
  const [allUsers, setAllUsers] = useState<UserDTO[]>([])

  useEffect(() => {
    if (data) {
      setAllUsers(data?.users)
    }
  }, [data])

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>
  if (error) return <p className="text-center text-red-500">Failed to load users.</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border border-gray-200 text-sm">
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
                   <td className="px-4 py-3">
                    {user.isEmailVerified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Pending</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {user.isUserVerified ? (
                      <Badge className="bg-green-500">Verified</Badge>
                    ) : (
                      <Badge className="bg-yellow-500">Pending</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    {!user.isUserVerified ? (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
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
