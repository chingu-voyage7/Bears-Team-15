import React from "react"
import {connect} from "react-redux"
import "./forms.scss"
const SuppliesForm=(supplies,addSupplies,removeSupplies)=>{
return(<div className="supplies">
this is the supply form
</div>);
}

const mapStateToProps=(state)=>({
// get supplies list
});
const mapDispatchToProps=(dispatch)=>({
// update supplies list
});
export default connect(mapStateToProps,mapDispatchToProps)(SuppliesForm)