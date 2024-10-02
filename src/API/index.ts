import axios from "axios";
import { UserState } from "../store/userSlice";

const instanse = axios.create({
    baseURL: 'https://www.ai.stores.kg/api/v1/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const userAPI = {
    registrationUser(userData: UserState) {
        return instanse.post(`auth/register/`, userData);
    },
    getCode(email: string) {
        return instanse.post(`auth/send-activate-code/`, {
            email: email,
            type_code: "REGISTRATION"
        })
    },
    checkCode(email: string, code: number) {
        return instanse.post(`auth/check-activate-code/`, {
            email: email,
            type_code: "REGISTRATION",
            code: code
        })
    },
    login(email: string, password: string) {
        return instanse.post(`auth/login/`, { email, password })
    }
};



