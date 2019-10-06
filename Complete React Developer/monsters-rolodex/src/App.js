import React from 'react';
import { CardList } from './components/card-list/card-llst.component';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      monsters: []
    };
  }
  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  render() {
    return (
      <div className="App">
        <CardList name="test">
          {this.state.monsters.map(monster => (
            <h1 key={monster.id}>{monster.name}</h1>
          ))}
        </CardList>
      </div>
    );
  }
}

export default App;
