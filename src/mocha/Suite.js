
import React, {Component} from "react";
import Test from "./Test";

function makeSuite(suite){
    return <Suite suite={suite}/>;
}
function makeTest(test){
    return <Test test={test}/>;
}

export default class Suite extends Component{
    render(){
        const {suites, tests, title} = this.props.suite;

        return (
            <div className="mocha-suite">
                <span className="mocha-suite-title">{title}</span>
                <ul>
                    {tests.map( test => <li>{makeTest(test)}</li> ) }
                    {suites.map( suite => <li>{makeSuite(suite)}</li> ) }
                </ul>
            </div>
        );
    }
}
