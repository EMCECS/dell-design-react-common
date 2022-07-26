import React from "react";
import { Button, Form } from "react-bootstrap";
import './keyValue.scss'

import Delete from '../../../assets/images/delete.png';
import Copy from '../../../assets/images/copy.png';

type KeyValueState = {
    keyValueArray: {key:string, value:string}[];
}

export default class KeyValue extends React.PureComponent<{},KeyValueState> {
    state = {
        keyValueArray: [{key: "", value: ""}]
    }
    addOneKVPair = () => {
        const kv = this.state.keyValueArray.slice();
        kv.push({key:'', value:''});
        this.setState({
            keyValueArray: kv,
        })
    }
    deleteRecord = (index: number) => {
        const kv = this.state.keyValueArray.slice();
        kv.splice(index, 1);
        this.setState({
            keyValueArray: kv,
        })
    }
    render() {
        const {keyValueArray} = this.state;
        return (
            <div>
                <div>
                    {keyValueArray.map((keyValue, i) => (
                            <div className="keyvalue-container">
                                <Form className="keyvalue-form">
                                    <div className="keyvalue-form-control-container">
                                        <Form.Label className="keyvalue-form-label">Key</Form.Label>
                                        <Form.Control defaultValue={keyValue.key}></Form.Control>
                                    </div>
                                    <div className="keyvalue-form-control-container">
                                        <Form.Label className="keyvalue-form-label">Value</Form.Label>
                                        <Form.Control defaultValue={keyValue.value}></Form.Control>
                                    </div>
                                    <div className="icons" onClick={() => this.deleteRecord(i)}>
                                        <img src={Delete} alt="delete icon"/>
                                    </div>
                                    <div className="icons">
                                        <img src={Copy} alt="copy icon"/>
                                    </div>
                                </Form>
                            </div>
                    ))}
                    <Button onClick={this.addOneKVPair} size="sm">Add Label</Button>
                </div>
            </div>
        )
    }
}