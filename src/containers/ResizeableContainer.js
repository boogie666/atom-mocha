import React, {Component} from "react";

export default class ResizableContainer extends Component{
    constructor(...args){
        super(...args);
        this.state = {
            resizeing : true,
            style : {
                width : 500
            }
        };
    }
    render(){
        const {children} = this.props;
        const {style} = this.state;
        return (
            <div style={style} ref="resizerDiv" className="resizer">
                <div ref="resizeHandle"
                    className="resize-handle"
                    onMouseDown={(e)=>this.dragStart(e)}
                    onMouseUp={(e)=>this.dragStop(e)}
                    onMouseMove={(e)=>this.drag(e)}
                    ></div>
                {children}
            </div>
        );
    }

    dragStart(...args){
        this.setProperty(["resizeing"], true);
    }
    dragStop(){
        this.setProperty(["resizeing"], false);
    }

    drag(){
        const {resizeing} = this.state;
        if(!resizeing){
            return;
        }
        
    }

    setProperty(names, value){
        const newState = {...this.state};
        const lastName = names[names.length - 1];
        names.splice(names.length-1, 1);
        const object = names.reduce((object, name) => object[name], newState);
        object[lastName] = value;
        this.setState(newState);
    }
}
