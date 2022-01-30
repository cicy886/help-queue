import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as a from "./../actions";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // formVisibleOnPage: false,
      // mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(
      () => this.updateTicketElapsedWaitTime(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach((ticket) => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  };

  // Code before using Redux
  // handleAddingNewTicketToList = (newTicket) => {
  //     const newMainTicketList = this.state.mainTicketList.concat(newTicket);
  //     this.setState({mainTicketList: newMainTicketList,
  //                   formVisibleOnPage: false });
  //   }

  // Code using Redux
  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        // formVisibleOnPage: false,
        selectedTicket: null,
        editing: false,
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
    //   this.setState(prevState => ({
    //   //   formVisibleOnPage: !prevState.formVisibleOnPage,
    // }));
  };

  // Code before using Redux
  // handleChangingSelectedTicket = (id) => {
  //   const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
  //   this.setState({selectedTicket: selectedTicket});
  // }

  // Code before using Redux
  // handleDeletingTicket = (id) => {
  //   const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
  //   this.setState({
  //     mainTicketList: newMainTicketList,
  //     selectedTicket: null
  //   });
  // }

  // Code using Redux
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  };

  // Code using Redux
  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = a.deleteTicket(id);
    dispatch(action);
    this.setState({ selectedTicket: null });
  };

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true });
  };

  // Code before using Redux
  // handleEditingTicketInList = (ticketToEdit) => {
  //   const editedMainTicketList = this.state.mainTicketList
  //     .filter(ticket => ticket.id !== this.state.selectedTicket.id)
  //     .concat(ticketToEdit);
  //   this.setState({
  //       mainTicketList: editedMainTicketList,
  //       editing: false,
  //       selectedTicket: null
  //     });
  // }

  // Code using Redux
  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = a.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null,
    });
  };

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = (
        <EditTicketForm
          ticket={this.state.selectedTicket}
          onEditTicket={this.handleEditingTicketInList}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = (
        <TicketDetail
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick}
        />
      );
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = (
        <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      );
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = (
        <TicketList
          ticketList={/*this.state.mainTicketList*/ this.props.mainTicketList}
          onTicketSelection={this.handleChangingSelectedTicket}
        />
      );
      buttonText = "Add Ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage,
  };
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;
