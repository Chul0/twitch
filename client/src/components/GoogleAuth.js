import React from "react";

class GoogleAuth extends React.Component {
    componentDidMount() {
        //You want to load it just once.
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                cliendId:
                    "436925754518-ridv01s81s19inioa7f9eu8d0aopopj3.apps.googleusercontent.com",
                scope: "email", //meaning you only want to access to user's email.
            });
        });
    }

    render() {
        return <div>Google Auth</div>;
    }
}

export default GoogleAuth;
