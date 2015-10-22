import React from "react";
import Mocha from "./containers/Mocha";
import { Provider } from 'react-redux';

export default class AtomMochaView{
    constructor(state, store){
        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        React.render(
            <Provider store={store}>
                {() => <Mocha />}
            </Provider>, this.element);
    }
    serialize(){}
    destroy() {
        return this.element.remove();
    }
}
