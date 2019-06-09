import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class TagButton extends Component {
    render() {
        return (
            <Button key={this.props.tag} toggle active={this.props.active} onClick={this.filterTag}>
                {this.props.tag}
            </Button>
        );
    }

    filterTag = () => {
        this.props.filterTagFcn(this.props.tag);
    };
}

export default TagButton;