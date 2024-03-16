import axios from "axios";
import { LOGIN, REGISTER,LEADERBOARD,UPDATE_SCORES} from "./apiConstants";



export const login = async (data)=>{
 return axios.post(LOGIN,data)
}

export const register = async (data)=>{
    return axios.post(REGISTER,data)
   }


   export function getToken(){
    let user = localStorage.getItem('user');
    if(!user) return
    const userObj = JSON.parse(user);
    return userObj.token;
   }

   export  const leaderBoard = async (data)=>{ 
      return axios.get(LEADERBOARD, data)
   }

   export const updateScores = async (userId, pointsToAdd) => { 
    return axios.patch(`${UPDATE_SCORES}/${userId}`, { score: pointsToAdd });
  };