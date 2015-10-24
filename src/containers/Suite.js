import React from "react";
import PureComponent from "../utils/PureComponent";

class TestError extends PureComponent{
    render(){
        const {error} = this.props;
        return (
            <atom-panel class='top'>
                <div >
                    <div className="panel-heading">
                        <span className="text-error">{error.message}</span>
                    </div>
                    <div className="panel-body scroll-x">
                        {this.renderStackFrames(error.stack)}
                    </div>
                </div>
            </atom-panel>
        )
    }
    renderStackFrames(stack){
        const stackFrames = stack.map((frame, i) => {
            return <li key={i} className="list-item">{frame.source}</li>
        });
        return (
            <ul className='list-group'>
                {stackFrames}
            </ul>
        );
    }
}

class Test extends PureComponent{
    render(){
        const {testId, byId} = this.props;
        const test = byId("tests", testId);
        return (
            <li className={ "list-item " + this.getColor(test) }>
                <div>{test.title}</div>
                <div>{this.getErrorInfo(test.error)}</div>
            </li>
        );
    }
    getErrorInfo(error) {
        if(!error){
            return null;
        }
        return <TestError error={error} />;
    }
    getColor({status}){
        if(status === "passed"){
            return "text-success";
        }
        if(status === "failed"){
            return "text-error";
        }
        return "text-subtle";
    }
}

export default class Suite extends PureComponent{
    render() {
        console.log(this);
        const {suiteId, byId, toggleItem} = this.props;
        const suite = byId("suites", suiteId);
        const suites = suite.suites || [];
        const tests = suite.tests || [];
        return (
            <li className={"list-nested-item " + suite.toggleState}>
                <div onClick={()=>toggleItem(suiteId)} className="list-item">
                    <span className={this.determineTitleColor(suite, tests, byId)}>{suite.title}</span>
                </div>
                <ul className="list-tree">
                    { tests.map( test => <Test key={test} testId={test} byId={byId}/>) }
                    { suites.map( suite => <Suite key={suite} suiteId={suite} byId={byId} toggleItem={toggleItem}/>) }
                </ul>
            </li>
        )
    }

    determineTitleColor(suite){
        if(suite.status === "partial"){
            return "text-warning";
        }
        if(suite.status === "failed"){
            return "text-error";
        }
        if(suite.status === "passed"){
            return "text-success";
        }
        return "";
    }

}
