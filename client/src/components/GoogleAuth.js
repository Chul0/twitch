import React from "react";

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "436925754518-8c7hipcq7hhic3i5umf363m5jq9ilurd.apps.googleusercontent.com",
                    scope: "email",
                    plugin_name: "streamy", // This parameter is required..
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                    // get(), listen() is a prototype method function.
                    this.auth.isSignedIn.listen(this.onAuthChange);
                    //listen() is a method you can pass a callback function to, this function will be invoked every time Auth status changes.
                });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return <div>I don't know if we are signed in</div>;
        } else if (this.state.isSignedIn) {
            return <div>I am signed in!</div>;
        } else {
            return <div>I am not not signed in</div>;
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;
