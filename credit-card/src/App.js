import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Cards from 'react-credit-cards-2';
import './App.css'
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const App = () => {

  const unique_id = uuid();
  const [messageNo, setMessageNo] = useState('');
  const [messageCVC, setMessageCVC] = useState('');
  const [messageName, setMessageName] = useState('');
  const [messageExpiry, setMessageExpiry] = useState('');
  
  const small_id = unique_id.slice(0, 5);
  const timeStamp = Date.now();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });


  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));



  }
  const handleClick = (e) => {


    if (!state.number) {
      setMessageNo('Please Enter Card Number !');
      return;
    }

    if (!state.cvc) {
      setMessageCVC('Please enter CVC !');
      return;
    }

    if (!state.expiry) {
      setMessageExpiry('Please enter Expiry Date !');
      return;
    }

    if (!state.name) {
      setMessageName('Please enter Name !');

    }
    if (state.number.length > 16) {
      setMessageNo('Number Can not be greater than 16 digit !');

    }

    else {
      setMessageNo('');

    }
    if (state.cvc.length > 4) {
      setMessageCVC('CVC Can not be greater than 4 digit !');

    }
    else {
      setMessageCVC('');

    }

    if (state.expiry.length > 4) {
      setMessageExpiry('Please Enter date in proper Format !');

    }
    else {
      setMessageExpiry('');
    }

    

  }

  
  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));

  }

 function isnull(){
    let isValidate=false;
    if(state.name ==='' || state.number==='' || state.cvc===''|| state.expiry==='')
    {
      isValidate=true;
      return isValidate
    }
return isValidate
  }

  function reset(){
        state.number='';
         state.cvc='';
         state.expiry='';
         state.name=''
  }
 const handleSubmit =  (e) => {
    e.preventDefault();


    
const posts={
    "success": true, "data": {
    "requestId": timeStamp,
    "name": state.name,
    "requestDate": small_id
    } } 

    if(isnull()===true)
      return true;
      
    const requestOptions = {
      method: 'POST',
      headers: { Accept: "application/json",'Content-Type': 'application/json' ,'origin':'https://instacred.me'},
      body: JSON.stringify({ posts})
  };
console.log(requestOptions.body);
  fetch('https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9', requestOptions)
        .then(response => response.json())
        .then((posts) => {
            console.log("user data", posts);
            
         
        }).catch((error)=>{
          console.log(error);
        })
        reset();
}  ;




  return (
    <div className='App'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className='heading'>
        <h1>Card Details</h1>
      </div>
      <div className="payment">
        <form onSubmit={handleSubmit}>


          <div className="form-group" id="name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control"
              id="name"
            />{messageName}
          </div>

          <div className="form-group" id="card-number-field">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="tel"
              name="number"
              pattern="[0-9]*"
              placeholder="xxxx-xxxx-xxxx-xxxx"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control"
              id="card-number-field" />{messageNo}
          </div>
          <div className="form-group name">
            <label htmlFor="expiration-date">Expiry</label>
            <input
              type="text"
              pattern="[0-9]*"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              id="expiration-date"
              className="form-control"
            />{messageExpiry}
          </div>
          <div className="form-group cvc">
            <label htmlFor="cvc">CVC</label>
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control"
              id="cvc"
              pattern="[0-9]*"
            />{messageCVC}
          </div>

          <div className="form-group" id="pay-now">
            <button type="submit" className="btn btn-default" id="confirm-purchase" onClick={handleClick}>Confirm</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default App;