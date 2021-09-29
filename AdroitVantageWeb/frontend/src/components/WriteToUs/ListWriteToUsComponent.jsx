import React, { Component } from 'react'
import WriteToUsService from '../../services/WriteToUsService'

class ListWriteToUsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                writeToUs: []
        }
        this.addWriteToUs = this.addWriteToUs.bind(this);
        this.editWriteToUs = this.editWriteToUs.bind(this);
        this.deleteWriteToUs = this.deleteWriteToUs.bind(this);
    }

    deleteWriteToUs(id){
        WriteToUsService.deleteWriteToUs(id).then( res => {
            this.setState({writeToUs: this.state.writeToUs.filter(writeToUs => writeToUs.id !== id)});
        });
    }
    viewWriteToUs(id){
        this.props.history.push(`/view-writeToUs/${id}`);
    }
    editWriteToUs(id){
        this.props.history.push(`/update-writeToUs/${id}`);
    }

    componentDidMount(){
        WriteToUsService.getWriteToUs().then((res) => {
            this.setState({ writeToUs: res.data});
        });
    }

    addWriteToUs(){
        this.props.history.push('/add-writeToUs/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">WriteToUs List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addWriteToUs}> Add WriteToUs</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> User Name</th>
                                    <th> Email Id</th>
                                    <th> Phone Number</th>
                                    <th> Message</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.writeToUs.map(
                                        writeToUs => 
                                        <tr key = {writeToUs.id}>
                                             <td> {writeToUs.userName} </td>   
                                             <td> {writeToUs.emailId}</td>
                                             <td> {writeToUs.phoneNumber}</td>
                                             <td> {writeToUs.message}</td>
                                             <td>
                                                 <button onClick={ () => this.editWriteToUs(writeToUs.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteWriteToUs(writeToUs.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewWriteToUs(writeToUs.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListWriteToUsComponent
