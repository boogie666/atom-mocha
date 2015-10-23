import React, {Component} from "react";


class TestError extends Component{
    render(){
        const {error} = this.props;
        return (
            <atom-panel className='top'>
                <div >
                    <div className="panel-heading">
                        <span className="text-error">{error.message}</span>
                    </div>
                    <div className="panel-body">
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

class Test extends Component{
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

export default class Suite extends Component{
    render() {
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
                    <li className="list-item">
                        { suites.map( suite => <Suite key={suite} suiteId={suite} byId={byId} toggleItem={toggleItem}/>) }
                    </li>
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
