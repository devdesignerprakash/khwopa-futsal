import User from "../models/user.entity";
import { UserDTO } from "../DTOs/auth.dto";



export const toUserDTO = (user: User): UserDTO => {
  const { id, fullName, email, role, phoneNumber, address} = user; // pick only safe fields
  return { id, fullName, email, role, phoneNumber,address};
};