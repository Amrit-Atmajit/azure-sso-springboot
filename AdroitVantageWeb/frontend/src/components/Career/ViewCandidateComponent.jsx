import React, { Component } from 'react'
import CareerService from '../../services/CareerService'

class ViewCandidateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            candidate: {}
        }
    }

    componentDidMount(){
        CareerService.getCandidateById(this.state.id).then( res => {
            this.setState({candidate: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View { this.state.candidate.fullName }'s Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Full Name: </label>
                            <div> { this.state.candidate.fullName }</div>
                        </div>
                        <div className = "row">
                            <label> Email ID: </label>
                            <div> { this.state.candidate.emailId }</div>
                        </div>
                        <div className = "row">
                            <label> Phone Number: </label>
                            <div> { this.state.candidate.phoneNumber }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCandidateComponent
