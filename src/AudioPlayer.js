import React, {Component} from 'react';
import Beat from "./Beat";
import {List, Button, Grid, Icon, Segment} from 'semantic-ui-react';

class AudioPlayer extends Component {

    /**
     * props
     * audioFileNames: an array holding the name of each audio file to load
     * audioFileDir: the directory where the audio files are located
     */
    constructor(props) {
        super(props);
        // load audio files
        // this.audioFiles is a map of beat name -> Audio object for that beat
        this.audioFiles = new Map(this.props.audioFileNames.map(
            (beatName) => {
                return [beatName, new Audio(this.props.audioFileDir + "/" + beatName + ".wav")];
            }
        ));

        // the audio object for the beat that is being played, or null
        this.playingAudio = null;

        this.state = {
            currentTrackTitle: "click play for a random beat",
            isPlayingTrack: false
        };

    }

    render() {
        // beatLabels are the elements for the list of playable beats
        let beatLabels = Array.from(this.audioFiles.keys()).map(
            (audioName) => {
                return <Beat key={audioName} beatName={audioName} audioPlayerPlayFcn={this.playAudio}></Beat>;
            }
        );

        // get all tags
        let beatTags = new Set();
        Array.from(this.audioFiles.keys()).map(
            (audioName) => {
                let thisBeatsTags = this.props.beatMetadata[audioName];
                for (let i = 0; i < thisBeatsTags.length; i++) {
                    beatTags.add(thisBeatsTags[i]);
                }
            }
        );

        console.log(beatTags);

        // decide whether to show play or pause button
        let playPause = 'play';
        if (this.state.isPlayingTrack) {
            playPause = 'pause';
        }

        return (
            <Grid columns={1}>
                <Grid.Column>


                    <List divided verticalAlign='middle'>{beatLabels}</List>

                    <Segment>
                        <Button icon onClick={this.togglePlaying}>
                            <Icon name={playPause}></Icon>
                        </Button>
                        {this.state.currentTrackTitle}
                    </Segment>

                </Grid.Column>
            </Grid>
        );
    }

    // stop other audio being played, start
    playAudio = (audioName) => {
        let newAudioToPlay = this.audioFiles.get(audioName);

        if (this.playingAudio != null) {
            this.playingAudio.pause();
            this.playingAudio.currentTime = 0;
        }

        this.playingAudio = newAudioToPlay;
        this.playingAudio.play();

        this.setState({
            currentTrackTitle: audioName,
            isPlayingTrack: true
        });
    };

    // play or pause the current track
    togglePlaying = () => {
        if (this.playingAudio == null) {
            this.playAudio(this.audioFiles.keys().next().value);
        }

        let wasPlaying = this.state.isPlayingTrack;

        if (wasPlaying) {
            this.playingAudio.pause();
        }
        else {
            this.playingAudio.play();
        }

        this.setState({
            isPlayingTrack: !wasPlaying
        });
    };
}

export default AudioPlayer;