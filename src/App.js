// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Include Switch in the import statement
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CharacterList} />
        <Route path="/character/:id" component={CharacterDetails} />
      </Switch>
    </Router>
  );
}

export default App;
