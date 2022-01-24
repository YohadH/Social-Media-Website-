import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore : ActivityStore
}
//contning our content  and create a new store for it.
export const store : Store ={
    activityStore : new ActivityStore()
}


export const storeContext = createContext(store);

//this is react hook !
export function useStore(){
    return useContext(storeContext);
}