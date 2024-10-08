import { UserType } from "../assets/types/sliceTypes";
import axios from "./api";

class LoginService{
    async getAllUsers(): Promise<UserType[]> {
        try {
          const response = await axios.get("/users");
          return response.data;
        } catch (error) {
          throw error;
        }
      }

      async updateUserBalance(
        userId: string, 
        email: string, 
        password: string,
        newBalance: number, 
      ): Promise<void> {
        try {
          await axios.put(`/users/${userId}`, { 
            email: email,
            password: password,
            balance: newBalance,
          });
        } catch (error) {
          throw error;
        }
      }
      
}

export default new LoginService()