import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditTicketForm (props) {
  const firestore = useFirestore();

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    const propertiesToUpdate = {
      names: event.target.names.value,
      location: event.target.location.value,
      issue: event.target.issue.value
    }
  }

  return (
    firestore.update({collection: 'tickets', doc: ticket.id }, propertiesToUpdate)
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
};

export default EditTicketForm;