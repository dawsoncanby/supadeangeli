import React, {Component} from 'react';
import {Header, Container, Menu, Rail, Sticky, Image, Grid, Button} from 'semantic-ui-react';
import {Route, Switch, Link, HashRouter as Router} from 'react-router-dom'

import './App.css';

import AudioPlayer from './AudioPlayer';
import ArtistsPage from './ArtistsPage.js'
import Links from "./Links";

class App extends Component {

    constructor(props) {
        super(props);

        // component for searching for beats (requires props)
        this.Home = () => {
            return <Grid columns={1}>
                <Grid.Column textAlign='center'>
                    <Links></Links>
                    <br/>
                    <Button circular size='huge' as={Link} to='/beats' onClick={this.openBeatBrowser}>FIND BEATS NOW</Button>
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
                                           as={Link} to='/' >
                                </Menu.Item>
                                <Menu.Item name='FIND BEATS'
                                           as={Link} to='/beats' ></Menu.Item>
                                <Menu.Item name='our artists'
                                           as={Link} to='/artists'></Menu.Item>
                            </Menu>
                        </Sticky>
                        <br/>
                        <Switch>
                            <Route path='/' exact component={this.Home}/>
                            <Route path='/artists' component={ArtistsPage}/>
                            <Route path='/beats' component={AudioPlayer}/>
                            <Route component={() => <h1 align="center">Page Not Found</h1 >}/>
                        </Switch>

                    </Rail>

                </Router>

            </Container>
        );
    }
}

export default App;
