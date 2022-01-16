import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activites: Activity[];
    selectedActivity : Activity | undefined;
    selectActivity:(id:string) => void;
    cancelSelectActivity:() => void;
    editMode :boolean;
    openForm : (id :string) => void;
    closeForm : () => void;
    createOrEdit : (activity : Activity)=>void;
    deleteActivity :(id:string) => void;
}
// Destructe props that are passing throw, we need to get the spesic value that we want
export default function ActivityDashboard({ activites, selectedActivity, selectActivity, 
    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity}:Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activites} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {/* if activites[0] has value and not undfiend then disply on the right (true false situation)  */}
                {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity}
                 cancelSelectActivity={cancelSelectActivity}
                 openForm={openForm}
                 />}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
                
            </Grid.Column>
        </Grid>
    )
}