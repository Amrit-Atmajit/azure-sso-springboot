import React, { Component } from 'react'
import WriteToUsService from '../../services/WriteToUsService';

class CreateWriteToUsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            userName: '',
            emailId: '',
            phoneNumber: '',
            message: ''
        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.saveOrUpdateWriteToUs = this.saveOrUpdateWriteToUs.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            WriteToUsService.getWriteToUsById(this.state.id).then( (res) =>{
                let writeToUs = res.data;
                this.setState({
                    userName: writeToUs.userName,
                    emailId : writeToUs.emailId,
                    phoneNumber: writeToUs.phoneNumber,
                    message: writeToUs.message
                });
            });
        }        
    }
    saveOrUpdateWriteToUs = (e) => {
        e.preventDefault();
        let writeToUs = {userName: this.state.userName, emailId: this.state.emailId, phoneNumber: this.state.phoneNumber, message: this.state.message};
        console.log('writeToUs => ' + JSON.stringify(writeToUs));

        // step 5
        if(this.state.id === '_add'){
            WriteToUsService.createWriteToUs(writeToUs).then(res =>{
                this.props.history.push('/writeToUs');
            });
        }else{
            WriteToUsService.updateWriteToUs(writeToUs, this.state.id).then( res => {
                this.props.history.push('/writeToUs');
            });
        }
    }
    
    changeUserNameHandler= (event) => {
        this.setState({userName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changeMessageHandler= (event) => {
        this.setState({message: event.target.value});
    }

    cancel(){
        this.props.history.push('/writeToUs');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add WriteToUs</h3>
        }else{
            return <h3 className="text-center">Update WriteToUs</h3>
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
                                            <label> User Name: </label>
                                            <input placeholder="User Name" name="userName" className="form-control" 
                                                value={this.state.userName} onChange={this.changeUserNameHandler}/>
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
                                        <div className = "form-group">
                                            <label> Message: </label>
                                            <input placeholder="Message" name="message" className="form-control" 
                                                value={this.state.message} onChange={this.changeMessageHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateWriteToUs}>Save</button>
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

export default CreateWriteToUsComponent
