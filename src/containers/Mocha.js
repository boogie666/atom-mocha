import React, {Component} from "react";
import {connect} from "react-redux";

class Test extends Component{
    render(){
        const {testId, byId} = this.props;
        const test = byId("tests", testId);
        return (
            <div className={ "test " + this.getColor(test) }>{test.title}</div>
        );
    }
    getColor(test){
        return test.status;
    }
}

class Suite extends Component{
    render(){
        const {suiteId, byId} = this.props;
        const suite = byId("suites", suiteId);
        const suites = suite.suites || [];
        const tests = suite.tests || [];

        return (
            <div className="suite">
                <h4>{suite.title}</h4>
                <ul>
                    { tests.map( test => <li key={test}><Test testId={test} byId={byId}/></li>) }
                    { suites.map( suite => <li key={suite}><Suite suiteId={suite} byId={byId}/></li>) }
                </ul>
            </div>
        )
    }
}

class Mocha extends Component{
    render(){
        const {result, entities} = this.props;
        const {tests} = entities;
        const byId = (type, id) => {
            return entities[type][id];
        };
        return (
            <div>
                <div className="scroll-container tool-panel">
                    <div className="scroll-panel">
                        { result.map( suite => <Suite key={suite} suiteId={suite} byId={ byId }/> ) }
                    </div>
                </div>
                <div className="results-panel">
                    { this.renderResult(tests, "Passed", "passed", this.getPassed) }
                    { this.renderResult(tests, "Failed", "failed", this.getFailed) }
                    { this.renderResult(tests, "Pending", "pending", this.getPending) }
                </div>

            </div>
        );
    }
    getPassed(test){
        return test.status === "passed"  ? 1 : 0;
    }
    getFailed(test){
        return test.status === "failed" ? 1 : 0;
    }
    getPending(test){
        return test.status === "pending" ? 1 : 0;
    }
    renderResult(tests, label, color, valueCalculator){
        const count = Object.keys(tests).reduce((total, key) => {
            return total + valueCalculator(tests[key]);
        }, 0);
        return (
            <div className={ "results " + color}>
                <h4>{label}: {count}</h4>
            </div>
        );
    }

}

export default connect( (state)=>state )(Mocha);
