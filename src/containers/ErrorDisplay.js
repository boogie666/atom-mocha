import React from "react";
import PureComponent from "../utils/PureComponent";

export default class ErrorDisplay extends PureComponent{
    render(){
        const {error, action} = this.props;
        return (
            <atom-panel class='top'>
                <div>
                    <div className="panel-heading">
                        {this.renderErrorTitle(error)}
                    </div>
                    <div className="panel-body scroll-x">
                        {this.renderStackFrames(error.stack, action)}
                    </div>
                </div>
            </atom-panel>
        )
    }
    renderErrorTitle(error){
        if(!error.name){
            return (
                <span className="text-error">{error.message}</span>
            );
        }
        return (
            <span className="text-error">{error.name} : {error.message}</span>
        );
    }
    renderStackFrames(stack, action){

        const stackFrames = stack.map((frame, i) => (
            <li key={i} className="list-item text-subtle">
                <a onClick={()=>action(frame)} className="text-subtle">{frame.source}</a>
            </li>
        ));
        return (
            <ul className='list-group'>
                {stackFrames}
            </ul>
        );
    }
}
