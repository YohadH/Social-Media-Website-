import React , {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities , setActivities] = useState([]);
  
  const url = "https://localhost:44355/api/Activities"
  useEffect(()=>{
    axios.get(url).then(response =>{
      console.log(response);
      setActivities(response.data);
    })
  },[])



  return (
    //jsx
    <div>
      <Header as ='h2' icon="users" content="Reactivities"/>
        <List>
          {activities.map((activity : any) => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
