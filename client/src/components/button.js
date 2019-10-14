import React from 'react';

class Button extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const {plusClickBtn, minusClickBtn} = this.props
        return(
            <div>
                  <button onClick={plusClickBtn} style={{width:100, height:50, marginBottom:20}}>+</button>
                  <button onClick={minusClickBtn} style={{width:100, height:50}}>-</button>
            </div>
        )
    }
}

export default Button;