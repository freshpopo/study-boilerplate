import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../../_actions/user_action";

function RegisterPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name, setName] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
    // 해주지 않으면 페이지가 리프레쉬가 되어 버림. 원래 해야할 일들이 진행이 되지 않아서 리프레쉬를 막아줌.
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/login');
        } else {
          alert("Failed to sign up");
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
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <br/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br/>
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default RegisterPage