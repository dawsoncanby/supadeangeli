import React, {Component} from 'react';
import {List, Button, Icon} from "semantic-ui-react";
import './Beat.css';

// represents a beat that can be played on the website
// hitting play or queue on the beat calls methods of the AudioPlayer
class Beat extends Component {

    render() {
        return (
            <List.Item className='Beat' key={this.props.beatName}>
                <List.Content floated='left'>
                    <Button icon onClick={this.handleClick}>
                        <Icon name='play'/>
                    </Button>
                    <Button icon href={this.props.buyLink}>
                        <Icon name='dollar sign'/>
                    </Button>
                </List.Content>
                <List.Content content={this.props.beatName}></List.Content>
            </List.Item>
        );
    }

    handleClick = () => {
        this.props.audioPlayerPlayFcn(this.props.beatName);
    };
}

export default Beat;