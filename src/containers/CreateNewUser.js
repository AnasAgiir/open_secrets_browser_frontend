import React, { Component } from "react";
import NewUserModal from "../presentational/NewUserModal";

class CreateNewUser extends Component {
  constructor() {
    super();
    this.state = {
      newUserForm: false,
      newUserName: "",
      newUserEmail: ""
    };
  }

  checkForNewUser = e => {
    this.setState({ newUserForm: true });
  };

  handleCreateUserName = e => {
    this.setState({ newUserName: e.target.value });
  };
  handleCreateUserEmail = e => {
    this.setState({ newUserEmail: e.target.value });
  };

  handleSubmitCreateUser = e => {
    e.preventDefault();
    fetch("https://open-secrets-project-backend.herokuapp.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newUserName,
        email: this.state.newUserEmail
      })
    })
      .then(resp => resp.json())
      .then(json => {
        this.props.newUserName(this.state.newUserName);
        this.props.newUserEmail(this.state.newUserEmail);
        this.props.newUserId(json.id);
      });
  };

  render() {
    return (
      <div>
        <NewUserModal
          newUsername={this.state.newUserName}
          usernameChange={e => this.handleCreateUserName(e)}
          newUserEmail={this.state.newUserEmail}
          emailChange={e => this.handleCreateUserEmail(e)}
          submitLogin={e => this.handleSubmitCreateUser(e)}
        ></NewUserModal>
      </div>
    );
  }
}

export default CreateNewUser;
