import React from "react";
import PureComponent from "../utils/PureComponent";
import Suite from "./Suite";
import ErrorDisplay from "./ErrorDisplay";
import {connect} from "react-redux";
import {toggleSuite} from "../actions";
import {dataForTest, createTestFiles} from "../generateTest";


class ItemCount extends PureComponent{
    render(){
        const passedTests = this.countTests("passed", this.props.suite);
        const failedTests = this.countTests("failed", this.props.suite);
        const pendingTests = this.countTests("pending", this.props.suite);
        return (
            <span>
                {this.renderCounter("-success", passedTests, "check")}
                {this.renderCounter("-error", failedTests, "x")}
                {this.renderCounter("", pendingTests, "clock")}
            </span>
        );
    }
    renderCounter(type, count, icon){
        return count === 0 ? null : <span className={"inline-block highlight" + type + " icon-"+icon}>{count}</span>
    }

    countTests(status, suiteId){
        const byId = this.props.byId;
        const suite = byId("suites", suiteId);
        if(!suite){
            return 0;
        }
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


class StatsView extends PureComponent{
    render(){
        const {stats,suites, tests, byId} = this.props;
        return (
            <div>
                <ItemCount suite={0} byId={byId} />
                <span>{ this.getDuration(suites, tests, stats) }</span>
            </div>
        );
    }

    getDuration(suites, tests, stats){
        if(!Object.keys(suites).length || !Object.keys(tests).length){
            return null;
        }
        if(!stats){
            return <span className='loading loading-spinner-tiny inline-block'></span>;
        }
        return <span className="inline-block highlight-info icon-dashboard">{stats.duration} ms</span>;
    }
}

class Mocha extends PureComponent{
    render(){
        const {entities, stats, error, restartTests} = this.props;
        const {suites, tests} = entities;
        const byId = (type, id) => {
            return entities[type][id];
        };
        return (
            <atom-panel class="top scroll-panel">
                <div className="inset-panel">
                    <div className="panel-heading">
                        <div className="inline-block">
                            {this.renderTitle(stats, error, restartTests)}
                        </div>
                        <div className="inline-block" style={ {float : "right"} }>
                            <StatsView stats={stats} suites={suites} tests={tests} byId={byId}/>
                        </div>
                    </div>
                    <div className="panel-body padded">
                        {this.hasError() ?
                            this.renderError() :
                            this.renderResults(byId)}
                    </div>
                </div>
            </atom-panel>
        );
    }
    hasError(){
        return !!this.props.error;
    }
    renderError(){
        const {error, action} = this.props;
        return <ErrorDisplay error={error} action={action}/>
    }
    renderResults(byId){
        const {result, entities, stats, action} = this.props;
        const {suites, tests} = entities;
        const noTestsMessage = this.getNoTestsMessage(stats);
        return (
            <div>
                {noTestsMessage}
                <ul className="list-tree has-collapsable-children">
                    { result.map( suite => <Suite key={suite} suiteId={suite} byId={ byId } toggleItem={ (suiteId)=> this.toggleItem(suiteId) } action={action}/> ) }
                </ul>
            </div>
        );

    }
    renderTitle(stats, error, restartTests){
        if(!stats && !error){
            return <span>Tests</span>;
        }

        return <a onClick={restartTests}><span className="icon-sync">Re-run Tests</span></a>
    }
    toggleItem(suite){
        toggleSuite(this.props, { suite });
    }

    getNoTestsMessage(stats){
        if(!stats){
            return null;
        }
        if(stats.tests !== 0 || stats.suites !== 0){
            return null;
        }
        return (
            <ul className='background-message'>
                <li>No Tests</li>
            </ul>
        );
    }
}

export default connect( state => state )(Mocha);
