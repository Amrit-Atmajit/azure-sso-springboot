import React, { Component } from 'react'
import {Link} from "react-router-dom"

class HomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/candidates">Career</Link></li>
                    <li><Link to="/writeToUs">Write To Us</Link></li>
                </ul>
            </div>
        )
    }
}

export default HomeComponent