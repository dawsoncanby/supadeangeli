import React, {Component} from 'react';
import {Segment, Button, Icon} from 'semantic-ui-react';
import TagButton from "./TagButton";

class TagFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTags: []
        }
    }

    render() {
        let tagButtons = this.props.tags.map(
            (tag) => {
                let active = this.state.selectedTags.includes(tag);
                return <TagButton key={tag} tag={tag} active={active} filterTagFcn={this.filterTag}></TagButton>;
            }
        );

        return (
            <Segment>
                <Button.Group>
                    {tagButtons}
                </Button.Group>
            </Segment>
        );
    }

    filterTag = (tag) => {
        let newTags = [];
        if (this.state.selectedTags.includes(tag)) {
            let index = this.state.selectedTags.indexOf(tag);
            newTags =  [...this.state.selectedTags];
            newTags.splice(index, 1);
        }
        else {
            newTags = this.state.selectedTags.concat(tag);
        }

        this.setState({
            selectedTags: newTags
        });

        // notify audioplayer to sort beats by tags
        this.props.filterByTags(newTags);
    };
}

export default TagFilter;