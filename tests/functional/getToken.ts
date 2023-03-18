import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export async function obtenerTokenAutorizacion():Promise<string>{
    let endpoint = "/api/v1/login"
    let body = {
        email: "danielc88@gmail.co",
        password: "32jdkdi"
    }
    let axiosResponse = await axios.post(`${Env.get("PATH_APP") + endpoint}`, body)
    return axiosResponse.data["token"]
}

