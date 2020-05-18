import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CharacterForm from "./components/characterForm";
import CharacterSheet from "./components/characterSheet";

export default class App extends React.Component {  
  render() {
    return (
      <Router>
        <Redirect from="/" exact to="/character_sheet"/>
        <div>
          <Switch>
            <Route exact path="/character_form" component={ CharacterForm }/>
            <Route exact path="/character_sheet" component={ CharacterSheet }/>
          </Switch>
        </div>
      </Router>
    );
  }
}
