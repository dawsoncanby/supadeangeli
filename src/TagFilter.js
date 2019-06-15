import React, {Component} from 'react';
import {Container, Header, Dropdown} from 'semantic-ui-react';

class TagFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTags: []
        };

        // search bar dropdown options
        this.tagOptions = this.props.tags.map((tag) => {
            return {
                key: tag,
                text: tag,
                value: tag
            }
        });
    }

    render() {

        let searchDropdown = <Dropdown placeholder='search for tags'
                                       multiple
                                       search
                                       selection
                                       options={this.tagOptions}
                                       onChange={(e, data) => this.searchBarUpdated(e, data)}>

        </Dropdown>;

        return (
            <Container>
                <Header as={'h3'}>Find beats by selecting tags:</Header>
                {searchDropdown}
            </Container>
        );
    }

    filterTag = (tag) => {
        let newTags = [];
        if (this.state.selectedTags.includes(tag)) {
            let index = this.state.selectedTags.indexOf(tag);
            newTags = [...this.state.selectedTags];
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

    searchBarUpdated = (e, data) => {
        // get all selected tags from dropdown
        this.setState({
            selectedTags: data['value']
        });
        this.props.filterByTags(data['value']);
    }
}

export default TagFilter;