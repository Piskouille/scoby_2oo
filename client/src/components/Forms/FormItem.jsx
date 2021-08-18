import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import Button from "../Base/Button";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";

class ItemForm extends Component {
  state = {
    name: '',
    category: "-1",
    quantity: 1,
    formattedAddress: '',
    description: '',
    image: '',
    contact: '',
    location: null
  };

  handleChange = (event) =>{
    const name = event.target.name
    if(name === 'formattedAddress') return 

    let value = event.target.type === 'radio' ? event.target.id : event.target.value

    this.setState({
      [name]: value    
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const postData = JSON.stringify(this.state);
    const formData = new FormData();
    formData.append("postData", postData);


    console.log(formData)

    await apiHandler.postItem(formData)
    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {

    this.setState({
      formattedAddress: place.place_name, 
      location : {
        coordinates : place.geometry.coordinates,
        type : place.geometry.type,
      }
    })
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" encType='multipart/form-data' onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              name="name"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select id="category" name="category" onChange={this.handleChange} value={this.state.category} >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input className="input" name="quantity" id="quantity" type="number" onChange={this.handleChange} value={this.state.quantity}/>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
              name="description"
              onChange={this.handleChange}
              value={this.state.namedescription}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" id="image" type="file" name='image' onChange={this.handleChange} value={this.state.image}/>
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" id='email' name="contact" onChange={this.handleChange}/>
              user email
            </div>
            <input type="radio" id='phone' name="contact" onChange={this.handleChange}/>
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <Button className="btn-submit">Add Item</Button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
