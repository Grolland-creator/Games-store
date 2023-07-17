export interface IUser {
   username: string;
   password: string;
   email: string;
   avatar?: string;
   description?: string;
   id: string; 
   isAdmin: boolean;
}
