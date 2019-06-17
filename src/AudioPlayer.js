import React, {Component} from 'react';
import Beat from "./Beat";
import TagFilter from "./TagFilter.js";
import './AudioPlayer.css';

import {List, Button, Grid, Icon} from 'semantic-ui-react';
import BeatMetadata from "./beat_metadata";

class AudioPlayer extends Component {

    /**
     * props
     * audioFileNames: an array holding the name of each audio file to load
     * audioFileDir: the directory where the audio files are located
     */
    constructor(props) {
        super(props);

        // load beats
        this.beatMetadata = new BeatMetadata().metadata;
        // names of the beats that will be loaded
        this.beatNames = Object.keys(this.beatMetadata);


        // load audio files
        // this.audioFiles is a map of beat name -> Audio object for that beat
        this.audioFiles = new Map(this.beatNames.map(
            (beatName) => {
                return [beatName, new Audio("./beats_res/" + beatName + ".wav")];
            }
        ));

        // the audio object for the beat that is being played, or null
        this.curPlayingAudioObj = null;

        // get all tags
        let beatTags = new Set();
        Array.from(this.audioFiles.keys()).forEach(
            (audioName) => {
                let thisBeatsTags = this.beatMetadata[audioName].tags;
                for (let i = 0; i < thisBeatsTags.length; i++) {
                    beatTags.add(thisBeatsTags[i]);
                }
            }
        );
        this.beatTags = Array.from(beatTags);

        this.state = {
            currentTrackTitle: "",
            isPlayingTrack: false,
            selectedTags: [],
            currentBuyLink: "",
            // set to false when user hits play and audio is being loaded (not yet ready to play)
            audioReadyToPlay: true
        };
    }

    componentWillMount() {
        // select beat given to url
        let beatToPlay = this.props.location.search.substr(1).replace('%20', ' ');
        // underscores are replaced by spaces

        if (this.beatNames.includes(beatToPlay)) {
            this.selectBeat(beatToPlay, false);
        }
    }

    componentWillUnmount() {
        if (this.curPlayingAudioObj != null) {
            this.curPlayingAudioObj.pause();
        }
    }


    render() {
        // beatLabels are the elements for the list of playable beats
        let beatLabels = [];
        Array.from(this.audioFiles.keys()).forEach(
            (beatName) => {
                if (this.beatMatchesSelectedTags(beatName)) {
                    let metadata = this.beatMetadata[beatName];
                    beatLabels.push(<Beat key={beatName} beatName={beatName} metadata={metadata}
                                          audioPlayerPlayFcn={this.selectBeat}
                    ></Beat>);
                }
            }
        );

        // decide whether to show play or pause button
        let playPause = 'play';
        if (this.state.isPlayingTrack) {
            playPause = 'pause';
        }

        // metadata for the beat that is playing
        let curMetadata = this.beatMetadata[this.state.currentTrackTitle];

        let playingBeatHeader;
        let leaseButton;
        if (this.curPlayingAudioObj !== null) {
            playingBeatHeader = this.state.currentTrackTitle + ' - ' + curMetadata.bpm + ' bpm - ' + curMetadata.key;
            let beatPriceLabel = 'lease - $' + curMetadata.leasePrice
            leaseButton = <Button icon compact labelPosition='left' href={this.state.currentBuyLink}>
                <Icon name='shopping cart'></Icon>
                {beatPriceLabel}
            </Button>
        }
        else {
            playingBeatHeader = 'click play for a random beat';
        }

        return (
            <Grid columns={1} className='AudioPlayer'>
                <Grid.Column textAlign='center'>
                    <h3>{playingBeatHeader}</h3>
                    <Button icon compact onClick={this.togglePlaying} loading={!this.state.audioReadyToPlay}>
                        <Icon name={playPause}></Icon>
                    </Button>
                    {leaseButton}
                    <br/>
                    <br/>
                    <TagFilter tags={this.beatTags} filterByTags={this.filterByTags}></TagFilter>
                    <br/>
                    <List className='AudioPlayer-beat-list' size='large' divided relaxed>{beatLabels}</List>
                    <br/>

                </Grid.Column>
            </Grid>
        );
    }

    // stop other audio being played, start new audio (if playAudio=true)
    selectBeat = (audioName, playAudio) => {
        let newAudioToPlay = this.audioFiles.get(audioName);
        let newBuyLink = this.beatMetadata[audioName].buyLink;

        // add event listener for when audio is done loading
        newAudioToPlay.oncanplay = () => {
            this.setState({
                audioReadyToPlay: true
            });
        };

        // check to see if audio is already ready to play
        this.setState({
            audioReadyToPlay: newAudioToPlay.readyState === 4
        });

        if (this.curPlayingAudioObj != null) {
            this.curPlayingAudioObj.pause();
            this.curPlayingAudioObj.currentTime = 0;
        }

        this.curPlayingAudioObj = newAudioToPlay;

        if (playAudio) {
            this.curPlayingAudioObj.play();
        }

        this.setState({
            currentTrackTitle: audioName,
            isPlayingTrack: playAudio,
            currentBuyLink: newBuyLink
        });
    };

    // play or pause the current track
    togglePlaying = () => {
        if (this.curPlayingAudioObj == null) {
            this.selectBeat(this.audioFiles.keys().next().value, true);
        }

        let wasPlaying = this.state.isPlayingTrack;

        if (wasPlaying) {
            this.curPlayingAudioObj.pause();
        }
        else {
            this.curPlayingAudioObj.play();
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
        let thisBeatsTags = this.beatMetadata[beatName].tags;


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