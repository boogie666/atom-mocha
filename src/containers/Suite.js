import React from "react";
import PureComponent from "../utils/PureComponent";
import ErrorDisplay from "./ErrorDisplay";

class Test extends PureComponent{
    render(){
        const {testId, byId, action} = this.props;
        const test = byId("tests", testId);
        return (
            <li className="list-item">
                <div className={this.getColor(test)}>{test.title}</div>
                <div>{this.getErrorInfo(test.error, action)}</div>
            </li>
        );
    }
    getErrorInfo(error, action) {
        if(!error){
            return null;
        }
        return <ErrorDisplay error={error} action={action}/>;
    }
    getColor({status}){
        if(status === "passed"){
            return "text-success icon-check";
        }
        if(status === "failed"){
            return "text-error icon-x";
        }
        return "text-subtle";
    }
}

export default class Suite extends PureComponent{
    render() {
        const {suiteId, byId, toggleItem, action} = this.props;
        const suite = byId("suites", suiteId);
        const suites = suite.suites || [];
        const tests = suite.tests || [];
        return (
            <li className={"list-nested-item " + suite.toggleState}>
                <div onClick={()=>toggleItem(suiteId)} className="list-item">
                    <span className={this.determineTitleColor(suite, tests, byId)}>{suite.title}</span>
                </div>
                <ul className="list-tree">
                    { tests.map( test => <Test key={test} testId={test} byId={byId} action={action}/>) }
                    { suites.map( suite => <Suite key={suite} suiteId={suite} byId={byId} toggleItem={toggleItem} action={action}/>) }
                </ul>
            </li>
        )
    }

    determineTitleColor(suite){
        if(suite.status === "partial"){
            return "text-warning icon-primitive-dot";
        }
        if(suite.status === "failed"){
            return "text-error icon-x";
        }
        if(suite.status === "passed"){
            return "text-success icon-check";
        }
        return "";
    }

}
