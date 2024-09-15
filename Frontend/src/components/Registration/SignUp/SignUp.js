// import { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import "../../pages/Registration/Registration.css";
// import Registrantion from "../../../pages/Registration/Registrantion";
// import Button from "../../Button/Button";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const REGISTER_URL = "/register";

// const SignUp = () => {
//   const userRef = useRef();
//   const errRef = useRef();

//   const [user, setUser] = useState("");
//   const [validName, setValidName] = useState(false);
//   const [userFocus, setUserFocus] = useState(false);

//   const [pwd, setPwd] = useState("");
//   const [validPwd, setValidPwd] = useState(false);
//   const [pwdFocus, setPwdFocus] = useState(false);

//   const [matchPwd, setMatchPwd] = useState("");
//   const [validMatch, setValidMatch] = useState(false);
//   const [matchFocus, setMatchFocus] = useState(false);

//   const [errMsg, setErrMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   useEffect(() => {
//     setValidName(USER_REGEX.test(user));
//   }, [user]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(pwd));
//     setValidMatch(pwd === matchPwd);
//   }, [pwd, matchPwd]);

//   useEffect(() => {
//     setErrMsg("");
//   }, [user, pwd, matchPwd]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newUser = {
//       user: user,
//       pwd: pwd,
//     };

//     try {
//       const res = await axios.post("https://api.example.com/items", newUser);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Registrantion>
//       {success ? (
//         <section>
//           <h1>Success!</h1>
//           <p>
//             <a href="/">Sign In</a>
//           </p>
//         </section>
//       ) : (
//         <section>
//           <p
//             ref={errRef}
//             className={errMsg ? "errmsg" : "offscreen"}
//             aria-live="assertive"
//           >
//             {errMsg}
//           </p>
//           <h1>Register</h1>
//           <form onSubmit={handleSubmit}>
//             <label className="label">Username:</label>
//             <input
//               type="text"
//               id="username"
//               ref={userRef}
//               autoComplete="off"
//               onChange={(e) => setUser(e.target.value)}
//               value={user}
//               required
//               aria-invalid={validName ? "false" : "true"}
//               aria-describedby="uidnote"
//               onFocus={() => setUserFocus(true)}
//               onBlur={() => setUserFocus(false)}
//             />
//             <p
//               id="uidnote"
//               className={
//                 userFocus && user && !validName ? "instructions" : "offscreen"
//               }
//             >
//               4 - 24 characters
//             </p>

//             <label className="label">Password:</label>
//             <input
//               type="password"
//               id="password"
//               onChange={(e) => setPwd(e.target.value)}
//               value={pwd}
//               required
//               aria-invalid={validPwd ? "false" : "true"}
//               aria-describedby="pwdnote"
//               onFocus={() => setPwdFocus(true)}
//               onBlur={() => setPwdFocus(false)}
//             />
//             <p
//               id="pwdnote"
//               className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
//             >
//               8 - 24 characters.
//             </p>
//             <div className="registration-button-container">
//               <Button
//                 onClick={handleSubmit}
//                 buttonStyle="btn-outline"
//                 buttonSize="btn-max-width"
//               >
//                 Sign Up
//               </Button>
//             </div>
//           </form>
//           <p className="registration-subtext">
//             Already registered?{" "}
//             <span className="line">
//               <a href="/login">login</a>
//             </span>
//           </p>
//         </section>
//       )}
//     </Registrantion>
//   );
// };

// export default SignUp;
