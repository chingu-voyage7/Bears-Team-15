import React from "react"
import {connect} from "react-redux"
import "./forms.scss"
const SuppliesForm=(supplies,addSupplies,removeSupplies)=>{
return(<div className="modal-form">
<div><h2>Bags</h2><p>needed: 24</p><p>fulfilled: 12</p></div>
<p>We need bags bigger than 2l for carrying trash</p>
<div>
    <h2>Volunteer</h2>
 <label>Qty</label>    
 <input/>
 <button>Add</button>
 <button>Clear</button>!removes all items
</div>
</div>);
}

const mapStateToProps=(state)=>({
// get supplies list
});
const mapDispatchToProps=(dispatch)=>({
// update supplies list
});
export default connect(mapStateToProps,mapDispatchToProps)(SuppliesForm)