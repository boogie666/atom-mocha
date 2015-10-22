import React, {Component} from "react";
import {connect} from "react-redux";
import {toggleSuite} from "../actions";

class Test extends Component{
    render(){
        const {testId, byId} = this.props;
        const test = byId("tests", testId);
        return (
            <li className={ "list-item " + this.getColor(test) }>{test.title}</li>
        );
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

class ItemCount extends Component{
    render(){
        const passedTests = this.countTests("passed", this.props.suite);
        const failedTests = this.countTests("failed", this.props.suite);
        const pendingTests = this.countTests("pending", this.props.suite);
        return (
            <span>
                {this.renderCounter("success", passedTests)}
                {this.renderCounter("error", failedTests)}
                {this.renderCounter("subtle", pendingTests)}
            </span>
        );
    }
    renderCounter(type, count){
        return count === 0 ? null : <span className={"badge badge-small badge-" + type}>{count}</span>
    }

    countTests(status, suiteId){
        const byId = this.props.byId;
        const suite = byId("suites", suiteId);
        const suites = suite.suites || [];
        const tests = suite.tests || [];

        var result = 0;
        var currentTest = null;
        for(var i = 0; i < tests.length; i++){
            currentTest = byId("tests", tests[i]);
            result += status === currentTest.status ? 1 : 0;
        }
        for(var j = 0; j < suites.length; j++){
            result += this.countTests(status, suites[j]);
        }
        return result;
    }
}

class Suite extends Component{
    render() {
        const {suiteId, byId, toggleItem} = this.props;
        const suite = byId("suites", suiteId);
        const suites = suite.suites || [];
        const tests = suite.tests || [];
        return (
            <li className={"list-nested-item " + suite.toggleState}>
                <div onClick={()=>toggleItem(suiteId)} className="list-item">
                    {suite.title} <ItemCount suite={suiteId} byId={byId} />
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

}

class Mocha extends Component{
    render(){
        const {result, entities, dispatch} = this.props;
        const {tests} = entities;
        const byId = (type, id) => {
            return entities[type][id];
        };

        return (
            <atom-panel className="top scroll-panel">
                <div className="inset-panel">
                    <div className="panel-heading">Tests</div>
                    <div className="panel-body padded">
                        <ul className="list-tree has-collapsable-children">
                            { result.map( suite => <Suite key={suite} suiteId={suite} byId={ byId } toggleItem={ (suiteId)=> this.toggleItem(suiteId) }/> ) }
                        </ul>
                    </div>
                </div>
            </atom-panel>
        );
    }

    toggleItem(suite){
        toggleSuite(this.props, { suite });
    }
}

export default connect( (state)=>state )(Mocha);
