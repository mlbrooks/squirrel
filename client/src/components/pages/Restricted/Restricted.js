import React, { Component } from "react";

class Restricted extends Component {
    render() {
        return (
            <div>
                <h1>You do not have permission to see this page</h1>
            </div>
        );
    }
}

export default Restricted;
