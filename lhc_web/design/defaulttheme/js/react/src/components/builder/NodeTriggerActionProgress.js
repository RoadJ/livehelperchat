import React, { Component } from 'react';
import NodeTriggerActionType from './NodeTriggerActionType';
import NodeTriggerArgumentTemplate from './NodeTriggerArgumentTemplate';

class NodeTriggerActionProgress extends Component {

    constructor(props) {
        super(props);
        this.changeType = this.changeType.bind(this);
        this.removeAction = this.removeAction.bind(this);
        this.onchangeAttr = this.onchangeAttr.bind(this);
    }

    changeType(e) {
        this.props.onChangeType({id : this.props.id, 'type' : e.target.value});
    }

    removeAction() {
        this.props.removeAction({id : this.props.id});
    }

    onchangeAttr(e) {
        this.props.onChangeContent({id : this.props.id, 'path' : ['content'].concat(e.path), value : e.value});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-2">
                        <div className="btn-group pull-left" role="group" aria-label="Trigger actions">
                            <button disabled="disabled" className="btn btn-xs btn-info">{this.props.id + 1}</button>
                            {this.props.isFirst == false && <a className="btn btn-default btn-xs" onClick={(e) => this.props.upField(this.props.id)}><i className="material-icons mr-0">keyboard_arrow_up</i></a>}
                            {this.props.isLast == false && <a className="btn btn-default btn-xs" onClick={(e) => this.props.downField(this.props.id)}><i className="material-icons mr-0">keyboard_arrow_down</i></a>}
                        </div>
                    </div>
                    <div className="col-xs-9">
                        <NodeTriggerActionType onChange={this.changeType} type={this.props.action.get('type')} />
                    </div>
                    <div className="col-xs-1">
                        <button onClick={this.removeAction} type="button" className="btn btn-danger btn-sm pull-right">
                            <i className="material-icons mr-0">delete</i>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label>Update interval</label>
                            <input type="text" placeholder="Value in seconds" className="form-control" onChange={(e) => this.onchangeAttr({'path' : ['interval'], 'value' : e.target.value})} defaultValue={this.props.action.getIn(['content','interval'])}/>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="form-group">
                            <label>Event identifier</label>
                            <input placeholder="progress_event" type="text" className="form-control" onChange={(e) => this.onchangeAttr({'path' : ['method'], 'value' : e.target.value})} defaultValue={this.props.action.getIn(['content','method'])}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Argument template</label>
                    <NodeTriggerArgumentTemplate showOptional={true} onChange={this.onchangeAttr} argument={this.props.action.getIn(['content','argument_template'])} />
                </div>
                <hr/>

            </div>
        );
    }
}

export default NodeTriggerActionProgress;
