import React, {Component} from 'react';
import {Grid, Header} from 'semantic-ui-react';

class ArtistsPage extends Component {

    render() {
        return <Grid columns='1'>
            <Grid.Column textAlign='center'>
                <Header as='h1'>Supa Squidds</Header>
                <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/614416764&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                <Header as='h1'>JoshHartCo</Header>
                <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/575624619&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
                <Header as='h1'>L3tariat</Header>

                <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/325066874&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
            </Grid.Column>
        </Grid>
    }
}

export default ArtistsPage;