import React from 'react'
import { withRouter } from 'react-router-dom'
import apiHandler from '../../api/apiHandler'
import { Link } from 'react-router-dom'
const CardItemProfile = ({item, ...rest}) => {

    const handleDelete = async (id) => {
        try{
            await apiHandler.deleteItem(id)
            rest.history.push('/profile')
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="CardItem">
        <h3>{item.name}</h3>
        <div className="item">
          <div className="round-image">
            <img
              src={item.image}
              alt={item.name}
            />
          </div>
          <div className="description">
            <h2>{item.category}</h2>
            <h4>Quantity: {item.quantity} </h4>
            <p>{item.description}</p>
            <div className="buttons">
              <span>
                <button onClick={() => handleDelete(item._id)} className="btn-secondary">Delete</button>
              </span>
              <span>
                <Link to={{
                  pathname: '/item/create',
                  state: {
                    item: item,
                  }
                }} className="btn-primary" >Edit</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default withRouter(CardItemProfile)