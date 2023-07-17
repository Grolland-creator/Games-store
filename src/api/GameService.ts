import axios, { AxiosResponse } from "axios";
import { IGame } from "../models/IGame";
import { baseUrl } from "./constants";

export default class GameService {
   static async getGames(limit: number = 5, page: number = 1): Promise<AxiosResponse<IGame[]>> {
      return axios.get<IGame[]>(`${baseUrl}games`, {
         params: {
            _limit: limit,
            _page: page
         }
      })
   }

   static async addGame({ name, ageLimit, description, rating, platform, price, comments, genre, image }: IGame): Promise<AxiosResponse<IGame>> {
      return axios.post<IGame>(`${baseUrl}games`, JSON.stringify({
         name, ageLimit, description, rating, platform, price, comments, genre, image
      }), {
         headers: {
            'Content-Type': 'application/json',
         }
      })
   }

   static async deleteGame(id: number): Promise<AxiosResponse<number>> {
      return axios.delete<number>(`${baseUrl}games/${id}`)
   }

   static async getGameById(id: number): Promise<AxiosResponse<IGame>> {
      return axios.get<IGame>(`${baseUrl}games/${id}`)
   }
}