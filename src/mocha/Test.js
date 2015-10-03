
import React, {Component} from "react";

export default class Test extends Component{
    render(){
        const {title, state, time} = this.props.test;
        const className = "mocha-test " + state;

        return (
            <div className={className}>
                <span className="mocha-test-title">{title}</span>
                <span className="mocha-test-time">{time}</span>
            </div>
        );
    }
}
