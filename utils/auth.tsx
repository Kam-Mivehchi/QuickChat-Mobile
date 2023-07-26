// use this to decode a token and get the user's information out of it
import decode, { JwtPayload } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface UserPayload extends JwtPayload {
   _id: string;
   username: string;
   email: string;
}
// create a new class to instantiate for a user
class AuthService {
   // get user data
   async getProfile(): Promise<UserPayload> {
      const token = await this.getToken();
      return decode(token);
   }

   // check if user's logged in
   async loggedIn(): Promise<boolean> {
      // Checks if there is a saved token and it's still valid
      const token: string = await this.getToken();
      return !!token && !this.isTokenExpired(token); // handwaiving here
   }

   // check if token is expired
   isTokenExpired(token: string): boolean {
      try {
         const decoded: UserPayload = decode(token);

         if (decoded!.exp! < Date.now() / 1000) {
            return true;
         } else return false;
      } catch (err) {
         return false;
      }
   }

   async getToken(): Promise<string> {
      // Retrieves the user token from localStorage
      const token = await AsyncStorage.getItem('id_token') || "";
      return token;
   }

   async login(idToken: string): Promise<void> {
      // Saves user token to localStorage
      await AsyncStorage.setItem('id_token', idToken);
      // window.location.assign('/');
   }

   async logout(): Promise<void> {
      // Clear user token and profile data from localStorage
      await AsyncStorage.removeItem('id_token');
      // this will reload the page and reset the state of the application
      // window.location.assign('/');
   }
}

export default new AuthService();