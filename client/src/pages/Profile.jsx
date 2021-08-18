import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import Button from "../components/Base/Button";
import apiHandler from "../api/apiHandler";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import CardItemProfile from "../components/Forms/CardItemProfile";



class Profile extends Component {
  state = {
    number: "",
    items: []
  }

  async componentDidMount(){
    try{
      const dataItems = await apiHandler.getPersonalItems()
      this.setState({items: dataItems}, () => console.log(this.state.items))
    }
    catch(err){
      console.log(err)
    }
  }

  handleSubmit = (event) => { 
    event.preventDefault()
    const data = this.props.authContext.user
    data.phoneNumber = this.state.number 
    console.log(data)
    apiHandler
    .editProfile(data)
    .then((res) => {
      this.props.history.push('/profile')
    })
    .catch((err) => {
      console.log(err)
      
    })

  }

  handleChange = (event) => {
    this.setState({
      number: event.target.value
    })
  }
  
  render() {
    const { authContext } = this.props;
    const { user } = authContext;

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        {!user && (
          <>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>
        </>
        )}

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>
          {
            !user.phoneNumber ? (
            <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.handleSubmit}>
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
                  value={this.state.number}
                  onChange={this.handleChange}
                />
              </div>
              <Button className="form__button">Add phone number</Button>
            </form>
          </div>
          ) : (
            <div> {user.phoneNumber} </div>
          )
          }
          

          {/* Break whatever is belo  */}
          {!this.state.items.length && 
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
                <p>You don't have any items :(</p>
            </div>
          </div>}


          {this.state.items.length && (
            this.state.items.map(item => <CardItemProfile key={item._id} item = {item}/>)
         )}
        </section>
      </div>
    );
  }
}

export default withRouter(withUser(Profile));
