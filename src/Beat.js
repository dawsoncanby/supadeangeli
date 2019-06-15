import React, {Component} from 'react';
import {List} from "semantic-ui-react";
import './Beat.css';

// represents a beat that can be played on the website
// hitting play or queue on the beat calls methods of the AudioPlayer
class Beat extends Component {

    render() {
        return (
            <List.Item as='a' className='Beat' onClick={this.handleClick} key={this.props.beatName}>
                <List.Icon verticalAlign='middle' name='play'></List.Icon>
                <List.Content>
                    <List.Content floated='left'>{this.props.beatName}</List.Content>
                    <List.Content floated='right'>{'$' + this.props.metadata.leasePrice}</List.Content>
                </List.Content>
            </List.Item>
        );
    }

    handleClick = () => {
        this.props.audioPlayerPlayFcn(this.props.beatName);
    };
}

export default Beat;