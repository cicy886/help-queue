import React from "react";
//import { v4 } from "uuid";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
//import Moment from 'moment';
import { useFirestore } from 'react-redux-firebase'

function NewTicketForm(props) {

  const firestore = useFirestore();

  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketCreation();
    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value, 
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
      }
    );
  }


  // function handleNewTicketFormSubmission(event) {
  //   event.preventDefault();
  //   props.onNewTicketCreation({
  //     names: event.target.names.value,
  //     location: event.target.location.value, 
  //     issue: event.target.issue.value,
  //     id: v4(),
  //     timeOpen: new Moment(),
  //     formattedWaitTime: new Moment().fromNow(true)
  //   });
  // }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addTicketToFirestore}
        buttonText="Help!" />
    </React.Fragment>
  );
  
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;
