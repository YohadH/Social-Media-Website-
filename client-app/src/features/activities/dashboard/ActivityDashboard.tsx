import { observer } from 'mobx-react-lite';
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activites: Activity[];
    deleteActivity :(id:string) => void;
    submitting : boolean;
}
// Destructe props that are passing throw, we need to get the spesic value that we want
export default observer(function ActivityDashboard({ activites, deleteActivity,submitting}:Props) {

    const {activityStore} = useStore();
    const {selectedActivity,editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activites}  deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* if activites[0] has value and not undfiend then disply on the right (true false situation)  */}
                {selectedActivity && !editMode && <ActivityDetails/>}
                {editMode && <ActivityForm />}
                
            </Grid.Column>
        </Grid>
    )
})