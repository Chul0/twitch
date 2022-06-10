import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        //Every time you use id-based selection (e.g., streams/edit/:id), we always have to obey this rule: With React-Router, each component needs to be designed to work in isolation (fetch its own data!) — each cmp should fetch each own data.
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        //Flow:
        //1)When this cmp is first loaded it returns whatever is in render()
        //2)So this.props.stream.title is undefined in the moment.
        //3)and then componentDidMount runs and it re-rendered the whole cmp again
        //So adding if statement helps with it

        return <div>{this.props.stream.title}</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    //ownProps is the reference to the props of this component on line 4.
    //so you can access to the props of this component
    return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamEdit);
