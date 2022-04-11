import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    Amount: 0,
    Description: "",
    Type: "Debit",
    Balance:0
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    retrieveTutorials();
  }, []);


  const retrieveTutorials = () => {
    
    TutorialDataService.getAll()
      .then((response) => {
        if(response.data.length >0){
          var data = response.data[response.data.length - 1];
          setTutorial({...tutorial, Balance:data.Balance})
          //console.log("Balance", data,tutorial)
        }
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    let initialVal = tutorial.Balance;
    console.log(tutorial,initialVal,"abc");
    if (tutorial.Type === "Credit") {
      initialVal = parseInt(initialVal) + parseInt(tutorial.Amount);
    } else {
      initialVal = parseInt(initialVal) - parseInt(tutorial.Amount);
    }

    console.log(typeof initialVal,  initialVal);
    var data = {
      Amount: tutorial.Amount,
      Type: tutorial.Type,
      Description: tutorial.Description,
      Balance: initialVal
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          Amount: response.data.Amount,
          Description: response.data.Description,
          Type: response.data.Type,
          Balance: initialVal
        });
        setTutorial(initialTutorialState);
        setSubmitted(true);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    retrieveTutorials();
    
    setSubmitted(false);
    console.log("asd",tutorial);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="Amount"
              required
              value={tutorial.Amount}
              onChange={handleInputChange}
              name="Amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Type">Type</label>
            <select
              type="text"
              className="form-control"
              id="Type"
              required
              onChange={handleInputChange}
              name="Type">
                <option>Debit</option>
                <option>Credit</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              className="form-control"
              id="Description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="Description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
