import { useState } from "react";
import { validateEmail } from "../validation/ValidateEmail";
import PAGES from "../Data/pages";
import Form from "./Form";
import './style.css'
import logo from "../images/logo.png";
import Spinner from "../instance/Spinner";






const[vote] = PAGES;
const Login = ({setLoggedUser, usersData, setCurrentPage }) => {

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const { email, password } = values;

    if (!email || validateEmail(email)) {
      const msg = "Please enter a valid email";
      handleError(msg, setEmailError);
    } else {
      setEmailError(false);
    }

    if (!password) {
      const msg = "Please enter a password";
      handleError(msg, setPasswordError);
    } else {
      setPasswordError(false);
    }

    if (!email || validateEmail(email) || !password) {
      setIsLoading(false);
      setIsError(true);
      return;
    } else {
      const userData = usersData.find((user) => user.email === email);
      if (userData) {
        if (userData.password !== password) {
          // Invalid password
          const msg = "Password does not match email";
          handleError(msg, setPasswordError);
          setIsError(true);
          setIsLoading(false);
        } else {
          setPasswordError(false);

          setTimeout(() => {
            setCurrentPage(vote);
            setLoggedUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
            });
          }, 2000);
        }
      } else {
        const msg = "No such email in database";
        handleError(msg, setEmailError);
        setIsError(true);
        setIsLoading(false);
      }
    }
  };

  const handleError = (msg, setMethod) => {
    setMethod(true);
    const messages = errorMessages;
    messages.push(msg);
    setErrorMessages(messages);
  };

  const closeModal = () => {
    setIsError(false);
    setErrorMessages([]);
  };

  return (
    <div className="full-page">
    <form className="form" onSubmit={onSubmit}>
    { isLoading ? <><Spinner /></>  : <></>}
    <div className="logo-container">
    <img src={logo} alt="logo" />
        </div>
       <p>Welcome</p>
        <Form
          error={emailError}
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <Form
          error={passwordError}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Log in
        </button>
         </form>
        {isError &&  <div className='modal-overlay'>
      <div className='modal-container'>
        <h2>Error</h2>
        <h3>{`${errorMessages.join(', ')}`}.</h3>
        <button className='btn close-modal-btn' onClick={closeModal}>
          OK
        </button>
      </div>
    </div>}

      
      <div className="drops">
    <div className="drop drop-1"></div>
    <div className="drop drop-2"></div>
    <div className="drop drop-3"></div>
    <div className="drop drop-4"></div>
    <div className="drop drop-5"></div>
  </div>
  
      </div>
  );
};

export default Login;