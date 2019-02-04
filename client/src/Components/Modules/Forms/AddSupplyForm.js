import React from 'react';
import { connect } from 'react-redux';
import './forms.scss';
import { addSupply, getEventById } from '../../../util/graphQLQuery';
import { closeModal } from '../../../reduxes/actions/modal_actions';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';

const AddSupplyForm = ({ event, client, currentUser, data, closeModal }) => {
    let form = {
        eventId: data,
        name: '',
        description: '',
        quantity: 0
    };


    const onChange = (event) => {
        form[event.target.name] = event.target.value;
        // set fields
    };
    const onSubmit = (event) => {
        form.quantity=parseInt(form.quantity);
        event.preventDefault();
        closeModal();
        client.mutate({
            mutation: addSupply,
            variables: form,
            refetchQueries: [
                {
                    query: getEventById,
                    variables: { id: data },
                },
            ],
        });
    };

    return (<div className="modal-form">
    <form className="modal-event" onSubmit={onSubmit}>
        <h2>Add Supply</h2>
        <div className="modal-event-field"><label>Name</label><input type="text" name="name" onChange={onChange}  required/></div>
        <div className="modal-event-field"><label>Description</label><input type="text" name="description" onChange={onChange} required/></div>
        <div className="modal-event-field"><label>Quantity Needed</label><input type="number" name="quantity" onChange={onChange} required/></div>
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
        name: 'getEventById',
        options: (props) => {
            console.log('graphprops', props);
            return {
                variables: {
                    id: props.data.eventID,
                },
            };
        },
    })
)(withApollo(AddSupplyForm));
