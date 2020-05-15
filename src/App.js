import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

function CharacterForm() {
  return <h2>placeholder for character form</h2>
}
