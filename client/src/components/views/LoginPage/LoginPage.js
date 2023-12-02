import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../../../_actions/user_action";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    // 해주지 않으면 페이지가 리프레쉬가 되어 버림. 원래 해야할 일들이 진행이 되지 않아서 리프레쉬를 막아줌.
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/');
        } else {
          alert('Error');
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <form
        style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage