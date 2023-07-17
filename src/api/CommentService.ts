import axios, { AxiosResponse } from "axios"
import { IComment } from "../models/IGame"

export default class GameService {
   static async setComment(id: number, idGame: number, aftor: string, comment: string, comments: IComment[]): Promise<AxiosResponse<IComment>> {
      return axios.patch<IComment>(`http://localhost:3001/games/${idGame}`, JSON.stringify({
         comments: [...comments, {
            aftor, comment, id
         }]
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }

   static async setComments(idGame: number, comments: IComment[]): Promise<AxiosResponse<IComment>> {
      return axios.patch<IComment>(`http://localhost:3001/games/${idGame}`, JSON.stringify({ comments: [...comments] }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }
}