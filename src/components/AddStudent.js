import { Button, Input, Alert } from '@mui/material';
import React, { Component } from 'react';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {email: null, firstName: null, lastName: null, status_code: 0, status: null,
                      addedEmail: null, addedName: null, addedStatusCode: null, addedStatus: null, addedStudentId: null};
    }

    updateFields = (event) => {

        if (event.target.id === "firstName") {
            this.setState({firstName: event.target.value})
        }else if (event.target.id === "lastName") {
            this.setState({lastName: event.target.value})
        }else if (event.target.id === "email") {
            this.setState({email: event.target.value})
        }else if (event.target.id === "status") {
          this.setState({status: event.target.value})
        }else if (event.target.id === "status_code") {
            this.setState({status_code: event.target.value})
        }

    }

    checkFields = async () => {

      if ((this.state.email && this.state.firstName && this.state.lastName)) {

        const settings = {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_name: this.state.firstName + " " + this.state.lastName,
            student_email: this.state.email,
            status_code: this.state.status_code,
            status: this.state.status 
          })
        };
        try {
            const fetchResponse = await fetch('http://localhost:8080/student', settings);
            const data = await fetchResponse.json();
            this.setState({addedEmail: data.email, addedName: data.name,
                            addedStudentId: data.student_id, addedStatus: data.status, addedStatusCode: data.statusCode});
            document.getElementById("error").hidden = true;
            document.getElementById("addedList").hidden = false;
            return data;
        } catch (e) {
            return e;
        }
    }else {
      this.state.message = "Please fill out all fields."
      document.getElementById("error").hidden = false;
    }

    }

      render() {

        return (

            <div className="">

                <Input onChange={this.updateFields} id="firstName" placeholder='First Name'></Input><br></br>
                <Input onChange={this.updateFields} id="lastName" placeholder='Last Name'></Input><br></br>
                <Input onChange={this.updateFields} id="email" placeholder='Email'></Input><br></br>
                <Input onChange={this.updateFields} id="status_code" placeholder='Status Code'></Input><br></br>
                <Input onChange={this.updateFields} id="status" placeholder='Status'></Input><br></br>

                <Button onClick={this.checkFields}
                    variant="outlined" color="primary" id="add-student" style={{margin: 10}}>
                    Add Student
                </Button>

                <div hidden id='error'>
                  <Alert severity="error">Please fill out necessary fields.</Alert>
                </div>


                <ul id="addedList" hidden>
                  <li>{this.state.addedStudentId}</li>
                  <li id="addedName">{this.state.addedName}</li>
                  <li id="addedEmail">{this.state.addedEmail}</li>
                  <li id="addedCode">{this.state.addedStatusCode}</li>
                  <li id="addedStatus">{this.state.addedStatus}</li>
                </ul>

            </div>

        );

      }

}

export default AddStudent;