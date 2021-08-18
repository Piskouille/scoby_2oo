import React, { Component } from 'react'


const PhoneForm = ({component: Component}) => {
    if (!Component.phone) {
        return (
            <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form">
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                />
              </div>
              <Button className="form__button">Add phone number</Button>
            </form>
          </div>
        )
    }else{
        return (
            <div></div>
        )
    }
}

export default PhoneForm
