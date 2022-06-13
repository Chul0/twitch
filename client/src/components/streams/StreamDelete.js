import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const {id} = this.props.match.params; //destructuring same as: const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} //You need an arrow function here -- you want to call this function with a particular id, when this button is clicked. Without an arrow function, you are passing a reference and this event will be fired the instant this renderActions is called
                        className="ui button negative">Delete</button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>{/* ^ Redirect when clicked */}
            </React.Fragment>
        ); //^ This is a helper Fragment to pass to Modal as props
        //You can use <></> instead of <React.Fragment></React.Fragment>
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?"; //same logic as Loading...
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    } // helper function to resolve fetching speed issue.. like Loading...

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    //ownProps - because you want to access to this cmp props and pull out the id inside this mapStateToProps function.
    return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
