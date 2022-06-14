import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
        //Fetch streams just one time when this cmp is rendered.
    }

    renderAdmin(stream) {
        //helper function for edit&delete buttons
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <Link to={`/streams/${stream.id}`} className="header">
                        {stream.title} 
                        <div className="description">{stream.description}</div>
                    </Link>
                    {/* Direct user to designated stream/:id using <Link> */}
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        //Object.values(): built-in js method. take object as an argument, all the values the object has will be pulled out, and be inserted into an array
        currentUserId: state.auth.userId, //passing userId
        isSignedIn: state.auth.isSignedIn, //create another state, isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
