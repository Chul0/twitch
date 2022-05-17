import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';

import App from "../src/components/App";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware())
    );
    

// ⛔️ ReactDOM.render is no longer supported in React 18. 
// https://bobbyhadz.com/blog/react-reacdom-render-no-longer-supported-in-react-18
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>,
);