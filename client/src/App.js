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

   plusClickBtn=async()=>{
    await this.setState({
        count: this.state.count+1
      });
    await console.log(this.state.count);
  }

  minusClickBtn=async()=>{
    await this.setState({
      count: this.state.count-1
    });
    await console.log(this.state.count)
  }

  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.plusClickBtn} style={{width:100, height:50, marginBottom:20}}>+</button>
        <button onClick={this.minusClickBtn} style={{width:100, height:50}}>-</button>
        <div>{this.state.count}</div>
        {/* <UserList/> */}
      </header>
    </div>
  );
  }
}

export default App;
