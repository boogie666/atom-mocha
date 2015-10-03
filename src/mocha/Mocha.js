import React, {Component} from "react";
import { connect } from 'react-redux';
import Suite from "./Suite";

class Mocha extends Component{
    render(){
        const suitesIds = Object.keys(this.props.suites);
        
        return (
            <div>{this.props.suites.map( suite => <Suite suite={suite} />)}</div>
        );
    }
}

function mapStateToProps(state) {
  return {
    suites: state.suites
  };
}

export default connect(mapStateToProps)(Mocha);
