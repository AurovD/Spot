import React from 'react';
import logo from '../assets/logo.svg';
import {Link} from 'react-router-dom';
import {setForm} from "../redux/actions/users";
import {useDispatch} from "react-redux";
const Header = ({profile}) => {
    console.log(profile)
    const dispatch = useDispatch();
    return (
        <header>
            <input type="text"/>
            <div className="header__profile">
                {profile && <button className="profile__button profile__button__create" onClick={event => {
                    event.preventDefault();
                    dispatch(setForm(true, "create"));
                }}>Создать</button>}
                {
                    profile ?
                        <Link to="">
                            <button className="profile__button" onClick={event => {}}>{profile}</button>
                        </Link> :
                        <button className="profile__button profile__button__login" onClick={
                            event => {
                                event.preventDefault();
                                dispatch(setForm(true, "login"));
                            }
                        }>Войти</button>
                }
            </div>
        </header>
    );
}
export default Header;