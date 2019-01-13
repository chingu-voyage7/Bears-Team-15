import React from "react"
import {connect} from "react-redux"
import "./forms.scss"
const EventForm=({event})=>{
let form={
    Title: '',
    Organization: '',
    Address: '',
    City: '',
    State: '',
    Zip: '',
    Time: '',
    Category: ''
}
   
const onChange=(event)=>{
 console.log('name', event.target.name);
 console.log('input', event.target.value);

form[event.target.name]= event.target.value;
console.log(form);

}
return(<div className="modal-form modal-event">
<form>
    <h2>New Event</h2>
   <div className="modal-event-field"><label>Title</label><input name="Title" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>Organization(optional)</label><input name="Organization" onChange={onChange}/></div>
   <div className="modal-event-field"><label>Address</label><input name="Address" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>City</label><input name="City" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>State</label><input name="State" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>Zip</label><input name="Zip" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>Time</label><input name="Time" onChange={onChange} required/></div>
   <div className="modal-event-field"><label>Category</label><input name="Category" onChange={onChange} required/></div>
   {/*public or private needs field */}
   <button>Submit</button>
   </form>
    {/* organization: "Portland Volunteers NW",
    organizor: { username: "CoolGuy", role: "Organizor", image: avatar },
    eventDetails: "Join us Saturday, Jan 24th @9AM for a beach cleanup",
    location: "seaside townhall, some addresss",
    attendees: [
        { username: "CoolGuy", role: "Organizor", image: avatar },
        { username: "T0mCat", role: "Volunteer", image: cat },
        { username: "Rawf", role: "Volunteer", image: cat },
        { username: "SumDude", role: "Attendee", image: cat }
    ],
    supplies: [{ item: "bags", quantity: 24, volunteers: [{ user: "T0mCat", qty: 12 }, { user: "Rawf", qty: 12 }] },
    { item: "shovels", quantity: 24, volunteers: [{ user: "T0mCat", qty: 2 }, { user: "Rawf", qty: 3 }] }] */}


</div>);
}

const mapStateToProps=(state)=>({
// get supplies list
});
const mapDispatchToProps=(dispatch)=>({
// update supplies list
});
export default connect(mapStateToProps,mapDispatchToProps)(EventForm)