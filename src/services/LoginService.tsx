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
}

export default new LoginService()