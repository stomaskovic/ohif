import React, { ReactElement, useState} from 'react';
import {Button, Input} from "@ohif/ui";
import { useNavigate } from 'react-router-dom';

export interface IErrorMessage {
  name: string;
  message: string;
}

function LoginComponent(): ReactElement {
  const [errorMessages, setErrorMessages] = useState<IErrorMessage>({ name: '', message: ''});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  // User Login info
  const database = [
    {
      username: "admin",
      password: "admin"
    },
    {
      username: "user",
      password: "user"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {uname, pass} = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        localStorage.setItem('loggedIn', '1')

        navigate({
          pathname: userData.username === 'admin' ? '/admin' : '/',
        });
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit} method="post">
        <div className="input-container">
          <Input label="Username (admin or user)" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <Input type="password" label="Password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <Button onClick={(e) => { handleSubmit(e) }} className="mt-2">Login</Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form w-[500px] mx-auto mt-[50px] bg-customblue-40 text-white p-[50px]">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in. Redirecting...</div> : renderForm}
      </div>
    </div>
  );
}

export default LoginComponent;
