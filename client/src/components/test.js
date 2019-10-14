import React from 'react';
import '../App.css';
import Button from './button';


class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
          count:0
        }
      }

    
       plusClickBtn=()=>{
         this.setState({
            count: this.state.count+1
          });
     
      }
    
       minusClickBtn=()=>{
        this.setState({
            count: this.state.count-1
          });
      }
    render(){
        const {count}=this.state;
        return(
            <div>
                <Button plusClickBtn={this.plusClickBtn} minusClickBtn={this.minusClickBtn}/>
                <div>{count}</div>
            </div>
        )
    }
}

export default Test;