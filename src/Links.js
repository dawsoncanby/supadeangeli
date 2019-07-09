import React, {Component} from 'react';

import {Button, Icon, Grid} from 'semantic-ui-react';

class Links extends Component {
    render() {
        return (
            <Grid columns='1' centered={true}>

                <Grid.Column textAlign='center'>
                    <Button.Group >

                        <Button compact color='youtube' icon
                                href='https://www.youtube.com/channel/UCHcjR6a3FnVi1IzjBXQ0B6A'>
                            <Icon name='youtube play'></Icon>
                        </Button>
                        <Button compact color='orange' icon href='https://soundcloud.com/supadeangeli-beats'>
                            <Icon name='soundcloud'></Icon>
                        </Button>
                        <Button compact color='instagram' icon
                                href='https://www.instagram.com/supadeangeli/'>
                            <Icon name='instagram'></Icon>
                        </Button>

                    </Button.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Links;