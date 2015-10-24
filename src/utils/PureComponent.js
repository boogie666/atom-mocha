import PureRenderMixin from "react-addons-pure-render-mixin";
import {Component} from "react";

export default class PureComponent extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
    }
}
