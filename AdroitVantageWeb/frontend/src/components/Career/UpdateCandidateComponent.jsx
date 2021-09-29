import React, { Component } from 'react'
import CareerService from '../../services/CareerService';

class UpdateCandidateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fullName: '',
            emailId: '',
            phoneNumber: ''
        }
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.updateCandidate = this.updateCandidate.bind(this);
    }

    componentDidMount(){
        CareerService.getCandidateById(this.state.id).then( (res) =>{
            let candidate = res.data;
            this.setState({fullName: candidate.fullName,
                emailId : candidate.emailId,
                phoneNumber: candidate.phoneNumber
            });
        });
    }

    updateCandidate = (e) => {
        e.preventDefault();
        let candidate = {fullName: this.state.fullName, emailId: this.state.emailId, phoneNumber: this.state.phoneNumber};
        console.log('candidate => ' + JSON.stringify(candidate));
        console.log('id => ' + JSON.stringify(this.state.id));
        CareerService.updateCandidate(candidate, this.state.id).then( res => {
            this.props.history.push('/candidates');
        });
    }

    changeFullNameHandler= (event) => {
        this.setState({fullName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    cancel(){
        this.props.history.push('/candidates');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Candidate</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Full Name: </label>
                                            <input placeholder="Full Name" name="fullName" className="form-control" 
                                                value={this.state.fullName} onChange={this.changeFullNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone Number: </label>
                                            <input placeholder="Phone Number" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.updateCandidate}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateCandidateComponent
