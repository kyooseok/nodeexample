import React from 'react';
import axios from 'axios';

class UserList extends React.Component{
    constructor(props){
        super(props);
        console.log("constructor: ", this);
        this.state={
            isLoaded : false,
            userData : [],
            progressing: false,
            editable : false
        }
    };

    changeEditable=()=>{
        const {editable} = this.state;
        if(editable){
            this.setState({
                editable: false
            });
        }else{
            this.setState({
                editable: true
            });
        }
    }

    async getUserAll(){
        const result = await axios.get("http://localhost:5000/users");
        console.log(result);
        this.setState({
            isLoaded:true,
            userData : result.data
        });
    }

    componentDidMount(){
        console.log("componentdidmount : ", this);
        setInterval(()=>{
          this.getUserAll();
        }, 2000);
    }

   async clickDeleteBtn(id,name){
        await this.setState({
            progressing : true
        })
        await alert(`id: ${id}, name: ${name}을 삭제합니다.`);
        if(this.state.progressing){
         setTimeout(async()=>{
            await axios.delete(`http://localhost:5000/users/${id}`);
            await this.getUserAll();
            this.setState({
                progressing : false
            }) 
        }, 1000);
        }
    }

    clickAddBtn=async()=>{
      console.log(this.refs);
       await axios.post(`http://localhost:5000/users`, {
           name : this.refs.name.value,
           address : this.refs.address.value      
       });
       const result = await axios.get("http://localhost:5000/users");

       await this.setState({
            editable:true,
            userData : result.data
        }, console.log(this.state.userData));

    }


    render(){
        const {isLoaded, userData,progressing,editable} = this.state;
        return( isLoaded ?
            <div>
                {
                progressing &&
                  <div className="loadmask">
                    <img src='/img/loading.gif'></img>
                 </div>
                 }
            <ul>
                {userData.map((data, i)=>{
                    return <li key={i}>이름 : {data.name},주소: {data.address}
                    <span onClick={this.clickDeleteBtn.bind(this, data.id, data.name)}>x</span>
                    </li>
                })}                  
            </ul>
           
            {
                editable ? 
                <div>
                <div onClick={this.changeEditable}>닫기</div>
                    <input type='text' ref='name' placeholder='이름'></input>
                    <input type='text' ref='address' placeholder='주소'></input>
                    <span  onClick={this.clickAddBtn} style={{fontSize:'0.6em'}}>추가하기</span>
                </div> 
                :
                <div>
                <div onClick={this.changeEditable}>+</div>
                </div> 
            }
            </div>
            :
            <div>로딩중</div>
        );
    }
}

export default UserList;