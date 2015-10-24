import React from "react";
import ReactDOM from "react-dom";
import Mocha from "./containers/Mocha";
import { Provider } from 'react-redux';

export default class AtomMochaView{
    constructor(state, store){
        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        ReactDOM.render(
            <Provider store={store}>
                <Mocha />
            </Provider>, this.element);
    }
    serialize(){}
    destroy() {
        return this.element.remove();
    }
}
