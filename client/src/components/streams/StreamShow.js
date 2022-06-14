import React from "react";
import flv from 'flv.js';
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer(); //this will run when cmp is rendered, so by the time cmp is rendered we still might not have access to videoRef.

    }

    componentDidUpdate() { //when cmp is re-rendered.
        this.buildPlayer(); //if  this.props.fetchStream(id); is successfully run, it will re-render the cmp and this will get fired
    }

    componentWillUnmount() {
        //To stop streaming: buildPlayer should be unmounted.
        this.player.destroy();
    }

    buildPlayer() { //helper function to solve the loading speed problems. We don't have access to videoRef the instant this cmp is rendered & no access to this.props.stream either.
        if(this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();

    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.stream; //destructuring for a cleaner code

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%'}} controls /> 
                {/* this is not html element but jsx element so in order to get reference to html you need to define ref. 
                 It requires that a videoElement (remember, video is an element, not a component) is returned, we need to create a reference to that element in the DOM, then, eventually, we will attach the video element to the player instance by passing it the reference we created.*/}
                {/* REMEMBER every time you pass boolean true, you don't have to write controls={true}, passing only prop names means it is passing true   */}
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]};
};

export default connect(
    mapStateToProps,
     { fetchStream }
)(StreamShow);
