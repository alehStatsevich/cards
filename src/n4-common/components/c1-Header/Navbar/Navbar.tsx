import s from '../Header.module.css'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../../n1-app/a2-routes/Routes'
import {Human_img} from '../../../../assets/img/profile/human_img'
import {Cards_img} from '../../../../assets/img/profile/cards_img'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logoutThunk} from '../../../../n5-features/f1-login/login_reducer'
import {TAppState} from '../../../../n2-bll/store'

export const Navbar = () => {

    const dispatch = useDispatch()
    const logout = () => dispatch(logoutThunk())

    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)
    const isAuth = useSelector<TAppState, boolean>(state => state.login.isAuth)

    return (
        <div className={s.navbarWrapper}>
            <div className={s.navbarContainer}>
                <NavLink to={PATH.CARD_DECKS} className={`${s.navLink} ${isFetching ? s.isDisabled : ''}`}
                         activeClassName={s.active}>
                    <div className={s.navLinkContext}>
                        <Cards_img/>
                        <span>Packs list</span>
                    </div>
                </NavLink>
                <NavLink to={PATH.PROFILE} className={`${s.navLink} ${isFetching ? s.isDisabled : ''}`}
                         activeClassName={s.active}>
                    <div className={s.navLinkContext}>
                        <Human_img/>
                        <span>Profile</span>
                    </div>
                </NavLink>
            </div>
            {isAuth && <div className={`${s.logout} ${isFetching ? s.isDisabled : ''}`} onClick={logout}>Log out</div>}
        </div>
    )
}