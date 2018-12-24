import React from'react'
import './search.css'
class Search extends React.Component{

    constructor(props){
        super(props);

        this.state={
            search:"",
            sampleData:[],
            data:[],
            sampleSchema:{
                title: "event",
                description: "description",
                date: Date(Date.now()).toString(),
                location: "Long Beach, CA"
            }
        }
    }

componentDidMount(){
    

    this.setState({sampleData: this.setData()});
}

setData=()=>{
   let dataset=[];
    for(let i=0;i<10;i++){
    dataset.push(this.state.sampleSchema);
    } 

    return dataset;
}

// search=(event)=>{
// let search= event.target.input;
// console.log(event);

// //search()
// }

render(){
return(<div>
    <form>
    <div className="search-form">
        <label>Search</label>
        <input/>
        <button>Go!</button>
    </div>
    
    </form>
    
{this.state.sampleData.map((item)=>{
   return(<div className="search-event"><h1>{item.title}</h1><p>{item.description}</p><p>{item.date}</p></div>)
})}
</div>);
}

}




export default Search