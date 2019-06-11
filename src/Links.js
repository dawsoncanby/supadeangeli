import React, {Component} from 'react';

import {Container, Button, Segment, Icon, Grid} from 'semantic-ui-react';

class Links extends Component {
    render() {
        return (
            <Grid columns='2' centered={true} compact>
                <Grid.Column>
                    <Segment compact>
                        Supa Squidds &nbsp;
                        <Button compact circular color='instagram' icon href='https://www.instagram.com/supa_squidds/'>
                            <Icon name='instagram'></Icon>
                        </Button>
                        <Button compact circular color='green' icon
                                href='https://open.spotify.com/artist/226oZaBWbPTWNFWW3SdOwB?si=jabmCPCTT2GI_oYWH3LaUA'>
                            <Icon name='spotify'></Icon>
                        </Button>
                        <Button compact circular color='orange' icon href='https://soundcloud.com/supasquidds'>
                            <Icon name='soundcloud'></Icon>
                        </Button>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment compact>
                        Deangeli &nbsp;
                        <Button compact circular color='instagram' icon href='https://www.instagram.com/deangelibeats/'>
                            <Icon name='instagram'></Icon>
                        </Button>
                        <Button compact circular color='orange' icon href='https://soundcloud.com/devngeli'>
                            <Icon name='soundcloud'></Icon>
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Links;