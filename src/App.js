import React, { Component } from 'react';
import { Header, Icon, Container } from 'semantic-ui-react';
import './App.css';

import AudioPlayer from './AudioPlayer';
import BeatMetadata from './beat_metadata.js'

class App extends Component {
  render() {

      // names of the beats that will be loaded
      let beatNames = [
          "ceiling",
          "balcony hours"
          // TODO: add more beat names here
      ];

      let beatMetadata = new BeatMetadata().metadata;

      return (
      <Container className='App-container'>
          <Header as='h2' icon textAlign='center'>
              <Icon name='music'></Icon>
              <Header.Content>supadeangeli beats</Header.Content>
          </Header>
          <AudioPlayer audioFileNames={beatNames} beatMetadata={beatMetadata} audioFileDir={"./beats"}></AudioPlayer>
      </Container>
    );
  }
}

export default App;
