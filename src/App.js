import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Color from "@wedgekit/color";
import CharacterForm from "./components/characterForm";
import CharacterSheet from "./components/characterSheet";

export default function App() {  
  document.body.style = `background: ${Color.N500}`;

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
