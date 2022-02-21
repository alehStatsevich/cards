import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from '../../n5-features/f1-login/Login'
import {RestorePassword} from '../../n5-features/f4-password/restore_pw/RestorePassword'
import {SetNewPassword} from '../../n5-features/f4-password/set_new_pw/SetNewPassword'
import {Tests} from '../../n6-tests_and_trash/t1-tests/Tests'
import Registration from '../../n5-features/f2-registration/Registration'
import {CardDecks} from '../../n5-features/f5-cardDecks/CardDecks'
import {Cards} from '../../n5-features/f6-cards/Cards'
import Learn from '../../n5-features/f7-learn/Learn'

//* ========================================================= Constants for routes ================================>>
export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore',
    SET_NEW_PASSWORD: '/set-new-password/:token?',
    TESTS: '/tests',
    CARD_DECKS: '/card-decks',
    CARDS: '/cards/:packId?',
    LEARN: '/learn/:packId?',
    NOT_FOUND: '/404'
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.PROFILE} render={() => <CardDecks type={'profile'}/>}/>
                <Route path={PATH.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                <Route path={PATH.SET_NEW_PASSWORD} render={() => <SetNewPassword/>}/>
                <Route path={PATH.CARD_DECKS} render={() => <CardDecks type={'packs list'}/>}/>
                <Route path={PATH.CARDS} render={() => <Cards/>}/>
                <Route path={PATH.LEARN} render={() => <Learn/>}/>
                <Route path={PATH.TESTS} render={() => <Tests/>}/>
                <Route path={PATH.NOT_FOUND} render={() => <h1>404 PAGE NOT FOUND</h1>}/>
                <Route path={'/*'} render={() => <Redirect to={PATH.NOT_FOUND}/>}/>
            </Switch>
        </div>
    )
}