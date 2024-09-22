import { UserType } from "../assets/types/sliceTypes";
import axios from "./api";

class RegisterService{

    async AddNewUser(newUser: UserType): Promise<any> {
        try {
          const response = await axios.post("/users", newUser);
          return response.data;
        } catch (error) {
          throw error;
        }
      }
}

export default new RegisterService()