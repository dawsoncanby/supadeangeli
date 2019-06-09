import React, {Component} from 'react';
import {List, Button, Icon} from "semantic-ui-react";

// represents a beat that can be played on the website
// hitting play or queue on the beat calls methods of the AudioPlayer
class Beat extends Component {

    render() {
        return (
            <List.Item key={this.props.beatName}>
                <List.Content floated='left'>
                    <Button icon onClick={this.handleClick}>
                        <Icon name='play'/>
                    </Button>
                </List.Content>
                <List.Content>{this.props.beatName}</List.Content>
            </List.Item>
        );
    }

    handleClick = () => {
        this.props.audioPlayerPlayFcn(this.props.beatName);
    };
}

export default Beat;