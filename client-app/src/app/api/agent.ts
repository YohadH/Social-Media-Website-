import axios,{AxiosResponse} from "axios";
import { Activity } from "../models/activity";


const sleep = (delay :number )=>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL= "https://localhost:44355/api"
axios.interceptors.response.use(async response =>{
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})
//im using here <T> to define the type of the object im getting from the response. 
const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const request = {
    get : <T> (url :string) => axios.get<T>(url).then(responseBody),
    post: <T>(url :string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url :string, body:{}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url :string) => axios.delete<T>(url).then(responseBody)
}

// here im defining the type of the response i get from the activites controller 
const Activities ={
    // becuase of this fllow the response can be modolori to which type im getting from .
    list: () => request.get<Activity[]>('/activities'),
    details: (id:string) => request.get<Activity>(`/activities/${id}`),
    create: (activity :Activity) =>axios.post<void>(`/activities`,activity),
    update: (activity: Activity) =>axios.put<void>(`/activities/${activity.id}`,activity),
    delete: (id:string) => axios.delete<void>(`/activities/${id}`)
}


const agent = {
    Activities
}

export default agent;