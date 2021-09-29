import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://adroit-vantage.s3.ap-southeast-1.amazonaws.com/index.html" className="navbar-brand">AV Career App</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
