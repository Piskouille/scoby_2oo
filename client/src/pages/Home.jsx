import React from "react";
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import apiHandler from "../api/apiHandler";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  dragRotate: false
});

class Home extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      items : []
    }

    this.handleInfoWindow = this.handleInfoWindow.bind(this)
  }

  async componentDidMount(){
    try{
      const items = await apiHandler.getItems()
      
      items.forEach(item => item.infoWindow = false)

      this.setState({items: items})
    }
    catch(err){
      console.log(err)
    }
  }

  handleInfoWindow(id){
    const dummyInfoWindows = this.state.items

    dummyInfoWindows.forEach(item => {
      if(item._id === id){
        item.infoWindow = true
      } 
      else{
        item.infoWindow = false
      }
    })

    this.setState({items: dummyInfoWindows})
  }




  render(){
    console.log(this.state.infoWindows)
  return (
    <div>
      <h1>MAPBOX  :</h1>
    
      <Map
        style="mapbox://styles/piskouille/cksg64s8iem8218qqfmdcvyzd"
        center ={[2.3522219, 48.856614]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
      
        {this.state.items.map(item => {

  

           return(
            <Marker
            key={item._id}
              coordinates={item.location.coordinates.reverse()}
              anchor="bottom"
              style={{
                width:35,
                height: 35
              }}
              onClick={() => this.handleInfoWindow(item._id)}  
            >
              <img src={item.image} alt={item.name}/>
            </Marker>
 
        )})}







      </Map>;
    </div>
  )};
};

export default Home;


