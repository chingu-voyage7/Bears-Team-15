import React from "react"
import { connect } from "react-redux"
import "./forms.scss"
import { addNewEvent } from "../../../util/graphQLQuery"
import { closeModal } from "../../../reduxes/actions/modal_actions";
import { graphql, compose } from 'react-apollo';
import { getUser } from '../../../util/graphQLQuery';
import { withApollo } from 'react-apollo'
const EventForm = ({ event, client, currentUser, closeModal }) => {
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

    }
    const onSubmit = (event) => {
        event.preventDefault();
        closeModal();
        client.mutate({
            mutation: addNewEvent,
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
            refetchQueries: [{
                query: getUser,
                variables: { id: currentUser.id },
            }],
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
    currentUser: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => { dispatch(closeModal()); }
});
export default compose(connect(
    mapStateToProps,
    mapDispatchToProps
    // replace with edit user
), graphql(getUser, {
    name: "getUser", options: (props) => {
        console.log("graphprops", props)
        return {
            variables: {
                id: props.currentUser.id
            }
        }
    }
}))(withApollo(EventForm));