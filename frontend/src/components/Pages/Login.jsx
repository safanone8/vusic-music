import React from "react";
import "./css/Forms.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
// import Validation from "./Loginvalidation";

export default function Loginn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStastus, setLoginStastus] = useState("");

  const login = (e) => {
    e.preventDefault();
      Axios.post("http://localhost:3003/login",{
        username: username,
        password : password
      }).then((response) => {
          if(response.data.message){
              setLoginStastus(response.data.message);
          }else {
            setLoginStastus(response.data[0].username);
          }
      })
  }
    // const [values, setValues] = useState ({
    //   username: '',
    //   password: '',
    //   loginStastus: ''
    // });

    // const [errors, setEroors] = useState ({
      
    // });

    
    // const handleInput =(event) => {
    //   const { value, name} = event.target;
    //   setValues(prev => ({...prev, [name]: [value]}))
    // }

    // const handleSubmit =(event) => {
    //   event.preventDefault();
    //   setEroors(Validation (values));
    // }

  return (
    <div>
        <div>
          <form className="f-form" > {/* //onSubmit={handleSubmit} */}
            <div className="container">
              <img src="../assets/img/headphones.svg" alt="" />
              <h1 className="t-heading2">Welcome to Vusic</h1><br /><hr />
              <h2 className="t-heading">Login Form</h2>
              
              <label className="username" htmlFor="username">Username:</label><br/>
              <input
                type="text"
                name="username"
                id="un"
                placeholder="Enter your Username"
                onChange={(e) => {setUsername(e.target.value)}}
                required
              />
              {/* {errors.username && <span style={{color: "red"}}> {errors.username} </span> } */}
              <br />
              <label className="passwoord" >Password:</label><br/>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => {setPassword(e.target.value)}}
                required

              />
              {/* {errors.password && <span style={{color: "red"}}> {errors.password} </span> } */}
             <br />
              <input type="submit" name="submit" onClick={login} value="Login" />
              <br />
              <h4 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }} > {loginStastus} </h4>
              <h5 className="t-heading">
                If you don't have an account 
                <Link to="/signup" style={{color : "red"}} >Click here</Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
  )
}






















// import React from "react";
// import "./css/Forms.css";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// class Loginn extends React.Component {
//   render() {

//     const [value, setValues] = useState ({
      
//     });

//     const handleSubmit =(event) => {
//       event.preventDefault();
//     }
//     return (
//       <div>
//         <div>
//           <form action="www.safan.com" method="post" className="f-form" onSubmit={handleSubmit}>
//             <div className="container">
//               <img src="../assets/img/headphones.svg" alt="" />
//               <h1 className="t-heading2">Welcome to Vusic</h1><br /><hr />
//               <h2 className="t-heading">Login Form</h2>
              
//               <label className="username">Username:</label><br/>
//               <input
//                 type="text"
//                 name="username"
//                 id="un"
//                 placeholder="username"
//                 required
//               />
//               <br />
//               <label className="passwoord">Password:</label><br/>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="password"
//                 required
//               />
//              <br />
//               <input type="submit" name="submit" value="Login" />
//               <br />
//               <h5 className="t-heading">
//                 If you don't have an account{" "}
//                 <Link to="/signup">Click here</Link>
//               </h5>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Loginn;


