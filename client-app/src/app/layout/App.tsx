import React , {useState,useEffect, Fragment} from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import agent from '../api/agent';

function App() {
  const {activityStore}  = useStore();
  // here we declare the type of the model that we want and telling to TS about the type and array type 
  const [activities , setActivities] = useState<Activity[]>([]);
  // here im telling type script that he can be undifend or an Activity type
  const [submitting,setSubmitting] = useState(false);
  
  useEffect(()=>{
    activityStore.loadActivites();
  }, [activityStore])


  function handleDeleteActivity(id:string){
    setSubmitting(false);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (activityStore.loadingInitial) return <LoadingComponent content={'Loading app'}/>



  return (
    //fragment shortend style that can wrap the componnet without div
    <>
      <NavBar/>
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard
         activites={activityStore.activities}
         deleteActivity={handleDeleteActivity}
         submitting={submitting}
         />
      </Container>
    </>
  );
}

export default observer(App);
