import React from "react"
import { connect } from "react-redux"
import { graphql, compose } from 'react-apollo';
import {getUser} from '../../../util/graphQLQuery';
import "./forms.scss"
import {closeModal} from "../../../reduxes/actions/modal_actions";
const EventForm = ({ event, client, currentUser,data}) => {
    let form = {
        firstName: '',
        image: currentUser.id,
        email: '',
        phone: ''
    }
    
    const onChange = (event) => {
        console.log('name', event.target.name);
        console.log('input', event.target.value);
        console.log('frommodal',data);
        form[event.target.name] = event.target.value;
        console.log(form);

    }
    const onSubmit = (event) => {
        event.preventDefault();
        client.mutate({}).then((data) => {
            closeModal();
           
        });

    }
    return (<div className="modal-form">
        <form className="modal-event" onSubmit={onSubmit}>
            <h2>Edit Profile</h2>
            <div className="modal-event-field"><label>Name</label><input type="text" name="firstName" onChange={onChange} placeholder={data.firstName}/></div>
            <div className="modal-event-field"><label>Avatar</label><input type="url" name="image" onChange={onChange} placeholder={data.image}/></div>
            <div className="modal-event-field"><label>Email</label><input type="email" name="email" onChange={onChange} placeholder={data.email}/></div>
            <div className="modal-event-field"><label>Phone</label><input type="text" name="phone" onChange={onChange} placeholder={data.phone}/></div>
            {/*public or private needs field */}
            <button>Submit</button>
        </form>
    </div>);
}


const mapStateToProps = (state) => ({
    // get supplies list
    currentUser: state.currentUser,
    client: state.client,
    data: state.modal.data
});
const mapDispatchToProps = (dispatch) => ({
    closeModal: ()=>{dispatch(closeModal());}
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
}))(EventForm);