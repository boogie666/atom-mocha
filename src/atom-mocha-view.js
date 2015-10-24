import React from "react";
import ReactDOM from "react-dom";
import Mocha from "./containers/Mocha";
import { Provider } from 'react-redux';
import {Point} from "atom";

export default class AtomMochaView{
    constructor(state, store, runtime){
        this.runtime = runtime;
        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        ReactDOM.render(
            <Provider store={store}>
                <Mocha action={(frame)=>this.openFileAt(frame)} restartTests={()=>this.restartTests()}/>
            </Provider>, this.element);
    }
    restartTests(){
        this.runtime.start();
    }
    openFileAt(frame){
        const {fileName, lineNumber, columnNumber} = frame;
        atom.workspace.open(fileName).then( editor => {
            const position = new Point(lineNumber - 1, columnNumber - 1);
            editor.scrollToBufferPosition(position, {
                center : true
            });
            editor.setCursorBufferPosition(position);
            if (columnNumber < 0){
                editor.moveToFirstCharacterOfLine();
            }
        });
    }
    serialize(){}
    destroy() {
        return this.element.remove();
    }
}
