import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import md5 from 'md5';
import './App.css';

const options = {
  withCredentials: true
};

function App() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  React.useEffect(() => {
    axios.get('/service1/', options)
      .then((res) => {
        console.log(res)
      })
      .catch(console.log);
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY otherwise it will rerun after every single render

  React.useEffect(() => {
    const body = {
      username: 'asd',
      password: 'asd',
    };
    axios.post('/service2/', body, options)
      .then((res) => {
        //document.cookie = 'username=username'; //set cookies with key/value pairs
        //document.cookie = 'password=password'; //set cookies with key/value pairs
        console.log(res)
      })
      .catch(console.log);
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  const fetchProtectedData=() => {
    axios.get('/service1/', options)
      .then((res) => {
        console.log(res)
      })
      .catch(console.log);

  };


  const validate = () => {
    const body = {
      username,
      password: md5(password),
    };
    axios.post('/service2/', body, options)
    .then((res) => {
      if (res.data.valid){
      document.cookie = `username=${username}`; //set cookies with key/value pairs
      document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
    }else{

    }
    console.log(res)
    })
    .catch(console.log);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input value = {username}
        onChange = {e => setUsername(e.target.value)} />

        <input type ="password" value = {password}
        onChange = {e => setPassword(e.target.value)} />

        <button onClick={validate}>Submit</button>
        <button onClick={fetchProtectedData}>Get Data</button>

      </header>
    </div>
  );
}

export default App;
