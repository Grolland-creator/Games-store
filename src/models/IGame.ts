export interface IGame {
   [key: string]: string | number | IPlatform | IComment[];
   id: number;
   name: string;
   image: string;
   price: number;
   description: string;
   ageLimit: number;
   rating: number;
   genre: string;
   platform: IPlatform;
   comments: IComment[];
}

export interface IPlatform {
   pc: boolean;
   playstation: boolean;
   xbox: boolean;
}

export interface IComment {
   id: number;
   aftor: string;
   comment: string;
}