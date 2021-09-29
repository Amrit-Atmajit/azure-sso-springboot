import React, { Component } from 'react'
import CareerService from '../../services/CareerService';

class CreateCandidateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            fullName: '',
            emailId: '',
            phoneNumber: ''
        }
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.saveOrUpdateCandidate = this.saveOrUpdateCandidate.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CareerService.getCareerById(this.state.id).then( (res) =>{
                let candidate = res.data;
                this.setState({fullName: candidate.fullName,
                    emailId : candidate.emailId,
                    phoneNumber: candidate.phoneNumber
                });
            });
        }        
    }
    saveOrUpdateCandidate = (e) => {
        e.preventDefault();
        let candidate = {fullName: this.state.fullName, emailId: this.state.emailId, phoneNumber: this.state.phoneNumber};
        console.log('candidate => ' + JSON.stringify(candidate));

        // step 5
        if(this.state.id === '_add'){
            CareerService.createCandidate(candidate).then(res =>{
                this.props.history.push('/candidates');
            });
        }else{
            CareerService.updateCandidate(candidate, this.state.id).then( res => {
                this.props.history.push('/candidates');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Candidate</h3>
        }else{
            return <h3 className="text-center">Update Candidate</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
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

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCandidate}>Save</button>
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

export default CreateCandidateComponent
