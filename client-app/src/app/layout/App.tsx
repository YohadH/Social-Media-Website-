import React , {useState,useEffect, Fragment} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  // here we declare the type of the model that we want and telling to TS about the type and array type 
  const [activities , setActivities] = useState<Activity[]>([]);
  // here im telling type script that he can be undifend or an Activity type
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  
  const url = "https://localhost:44355/api/Activities"
  useEffect(()=>{
    axios.get<Activity[]>(url).then(response =>{
      console.log(response);
      setActivities(response.data);
    })
  },[])

  function handleSelecteActivity(id: string) {
    setSelectedActivity(activities.find(x => x?.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id ? handleSelecteActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity : Activity){
    // we are taking the currect state and here we are looping over and if there is no activity,
    //and then we are passing the newly activity // its also for editing and adding
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
    : setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x => x.id !== id)])
  }


  return (
    //fragment shortend style that can wrap the componnet without div
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard
         activites={activities}
         selectedActivity={selectedActivity}
         selectActivity={handleSelecteActivity}
         cancelSelectActivity={handleCancelSelectActivity}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createOrEdit={handleCreateOrEditActivity}
         deleteActivity={handleDeleteActivity}
         />
      </Container>
    </>
  );
}

export default App;
