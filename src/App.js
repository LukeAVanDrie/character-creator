import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CharacterForm from "./components/characterForm";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Create a Character</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <CharacterForm/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
