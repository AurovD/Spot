// import React from 'react';
// import MD5 from "../assets/md5";
// const Profile = ({setProfile, setNewProfile}) => {
//     const [loginPage, setRegPage] = React.useState(true);
//     const [login, setLogin] = React.useState({
//         login: "",
//         pass: ""
//     });
//     const [registration, setRegistration] = React.useState({
//                 login: "",
//                 name: "",
//                 email: "",
//                 pass: "",
//                 passCheck: ""
//     });
//
//
//     const submitLoginForm = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if(login.login !== "" && login.pass !== "") {
//             login.pass = MD5(login.pass)
//             setProfile(login);
//         }
//     };
//     const submitRegForm = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         console.log(registration.password, registration.passCheck)
//         if(registration.pass === registration.passCheck) {
//             registration.pass = MD5(registration.pass);
//             registration.passCheck = "";
//             setNewProfile(registration);
//         }
//     };
//
//
//     function switchProfileForm() {
//         loginPage ? setRegPage(false) : setRegPage(true)
//     }
//
//     return (
//         <div className="main__container">
//             {
//                 loginPage ?
//                 <div className="formBox">
//                     <h2>LOGIN</h2>
//                     <form action="" method="POST" className="profile_form">
//                         <div className="form_groupbox">
//                             <input type="text" className="form_element" placeholder="Логин" value={login.login} onChange={e => {
//                                 const val = e.target.value;
//                                 setLogin(prevState => {
//                                     return {...prevState, login: val}
//                                 });
//                             }} required/>
//                         </div>
//                         <div className="form_groupbox">
//                             <input type="password" className="form_element" placeholder="Пароль" value={login.pass}
//                                    onChange={e => {
//                                        const val = e.target.value;
//                                        setLogin(prevState => {
//                                            return {...prevState, pass: val}
//                                        });
//                                    }}
//                                    required/>
//                         </div>
//                         <input className="button__submit" type="submit" value="Войти" onClick={submitLoginForm}/>
//                     </form>
//                     <p className="profile_span">Нет учетной записи? <span onClick={switchProfileForm}>Создать учетную запись</span></p>
//                 </div> :
//                 <div className="formBox">
//                     <h2>SIGNUP</h2>
//                     <form action="" method="POST" className="profile_form">
//                         <div className="form_groupbox">
//                             <input type="text"  className="form_element" placeholder="Логин" value={registration.login} onChange={e => {
//                                 const val = e.target.value;
//                                 setRegistration(prevState => {
//                                     return {...prevState, login: val}
//                                 });
//                             }} required/>
//                         </div>
//                         <div className="form_groupbox">
//                             <input type="text"  className="form_element" placeholder="Имя" value={registration.name} onChange={e => {
//                                 const val = e.target.value;
//                                 setRegistration(prevState => {
//                                     return {...prevState, name: val}
//                                 });
//                             }} required/>
//                         </div>
//                         <div className="form_groupbox">
//                             <input type="email" className="form_element" placeholder="Email" value={registration.email} onChange={e => {
//                                 const val = e.target.value;
//                                 setRegistration(prevState => {
//                                     return {...prevState, email: val}
//                                 });
//                             }} required/>
//                         </div>
//                         <div className="form_groupbox">
//                             <input type="password" className="form_element" placeholder="Пароль" value={registration.pass}
//                                    onChange={e => {
//                                        const val = e.target.value;
//                                        setRegistration(prevState => {
//                                            return {...prevState, pass: val}
//                                        });
//                                    }}
//                                    required/>
//                         </div>
//                         <div className="form_groupbox">
//                             <input type="password" className="form_element" placeholder="Проверка пароля" value={registration.passCheck}
//                                    onChange={e => {
//                                        const val = e.target.value;
//                                        setRegistration(prevState => {
//                                            return {...prevState, passCheck: val}
//                                        });
//                                    }}
//                                    required/>
//                         </div>
//                         <div className="buttons">
//                             <button className="button__cancel" onClick={switchProfileForm}>Отмена</button>
//                             <input className="button__submit" type="submit" value="Зарегистрироваться" onClick={submitRegForm}/>
//                         </div>
//                     </form>
//                 </div>
//             }
//         </div>
//     );
// }
// export default Profile;