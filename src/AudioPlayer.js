import React, {Component} from 'react';
import Beat from "./Beat";
import TagFilter from "./TagFilter.js";
import './AudioPlayer.css';

import {List, Button, Grid, Icon} from 'semantic-ui-react';

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

        // get all tags
        let beatTags = new Set();
        Array.from(this.audioFiles.keys()).forEach(
            (audioName) => {
                let thisBeatsTags = this.props.beatMetadata[audioName].tags;
                for (let i = 0; i < thisBeatsTags.length; i++) {
                    beatTags.add(thisBeatsTags[i]);
                }
            }
        );
        this.beatTags = Array.from(beatTags);

        this.state = {
            currentTrackTitle: "click play for a random beat",
            isPlayingTrack: false,
            selectedTags: [],
            currentBuyLink: ""
        };
    }

    componentWillUnmount() {
        if (this.playingAudio != null) {
            this.playingAudio.pause();
        }
    }


    render() {
        // beatLabels are the elements for the list of playable beats
        let beatLabels = [];
        Array.from(this.audioFiles.keys()).forEach(
            (beatName) => {
                if (this.beatMatchesSelectedTags(beatName)) {
                    beatLabels.push(<Beat key={beatName} beatName={beatName}
                                          audioPlayerPlayFcn={this.playAudio}
                                          buyLink={this.props.beatMetadata[beatName].buyLink}></Beat>);
                }
            }
        );

        // decide whether to show play or pause button
        let playPause = 'play';
        if (this.state.isPlayingTrack) {
            playPause = 'pause';
        }

        return (
            <Grid columns={1} className='AudioPlayer'>
                <Grid.Column textAlign='center'>
                    <h3>{this.state.currentTrackTitle}</h3>
                    <Button icon onClick={this.togglePlaying}>
                        <Icon name={playPause}></Icon>
                    </Button>
                    <Button icon labelPosition='left' href={this.state.currentBuyLink}>
                        <Icon name='dollar sign'></Icon>
                        Buy Now
                    </Button>
                    <br/>
                    <List className='AudioPlayer-beat-list' divided relaxed verticalAlign='middle'>{beatLabels}</List>

                    <TagFilter tags={this.beatTags} filterByTags={this.filterByTags}></TagFilter>

                </Grid.Column>
            </Grid>
        );
    }

    // stop other audio being played, start
    playAudio = (audioName) => {
        let newAudioToPlay = this.audioFiles.get(audioName);
        let newBuyLink = this.props.beatMetadata[audioName].buyLink;

        if (this.playingAudio != null) {
            this.playingAudio.pause();
            this.playingAudio.currentTime = 0;
        }

        this.playingAudio = newAudioToPlay;
        this.playingAudio.play();

        this.setState({
            currentTrackTitle: audioName,
            isPlayingTrack: true,
            currentBuyLink: newBuyLink
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

    // filter the beats shown to the user by the selected tags
    filterByTags = (tags) => {
        this.setState({
            selectedTags: tags
        });
    };

    // check to see if this beat has any of the selected tags
    // TODO: probably worth it to improve this way of searching by tags (add relevance ranking, BPM/key
    beatMatchesSelectedTags = (beatName) => {
        let selectedTags = this.state.selectedTags;
        let thisBeatsTags = this.props.beatMetadata[beatName].tags;


        // if there are no tags, always return true
        if (selectedTags.length === 0) {
            return true;
        }

        // check to see if this beat has a matching tag
        for (let i = 0; i < selectedTags.length; i++) {
            for (let j = 0; j < thisBeatsTags.length; j++) {
                if (selectedTags[i] === thisBeatsTags[j]) {
                    return true;
                }
            }
        }

        return false;
    }
}

export default AudioPlayer;