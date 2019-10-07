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
        }
    };

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


    render(){
        const {isLoaded, userData,progressing} = this.state;
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
                    return <li key={i}>이름 : {data.name}, 그룹명 : {data.board.content}
                    <span onClick={this.clickDeleteBtn.bind(this, data.id, data.name)}>x</span>
                </li>
                })}                  
            </ul>
            </div>
            :
            <div>로딩중</div>
        );
    }
}

export default UserList;