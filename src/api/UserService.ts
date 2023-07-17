import axios, { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UserService {
   static async getUsers(): Promise<AxiosResponse<IUser[]>> {
      return axios.get<IUser[]>('http://localhost:3001/users')
   }
   static async addUser({ username, password, email, id, isAdmin } : IUser): Promise<AxiosResponse<IUser>> {
      return axios.post<IUser>('http://localhost:3001/users', JSON.stringify({
         username, email, password, id, isAdmin
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
   static async setDescription(userDescription: string | undefined, id: string): Promise<AxiosResponse<IUser>> {
      return axios.patch<IUser>(`http://localhost:3001/users/${id}`, JSON.stringify({
         description: userDescription
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
   static async setIsAdmin(userIsAdmin: boolean, id: string): Promise<AxiosResponse<IUser>> {
      return axios.patch<IUser>(`http://localhost:3001/users/${id}`, JSON.stringify({
         isAdmin: userIsAdmin
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
   static async setAvatar(userAvatar: string | undefined, id: string): Promise<AxiosResponse<IUser>> {
      return axios.patch<IUser>(`http://localhost:3001/users/${id}`, JSON.stringify({
         avatar: userAvatar
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
}
