import React from "react";
import "./css/Forms.css";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Validation from "./Loginvalidation";
import Axios from "axios";

export default function Signup(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerStstus, setRegisterStastus] = useState("");

  const register = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:3001/register",{
        email: email,
        username: username,
        password : password,
      }).then((response) => {
          if(response.data.message){
              setRegisterStastus(response.data.message);
          }else {
            setRegisterStastus("ACCOUNT CREATED SUCESSFULLY PLEASE LOGIN !");
          }
      })
  }
  // const navigate = navigate();
  
  // const handleInput = (event) => {
  //   const { value, name} = event.target;
  //   setValues((prev) => ({
  //     ...prev,
  //     [name]: [value],
  //   }));
  // };
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setEroors(Validation(values));
  //   if (
  //     errors.name === "" &&
  //     errors.password === "" &&
  //     errors.moblie_number === "" &&
  //     errors.email === ""
  //   ) {
  //     axios
  //       .post("http://localhost:8081/signup", values)
  //       .then((res) => {
  //         props.navigate('/');
  //       } )
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <div>
      <div>
         <form className="f-form" > {/* //onSubmit={handleSubmit} */}
          <div className="container">
            <h1 className="t-heading2">Welcome to Vusic</h1>
            <br />
            <hr />
            <h2 className="t-heading" >Sign up Form</h2>
            <div>
              <label className="email">Email:</label>
              <br />
              <input
                type="text"
                name="email"
                id="em"
                placeholder="Enter your Email address"
                required
                onChange={(e) => {setEmail(e.target.value)}}              />
              {/* {errors.email && <span style={{color: "red"}}> {errors.email} </span> } */}
              <br />
            </div>
            <div>
              <label className="username" htmlFor="username" >username:</label>
              <br />
              <input
                type="text"
                name="username"
                id="un"
                placeholder="Enter your Username"
                required
                onChange={(e) => {setUsername(e.target.value);}}
                />
              {/* {errors.name && <span style={{color: "red"}}> {errors.name} </span> } */}
              <br />
            </div>

            <div>
              <label className="passwoord" htmlFor="password" >Password:</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => {setPassword(e.target.value);}}              />
              {/* {errors.password && <span style={{color: "red"}}> {errors.password} </span> } */}
              <br />
            </div>
            {/* <div>
              <label className="mobile_number">Mobile_Number:</label>
              <br />
              <input
                type="text"
                name="mobile_number"
                id="Mn"
                placeholder="Mobile Number"
                required
                onChange={(e) => {setMobile_number(e.target.value)}}              />
              {/* {errors.mobile_number && <span style={{color: "red"}}> {errors.mobile_number} </span> } 
              <br />
            </div> */}
            
            <input type="submit" name="submit" onClick={register} value="Sign up" />
            <br />
            <h4 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }} >{registerStstus}</h4>
            <h5 className="t-heading">
              Return to{" "}
              <Link to="/" style={{ color: "red" }}>
                Log in
              </Link>{" "}
              page
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
}
