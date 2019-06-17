import React, {Component} from 'react';
import {Grid, Header, Icon, Button, Container} from 'semantic-ui-react';

class ArtistsPage extends Component {

    render() {
        // map of artist name->links for that artist
        let links = {
            "Supa Squidds": {
                "soundcloud": "https://soundcloud.com/supasquidds",
                "spotify": "https://open.spotify.com/artist/226oZaBWbPTWNFWW3SdOwB?si=8F3FOVb_QuCOWpQg6ch94w",
                "applemusic": "https://itunes.apple.com/us/artist/supa-squidds/1344140343",
                "instagram": "https://www.instagram.com/supa_squidds/",
                "youtube": "https://www.youtube.com/channel/UCR9w3xFUSjoym2O0Qnqwiyg"
            },
            "deangeli": {
                "soundcloud": "https://soundcloud.com/devngeli",
                "spotify": "https://open.spotify.com/artist/2NsTeY7g8n4rdt6ChYsLxv?si=QPrOmG0zSq-jsffxDMfkBw",
                "applemusic": "https://music.apple.com/us/album/aquatic-boys-2/1370926836",
                "instagram": "https://www.instagram.com/deangelibeats/",
                "youtube": "https://www.youtube.com/watch?v=19XfJnP8B3U"
            }
            // "JoshHartCo": {
            //     "soundcloud": "https://soundcloud.com/supasquidds",
            //     "spotify": "https://open.spotify.com/artist/226oZaBWbPTWNFWW3SdOwB?si=8F3FOVb_QuCOWpQg6ch94w",
            //     "apple music": "https://itunes.apple.com/us/artist/supa-squidds/1344140343",
            //     "instagram": "https://www.instagram.com/supa_squidds/",
            //     "youtube": "https://www.youtube.com/channel/UCR9w3xFUSjoym2O0Qnqwiyg"
            // },
            // "L3tariat": {
            //     "soundcloud": "https://soundcloud.com/supasquidds",
            //     "spotify": "https://open.spotify.com/artist/226oZaBWbPTWNFWW3SdOwB?si=8F3FOVb_QuCOWpQg6ch94w",
            //     "apple music": "https://itunes.apple.com/us/artist/supa-squidds/1344140343",
            //     "instagram": "https://www.instagram.com/supa_squidds/",
            //     "youtube": "https://www.youtube.com/channel/UCR9w3xFUSjoym2O0Qnqwiyg"
            // },
            // "Beckwith Cons": {
            //     "soundcloud": "https://soundcloud.com/supasquidds",
            //     "spotify": "https://open.spotify.com/artist/226oZaBWbPTWNFWW3SdOwB?si=8F3FOVb_QuCOWpQg6ch94w",
            //     "apple music": "https://itunes.apple.com/us/artist/supa-squidds/1344140343",
            //     "instagram": "https://www.instagram.com/supa_squidds/",
            //     "youtube": "https://www.youtube.com/channel/UCR9w3xFUSjoym2O0Qnqwiyg"
            // }
        };

        // link buttons for each user
        let artistLinkButtonSets = Array.from(Object.keys(links)).map((artistName) => {
            let linkData = links[artistName];

            return <Container key={artistName} style={{padding: '10px'}}>
                <Header as='h2'>{artistName}</Header>
                <Button.Group>
                <Button compact color='youtube' icon href={linkData.youtube}>
                    <Icon name='youtube play'></Icon>
                </Button>
                <Button compact color='orange' icon href={linkData.soundcloud}>
                    <Icon name='soundcloud'></Icon>
                </Button>
                <Button compact color='instagram' icon
                        href={linkData.instagram}>
                    <Icon name='instagram'></Icon>
                </Button>
                </Button.Group>
            </Container>;
        });

        return <Grid columns='1' divided relaxed>
            <Grid.Column textAlign='center'>
                {artistLinkButtonSets}
            </Grid.Column>
        </Grid>
    }
}

export default ArtistsPage;