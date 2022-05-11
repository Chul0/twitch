import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "436925754518-8c7hipcq7hhic3i5umf363m5jq9ilurd.apps.googleusercontent.com",
                    scope: "email",
                    plugin_name: "streamy", // This parameter is required(updated 5/10/22)
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                    //listen() is a method you can pass a callback function to, this function will be invoked every time Auth status changes.
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        //listen() returns boolean(same as this.auth.isSignedIn.get()), and receive it as an argument(you can name this arg whatever you like).
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
        //Can just pass this line as inline function but helper function is easier for other devs to read the code.
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button"
                >
                    {/* ()is not needed in a callback function, otherwise it will be invoked immediately when the cmp is rendered. */}
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
    //REMEMBER:The first argument:state has all the combined reducers.
};

export default connect(
    mapStateToProps,
    { signIn, signOut } //REMEMBER: Connect will pass action into the component as props; returns an object which will always be passed as props.
)(GoogleAuth);
