import _ from 'lodash';
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions"; //import editStream action(REST api)
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        //Every time you use id-based selection (e.g., streams/edit/:id), we always have to obey this rule: With React-Router, each component needs to be designed to work in isolation (fetch its own data!) — each cmp should fetch each own data.
    }

    onSubmit = formValues => {
                //Create onSubmit helper funciton which will be passed as props to StreamForm.


       this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

    return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    //initialValues is a default redux-form prop
                    //first curly {} means you can write js code here
                    //second curly {} means it is an object
                    //REMEMBER: initialValues object keys(title, description) should be the same as <Field /> name in StreamForm!

                    //_.pick lets you pick only the properties you want
                    //you can write it this way without using lodash
                    // initialValues={{title: this.props.stream.title, description:this.props.stream.description}}
                    onSubmit={this.onSubmit} /> 
                {/* pass onSubmit props */}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(
    mapStateToProps, 
    { fetchStream, editStream }
)(StreamEdit); //pass in editStream action creator to connect
