import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import streams from "../../apis/streams";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
        //Fetch streams just one time when this cmp is rendered.
    }

    renderList() {
        return this.props.streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams) };
    //Object.values(): built-in js method. take object as an argument, all the values the object has will be pulled out, and be inserted into an array
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
