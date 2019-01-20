import React from "react"
import { connect } from "react-redux"
import "./forms.scss"
import { addNewEvent } from "../../../util/graphQLQuery"
const EventForm = ({ event, client, currentUser }) => {
    let form = {
        title: '',
        organizer: currentUser.id,
        organization: '',
        description: '',
        Address: '',
        city: '',
        state: '',
        zip: '',
        category: ''
    }

    const onChange = (event) => {
        console.log('name', event.target.name);
        console.log('input', event.target.value);

        form[event.target.name] = event.target.value;
        console.log(form);

    }
    const onSubmit = (event) => {
        event.preventDefault();
        client.mutate({
            variables: { 
                organizer: form.organizer, 
                organization: form.organization, 
                title: form.title, 
                address: form.address, 
                city: form.city,
                state: form.state,
                zip: parseInt(form.zip),
                category: form.category
             },
            mutation: addNewEvent
        }).then((data) => {
            console.log('success:', data);
        });

    }
    return (<div className="modal-form">
        <form className="modal-event" onSubmit={onSubmit}>
            <h2>New Event</h2>
            <div className="modal-event-field"><label>Title</label><input name="title" onChange={onChange} required /></div>
            <div className="modal-event-field"><label>Organization(optional)</label><input name="organization" onChange={onChange} /></div>
            <div className="modal-event-field"><label>Description</label><input name="description" onChange={onChange} required /></div>
            <div className="modal-event-field"><label>Address</label><input name="address" onChange={onChange} required /></div>
            <div className="modal-event-field"><label>City</label><input name="city" onChange={onChange} required /></div>
            <div className="modal-event-field"><label>State</label><input name="state" onChange={onChange} required /></div>
            <div className="modal-event-field"><label>Zip</label><input name="zip" onChange={onChange} required /></div>
            {/* <div className="modal-event-field"><label>Time</label><input name="time" onChange={onChange} required /></div> */}
            <div className="modal-event-field"><label>Category</label><input name="category" onChange={onChange} required /></div>
            {/*public or private needs field */}
            <button>Submit</button>
        </form>
    </div>);
}

const mapStateToProps = (state) => ({
    // get supplies list
    currentUser: state.currentUser,
    client: state.client
});
const mapDispatchToProps = (dispatch) => ({
    // update supplies list
});
export default connect(mapStateToProps, mapDispatchToProps)(EventForm)