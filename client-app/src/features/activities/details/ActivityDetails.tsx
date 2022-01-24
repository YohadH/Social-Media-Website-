import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function ActivityDetails(){
    const {activityStore} = useStore()
    const { selectedActivity: activity, cancelSelectedActivity, openForm} = activityStore;

    //doing this to check if we have activity at all
    if(!activity) return <LoadingComponent inverted={true} content="Loading...." />;

    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    {activity.date}
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='blue' content='Cancel' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
} 