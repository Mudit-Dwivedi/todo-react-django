
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css'
import Plan from './component/Plan'


import React, { Component } from 'react'
import axios from 'axios';




const ai = axios.create({
  baseURL : 'http://127.0.0.1:8000/api'
})





export default class App extends Component {
  state ={
    items: [],
    text: ""
  }
  handleChange = e => {
    this.setState({text: e.target.value})
  }


showPlan = () =>{
  ai.get('/list/')
  .then((res) => {
    this.setState({items: res.data})
  })
}
addPlan = (d) => {
  ai.post('/create/',d)
  .then((res)=> {
     this.setState({text: ''})
     this.showPlan()
  }) 
}

handleAdd = e => {
  let dt = { item: this.state.text }; // Correct field name
  this.addPlan(dt);
};


handleDelete = id => {
  console.log("delete", id);
  ai.delete(`/delete/${id}`)
    .then((res) => {
      console.log("Item deleted successfully");
      this.showPlan(); // Refresh the list of items after deletion
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
};


componentDidMount(){
  this.showPlan()
}

  render() {
    return (   
    <div className="container-fluid my-5">
      <div className='row'>
         <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
          <h2 className='text-center'>Today's Plan</h2>
          <div className='row'>
           <div className=' col-9'>
            <input type="text"  className='form-control'
            placeholder='Write Plan Here' value={this.state.text}
            onChange={this.handleChange}
            />

           </div>
           <div className="col-2">
            <button className='btn btn-warning px-5 fw-bold' onClick={this.handleAdd}>Add</button>
           </div>
           <div className='container-fluid'>
          <ul className='list-unstyled row m-5'>
        {
          this.state.items.map((value,i) => {
            return <Plan key={i} id={value.id} value={value.item} sendData={this.handleDelete} />
          })
        }
        
          </ul>
           </div>

          </div>
         </div>
      </div>
     
    </div>
  );
    
  }
}
