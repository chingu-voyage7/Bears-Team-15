import React from 'react';
import { connect } from 'react-redux';
import './forms.scss';
import { addSupply, getEventById } from '../../../util/graphQLQuery';
import { closeModal } from '../../../reduxes/actions/modal_actions';
import { graphql, compose } from 'react-apollo';
import { getUser } from '../../../util/graphQLQuery';
import { withApollo } from 'react-apollo';
import Calendar from 'react-calendar';
const AddSupplyForm = ({ event, client, currentUser, data, closeModal }) => {
    let form = {
        eventId: '',
        name: '',
        description: '',
        quantity: ''
    };

    const onChange = (event) => {
        form[event.target.name] = event.target.value;
        // set fields
    };
    const onSubmit = (event) => {
        event.preventDefault();
        closeModal();
        client.mutate({
            mutation: addSupply,
            variables: {

            },
            refetchQueries: [
                {
                    query: getEventById,
                    variables: { id: data.eventId },
                },
            ],
        });
    };

    return (<div className="modal-form">
    <form className="modal-event" onSubmit={onSubmit}>
        <h2>Add Supply</h2>
        <div className="modal-event-field"><label>Name</label><input type="text" name="name" onChange={onChange} placeholder={data.firstName}/></div>
        <div className="modal-event-field"><label>Description</label><input type="url" name="description" onChange={onChange} placeholder={data.image}/></div>
        <div className="modal-event-field"><label>Quantity Needed</label><input type="email" name="quantity" onChange={onChange} placeholder={data.email}/></div>
        <button>Submit</button>
    </form>
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
    graphql(getEventById, {
        name: 'getUser',
        options: (props) => {
            console.log('graphprops', props);
            return {
                variables: {
                    id: props.data.eventId,
                },
            };
        },
    })
)(withApollo(AddSupplyForm));
