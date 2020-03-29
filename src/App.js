import React, { Component } from 'react';
import './App.css';

import {UIRouter, UIView} from '@uirouter/react';

import ErrorBoundary from "./app/components/error/ErrorBoundary";

import * as state from "./app/services/state.service";
import * as u from "./app/services/utility.service";

class App extends Component {


  componentWillMount() {



    // u.forceMobile();
    console.log("check mobile app", u.checkMobile());
  }

  render() {
    return (
        <div className="absolute width height">
			<ErrorBoundary>
			<UIRouter plugins={state.plugins} states={state.states} config={state.configRouter}>

				<div className="absolute width height cutoff museo">


					<UIView/>

				</div>
			</UIRouter>
			</ErrorBoundary>
        </div>

    );
  }
}

export default App;


