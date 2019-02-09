import React from 'react';
import {connect} from 'react-redux';
import './forms.scss';
import {
    deleteEvent,
    getUser,
} from '../../../util/graphQLQuery';
import {closeModal} from '../../../reduxes/actions/modal_actions';
import {graphql, compose} from 'react-apollo';
import {withApollo} from 'react-apollo';
import Calendar from 'react-calendar';
import { navigate } from '@reach/router';
import { userHandleAttendAction } from '../../../reduxes/actions/attendEvent.action';
const EventForm = ({client, currentUser,data, closeModal}) => {
    let form = {
        title: '',
        organizer: currentUser.id,
        eventId: '',
        organization: '',
        description: '',
        Address: '',
        city: '',
        state: '',
        zip: '',
        category: '',
        time: '',
        date: new Date(),
    };

console.log(data);
    const onChange = (event) => {
        form[event.target.name] = event.target.value;
        // set fields
    };
    console.log(data.required);
    const onSubmit = (event) => {
    event.preventDefault();
        
    let eventUpdate;
    if(data.event){
        eventUpdate = {
        title: data.event.title,
        organizer: currentUser.id,
        eventId: data.event.id,
        organization: data.event.organization,
        description: data.event.description,
        Address: data.event.location.Address,
        city: data.event.location.city,
        state: data.event.location.state,
        zip: data.event.location.zip,
        category: data.event.location.category,
        time: '',
        date: new Date(parseInt(data.event.date)),
        };
       
        const keys = Object.keys(form);
        keys.forEach(function(item, index) {
            if (form[item] !== '') {
                console.log('item' + index, form[item]);
                eventUpdate[item] = form[item];
            }
        });
        
    }else{
        eventUpdate=form;
    }

    if(form.time!==''){
        const time = form.time.split(':');
        eventUpdate.date.setHours(time[0], time[1]);
        // set the time
        }else if(data.event){
            const date= new Date(parseInt(data.event.date))
            const hours= date.getHours();
            const minutes= date.getMinutes();
         eventUpdate.date.setHours(hours,minutes);
        }

       eventUpdate.zip=parseInt(eventUpdate.zip);
        
        client.mutate({
            mutation: data.mutation,
            variables: {...eventUpdate},
            refetchQueries: data.refetch,
        });
        closeModal();
    };

    const handleDeleteEvent=(event)=>{
        event.preventDefault();
        client.mutate({
            mutation: deleteEvent,
            variables: {
                eventId: data.event.id,
                userId: currentUser.id,
            },
            refetchQueries: [
                {
                    query: getUser,
                    variables: {id: currentUser.id},
                },
            ],
        });
        navigate('/profile');
        closeModal();
    }

    return (<div className="modal-form">
    <h2 className="text-center">{data.title}</h2>
        <form className="modal-event-split" id="newEvent" onSubmit={(event)=>onSubmit(event)}>
        <div className="modal-event">
            
            <div className="modal-event-field"><label>Title</label><input name="title" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>Organization(optional)</label><input name="organization" onChange={onChange} /></div>
            <div className="modal-event-field"><label>Description</label><input name="description" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>Address</label><input name="address" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>City</label><input name="city" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>State</label><input name="state" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>Zip</label><input name="zip" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field"><label>Category</label><input name="category" onChange={onChange} required={data.required} /></div>
            <div className="modal-event-field modal-event-center"><label>Time</label><input name="time" type="time" onChange={onChange} required={data.required} /></div>
            
        </div>
        <div>
            <div className="modal-event-calendar"><label>Calendar</label><Calendar onChange={(value)=>{form.date=value; console.log(form.date)}} value= {form.date}/></div>

        </div>
        </form>
        <button className="text-center" type="submit"form="newEvent">Submit</button>
        {data.event?<button onClick={(event)=>handleDeleteEvent(event)}>Delete Event</button>:''}
    </div>);
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    data: state.modal.data
});
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
        // replace with edit user
    ),
    graphql(getUser, {
        name: 'getUser',
        options: (props) => {
            console.log('graphprops', props);
            return {
                variables: {
                    id: props.currentUser.id,
                },
            };
        },
    })
)(withApollo(EventForm));
