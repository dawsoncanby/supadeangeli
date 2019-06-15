import React, {Component} from 'react';
import {Grid, Header, Container, Button, Menu, Rail, Sticky, Image} from 'semantic-ui-react';
import './App.css';

import AudioPlayer from './AudioPlayer';
import BeatMetadata from './beat_metadata.js'
import Links from './Links.js'
import ArtistsPage from './ArtistsPage.js'

class App extends Component {

    constructor(props) {
        super(props);

        // load beats
        let beatMetadata = new BeatMetadata().metadata;

        // names of the beats that will be loaded
        let beatNames = Object.keys(beatMetadata);

        // search for beats and play them
        this.audioPlayer = <AudioPlayer className='AudioPlayer' audioFileNames={beatNames} beatMetadata={beatMetadata}
                                        audioFileDir={"./beats"}></AudioPlayer>;

        // homepage - first thing user sees
        this.home = <Grid columns={1}>
            <Grid.Column textAlign='center'>
                <Links></Links>
                <br/>
                <Button circular size='huge' onClick={this.openBeatBrowser}>FIND BEATS NOW!</Button>
            </Grid.Column>
        </Grid>;

        this.ourArtists = <ArtistsPage></ArtistsPage>;

        // the currently open page on the website
        this.activePage = 'home';

        // this.state.content is a JSX object for the active page
        this.state = {
            content: this.home
        };
    }

    render() {

        return (
            <Container className='App-container'>
                <Header as='h1' textAlign='center'>
                    <Image src='./img/supadeangeli-logo.png' size='huge' circular></Image>
                    <Header.Content>supadeangeli beats</Header.Content>
                </Header>
                <Rail
                    internal
                    position="left"
                    attached
                    style={{top: "auto", height: "auto", width: "100%"}}
                >

                    <Sticky>
                        <Menu style={{background: 'white'}} widths='three' pointing secondary>
                            <Menu.Item name='home' active={this.activePage === 'home'}
                                       onClick={this.openHome}></Menu.Item>
                            <Menu.Item name='FIND BEATS' active={this.activePage === 'find_beats'}
                                       onClick={this.openBeatBrowser}></Menu.Item>
                            <Menu.Item name='our artists' active={this.activePage === 'our_artists'}
                                       onClick={this.openArtists}></Menu.Item>
                        </Menu>
                    </Sticky>
                    <br/>
                    {this.state.content}
                </Rail>

            </Container>
        );
    }

    openBeatBrowser = () => {
        this.activePage = 'find_beats';
        this.setState({content: this.audioPlayer});
    };

    openHome = () => {
        this.activePage = 'home';
        this.setState({content: this.home});
    };

    openArtists = () => {
        this.activePage = 'our_artists';
        this.setState({content: this.ourArtists});
    };
}

export default App;
