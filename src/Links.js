import React, {Component} from 'react';

import {Button, Icon, Grid} from 'semantic-ui-react';

class Links extends Component {
    render() {
        return (
            <Grid columns='1' centered={true}>

                <Grid.Column textAlign='center'>
                    <Button.Group vertical>

                        <Button compact color='youtube' icon labelPosition='left'
                                href='https://www.youtube.com/channel/UCHcjR6a3FnVi1IzjBXQ0B6A'>
                            <Icon name='youtube play'></Icon>
                            youtube
                        </Button>
                        <Button compact color='orange' icon labelPosition='left' href='https://soundcloud.com/supadeangeli-beats'>
                            <Icon name='soundcloud'></Icon>
                            soundcloud
                        </Button>
                        <Button compact color='instagram' icon labelPosition='left'
                                href='https://www.instagram.com/supadeangeli/'>
                            <Icon name='instagram'></Icon>
                            instagram
                        </Button>

                    </Button.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Links;