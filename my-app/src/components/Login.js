import React from 'react';
import {post} from 'axios';
import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "localhost:5000";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            pw : '',
        }
    }

    login = () => {
        const url = 'http://127.0.0.1:5000/login'
        const formData = new FormData();
        const config = {
            headers : {
                'Access-Control-Allow-Origin': '*',
                'content-type' : 'multipart/form-data'
            }
        }
        formData.append('id', this.state.id);
        formData.append('pw', this.state.pw);

        return post(url, formData, config);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.login().then((res)=> {
            console.log(res.data);
            if (res.status == 200){
                this.props.onSuccess()
            }
        })
    }

    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }
    render () {
        return (
            <div>
            <form onSubmit={this.handleFormSubmit}>
                <h1>로그인</h1>
                <label>아이디</label>
                <input type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/>
                <label>패스워드</label>
                <input type="password" name="pw" value={this.state.pw} onChange={this.handleValueChange}/>
                <button type="submit">로그인</button>
                
            </form>
            <button onClick={this.props.onRegister}>회원가입</button>
            </div>
        )
    }
}
export default Login;