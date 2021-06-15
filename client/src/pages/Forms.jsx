import React from 'react';
import MD5 from "../assets/md5";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {setUser} from "../redux/actions/users";
// http://codepickup.in/php/create-a-zoom-meeting-using-zoom-api/

const Forms = ({setProfile, setNewProfile}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loginPage, setRegPage] = React.useState(true);


    function switchProfileForm() {
        loginPage ? setRegPage(false) : setRegPage(true)
    }

    const [login, setLogin] = React.useState({
        email: "",
        pass: ""
    });
    const [registration, setRegistration] = React.useState({
        name: "",
        email: "",
        pass: "",
        passCheck: ""
    });

    // const [body, setBody] = React.useState({
    //     title: "Test",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    //     price: 0,
    //     startDate: "",
    //     startTime: "",
    //     type: "",
    //     periodic: "",
    //     user: profile
    // });

    // const sendForm = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     let fd = new FormData();
    //     if(selectedFiles.length !== 0) {
    //         selectedFiles.files.forEach((file) => {
    //             fd.append('file', file)
    //         })
    //     }
    //     for (let k in body) {
    //         fd.append(k, typeof body[k] === "string" ? body[k] : JSON.stringify(body[k]));
    //     }
    //     dispatch(create(fd));
    // }

    const submitLoginForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(login.login !== "" && login.pass !== "") {
            login.pass = MD5(login.pass)
            setProfile(login);
            history.push("/");
        }
    };
    const submitRegForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(registration.pass === registration.passCheck) {
            registration.pass = MD5(registration.pass);
            registration.passCheck = "";
            setNewProfile(registration);
            setRegistration({
                name: "",
                email: "",
                pass: "",
                passCheck: ""
            })
            setRegPage(true)
        }
    };


    return (
        <div className="form__container">
            {
                loginPage ?
                        <div className="formBox">
                    <h2>LOGIN</h2>
                    <form action="" method="POST" className="profile_form">
                        <div className="form_groupbox">
                            <input type="text" className="form_element" placeholder="Email" value={login.email}
                                   onChange={e => {
                                       const val = e.target.value;
                                       setLogin(prevState => {
                                           return {...prevState, email: val}
                                       });
                                   }} required/>
                        </div>
                        <div className="form_groupbox">
                            <input type="password" className="form_element" placeholder="Пароль" value={login.pass}
                                   onChange={e => {
                                       const val = e.target.value;
                                       setLogin(prevState => {
                                           return {...prevState, pass: val}
                                       });
                                   }}
                                   required/>
                        </div>
                        <input className="button__submit" type="submit" value="Войти" onClick={submitLoginForm}/>
                    </form>
                    <p className="profile_span">Нет учетной записи? <span onClick={switchProfileForm}>Создать учетную запись</span>
                    </p>
                </div> :
                <div className="formBox">
                    <h2>SIGNUP</h2>
                    <form action="" method="POST" className="profile_form">
                        <div className="form_groupbox">
                            <input type="text"  className="form_element" placeholder="Имя" value={registration.name} onChange={e => {
                                const val = e.target.value;
                                setRegistration(prevState => {
                                    return {...prevState, name: val}
                                });
                            }} required/>
                        </div>
                        <div className="form_groupbox">
                            <input type="email" className="form_element" placeholder="Email" value={registration.email} onChange={e => {
                                const val = e.target.value;
                                setRegistration(prevState => {
                                    return {...prevState, email: val}
                                });
                            }} required/>
                        </div>
                        <div className="form_groupbox">
                            <input type="password" className="form_element" placeholder="Пароль" value={registration.pass}
                                   onChange={e => {
                                       const val = e.target.value;
                                       setRegistration(prevState => {
                                           return {...prevState, pass: val}
                                       });
                                   }}
                                   required/>
                        </div>
                        <div className="form_groupbox">
                            <input type="password" className="form_element" placeholder="Проверка пароля" value={registration.passCheck}
                                   onChange={e => {
                                       const val = e.target.value;
                                       setRegistration(prevState => {
                                           return {...prevState, passCheck: val}
                                       });
                                   }}
                                   required/>
                        </div>
                        <div className="buttons">
                            <button className="button__cancel" onClick={switchProfileForm}>Отмена</button>
                            <input className="button__submit" type="submit" value="Зарегистрироваться" onClick={submitRegForm}/>
                        </div>
                    </form>
                </div>
            //     <div className="formBox formBox__grid">
            //     <h2>CREATE</h2>
            //     <form className="create__grid" action="/api/createEvent" method="POST" encType="multipart/form-data">
            //         <div className="form_groupbox">
            //             <div className="form-group">
            //                 <label className="form-group_label">Цена</label>
            //                 <input className="form_element form-group_element" type="number" min="0" step="10" max="7000" placeholder="Цена"
            //                        value={body.price} onChange={e => {
            //                     const val = e.target.value;
            //                     setBody(prevState => {
            //                         return {...prevState, price: val}
            //                     });
            //                 }}
            //                 />
            //             </div>
            //         </div>
            //         <div className="form-group">
            //             <label className="form-group_label">Периодичность</label>
            //             <select name="type" className="form_element" id="list"  value={body.periodic} onChange={e => {
            //                 const val = e.target.value;
            //                 setBody(prevState => {
            //                     return {...prevState, periodic: val}
            //                 });
            //             }}>
            //                 <option value="No_repeat">Не повторяется</option>
            //                 <option value="Every_work_day">Каждый рабочий день</option>
            //                 <option value="Every_day">Ежедневно</option>
            //                 <option value="Every_week">Еженедельно</option>
            //                 <option value="Every_month">Ежемесячно</option>
            //                 <option value="Every_year">Ежегодно</option>
            //             </select>
            //         </div>
            //         {/*<div className="form_groupbox">*/}
            //         {/*    <div className="form-group">*/}
            //         {/*        <label className="form-group_label">Старт продаж*/}
            //         {/*            <input className="form_element form-element__double" type="date" /></label>*/}
            //         {/*    </div>*/}
            //         {/*    <div className="form-group">*/}
            //         {/*        <label className="form-group_label">Окончание продаж*/}
            //         {/*            <input className="form_element" type="date" /></label>*/}
            //         {/*    </div>*/}
            //         {/*</div>*/}
            //         <input className="button__submit" type="submit" value="Создать" onClick={sendForm}/>
            //     </form>
            // </div>
            }
        </div>
    );
};
export default Forms;