import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CharacterForm from "./components/characterForm";
import CharacterSheet from "./components/characterSheet";

export default function App() {  
  return (
    <Router>
      <Redirect from="/" exact to="/character_sheet"/>
      <div>
        <Switch>
          <Route exact path="/character_form">
            <CharacterForm/>
          </Route>
          <Route exact path="/character_sheet">
            <CharacterSheet/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
