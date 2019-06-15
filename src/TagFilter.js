import React, {Component} from 'react';
import {Container, Dropdown} from 'semantic-ui-react';
import './TagFilter.css'

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

        return (
            <Container>
                <Dropdown
                    placeholder='search for tags'
                    multiple
                    icon='search'
                    className='TagFilter-dropdown'
                    search
                    fluid
                    selection
                    upward
                    options={this.tagOptions}
                    onChange={(e, data) => this.searchBarUpdated(e, data)}>
                </Dropdown>
            </Container>
        );
    }

    searchBarUpdated = (e, data) => {
        // get all selected tags from dropdown
        this.setState({
            selectedTags: data['value']
        });
        this.props.filterByTags(data['value']);
    }
}

export default TagFilter;