import React, {Component} from 'react';
import {Header, Container, Menu, Rail, Sticky, Image, Grid} from 'semantic-ui-react';
import {Route, Switch, Link, HashRouter as Router} from 'react-router-dom'

import './App.css';

import AudioPlayer from './AudioPlayer';
import ArtistsPage from './ArtistsPage.js'
import Links from "./Links";

class App extends Component {

    constructor(props) {
        super(props);

        this.Home = () => {
            return <Grid columns={1}>
                <Grid.Column textAlign='center'>
                    <Links></Links>
                    {/*<Button circular size='huge' as={Link} to='/beats' onClick={this.openBeatBrowser}>FIND BEATS</Button>*/}
                    <h3>white claw and nexus 2 out now!</h3>

                    <iframe width="350" height="215"
                            src="https://www.youtube.com/embed/videoseries?list=PL3ki-GrmnvfIZVg5g-hxqrI7CgDg53zWt"
                            frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    <br/>
                </Grid.Column>
            </Grid>;
        };

        // the currently open page on the website
        this.state = {
            activePage: 'home'
        };
    }

    render() {
        return (
            <Container className='App-container'>
                <Header as='h1' textAlign='center'>
                    <Image src='./img/supadeangeli-logo.png' size='huge' circular></Image>
                    <Header.Content>supadeangeli beats</Header.Content>
                </Header>
                <Router basename='/'>
                    <Rail
                        internal
                        position="left"
                        attached
                        style={{top: "auto", height: "auto", width: "100%"}}
                    >
                        <Sticky>

                            <Menu style={{background: 'white'}} widths='three' pointing secondary>
                                <Menu.Item name='home'
                                           as={Link} to='/'>
                                </Menu.Item>
                                <Menu.Item name='FIND BEATS'
                                           as={Link} to='/beats'></Menu.Item>
                                <Menu.Item name='our artists'
                                           as={Link} to='/artists'></Menu.Item>
                            </Menu>
                        </Sticky>
                        <br/>
                        <Switch>
                            <Route path='/' exact component={this.Home}/>
                            <Route path='/artists' component={ArtistsPage}/>
                            <Route path='/beats' component={AudioPlayer}/>
                            <Route component={() => <h1 align="center">Page Not Found</h1>}/>
                        </Switch>

                    </Rail>

                </Router>

            </Container>
        );
    }
}

export default App;
