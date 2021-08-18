import React from "react";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import apiHandler from "../api/apiHandler";
import '../styles/CardItem.css'

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
      console.log(this.state.items  )
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
  return (
    <>
   
      <Map
        style="mapbox://styles/piskouille/cksg64s8iem8218qqfmdcvyzd"
        center ={[2.3522219, 48.856614]}
        containerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw'
        }}
      >
        
        {this.state.items.map(item => {

          return(
            <React.Fragment key={item._id}>
              <Marker
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

                  {item.infoWindow && (
                      <div
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          top: 0,
                          left: 0,
                          backgroundColor: 'white',
                          width: 300,
                          height: 400,
                          padding: 30,
                          margin: 40,
                          borderRadius: 40
                        }}>
                        <div style={{
                          display: 'flex',
                          height: '100%',
                          flexDirection : 'column',
                          justifyContent: 'space-evenly',
                          WebkitAlignItems: 'center',
                        }}>
                            <span style={{
                              display: 'inline-block',
                              position: 'absolute',
                              top: 15,
                              left: 15,
                              fontSize: 22
                            }}
                            onClick={this.handleInfoWindow}> close </span>
                            <img style={{
                              width: '50%',
                              height: 'auto'
                            }} 
                            src={item.image} alt={item.name} />
                            <h1> {item.name} </h1>
                            <div>
                              <span>Quantity: {item.quantity} | </span>
                              <span>{item.category}</span>
                            </div>
                            <div style={{
                              padding: '10px 20px',
                              borderRadius: '40px',
                              background: 'rgb(220,220,220)',
                              width: '100%'}}
                            >{item.description}</div>
                            <div>{item.formattedAddress}</div>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                              <img style={{
                                width: 30,
                                borderRadius: '50%'
                              }} src={item.creator.profileImg} alt={item.creator.firstName} />
                              <span style={{display: 'inline-block'}}>Given away by {item.creator.firstName}</span>
                            </div>
                            <div style={{
                              padding: '10px 20px',
                              borderRadius: '40px',
                              background: 'rgba(75,0,130, .2)',
                              color: 'rgb(75,0,130)'
                            }}>contact {item.creator.firstName} at <span style={{fontWeight: 600}}>{item.creator.email}</span></div>


                        </div>
                      </div>
                  )}
            </React.Fragment>
          )
        })} 
      </Map>
    </>
  )};
};

export default Home;


