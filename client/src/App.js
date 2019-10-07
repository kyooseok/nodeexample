import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/userList';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      count:0
    }
  }

  plusClickBtn=()=>{
      this.setState({
        count: this.state.count+1
      }, console.log(this.state.count));
  }

  minusClickBtn=()=>{
    this.setState({
      count: this.state.count-1
    }, console.log(this.state.count));
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.plusClickBtn}>+</button>
        <button onClick={this.minusClickBtn}>-</button>
        {/* <UserList/> */}
      </header>
    </div>
  );
  }
}

export default App;
