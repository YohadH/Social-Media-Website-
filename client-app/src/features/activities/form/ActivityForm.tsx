import React, { useState, ChangeEvent} from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity : Activity | undefined;
    closeForm : () => void;
    createOrEdit : (activity : Activity) => void; 
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit}:Props){

    const intialState = selectedActivity ?? {
        id:'',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    }

    const [activity,setActivity] = useState(intialState);

    function handleSubmit(){
        createOrEdit(activity)
    }
    function handleInputChange(event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        //we are destructring the value and name.
        const {name, value} = event.target;
        //we are taking the old state of activity and then we are targeting the name and adding him the value
        setActivity({...activity,[name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}