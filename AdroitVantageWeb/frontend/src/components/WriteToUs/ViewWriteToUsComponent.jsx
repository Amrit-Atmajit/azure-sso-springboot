import React, { Component } from 'react'
import WriteToUsService from '../../services/WriteToUsService'

class ViewWriteToUsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            writeToUs: {}
        }
    }

    componentDidMount(){
        WriteToUsService.getWriteToUsById(this.state.id).then( res => {
            this.setState({writeToUs: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View { this.state.writeToUs.userName }'s Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> User Name: </label>
                            <div> { this.state.writeToUs.userName }</div>
                        </div>
                        <div className = "row">
                            <label> Email ID: </label>
                            <div> { this.state.writeToUs.emailId }</div>
                        </div>
                        <div className = "row">
                            <label> Phone Number: </label>
                            <div> { this.state.writeToUs.phoneNumber }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewWriteToUsComponent
