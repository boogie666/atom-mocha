import React from "react";
import PureComponent from "../utils/PureComponent";

class TestError extends PureComponent{
    render(){
        const {error, action} = this.props;
        return (
            <atom-panel class='top'>
                <div >
                    <div className="panel-heading">
                        <span className="text-error">{error.message}</span>
                    </div>
                    <div className="panel-body scroll-x">
                        {this.renderStackFrames(error.stack, action)}
                    </div>
                </div>
            </atom-panel>
        )
    }
    renderStackFrames(stack, action){
        const stackFrames = stack.map((frame, i) => {
            return (
                <li key={i} className="list-item text-subtle">
                    <a onClick={()=>action(frame)} className="text-subtle">{frame.source}</a>
                </li>
            );
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
        return <TestError error={error} action={action}/>;
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
