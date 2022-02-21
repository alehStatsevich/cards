import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {removeDeckThunk, updateValueThunk} from "../../cardDecks_reducer";
import {TAppState} from "../../../../n2-bll/store";
import {NavLink} from 'react-router-dom';
import {setPackName} from '../../../f6-cards/cards_reducer'
import SuperButton from "../../../../n4-common/components/Elements/e1-SuperButton/SuperButton";
import s from './PackItem.module.css'
import {DeleteModal} from "../../../../n4-common/components/c9-Modals/DeleteModal/DeleteModal";
import {UpdateModal} from "../../../../n4-common/components/c9-Modals/UpdateModal/UpdateModal";

type PropsType = {
    name: string
    cardsCount: number
    updated: string
    user_name: string
    id: string
    userId: string
}
const PackItem = ({name, cardsCount, updated, user_name, id, userId}: PropsType) => {
    const [shownDeleteModal, setShownDeleteModal] = useState(false)
    const [shownUpdateModal, setShownUpdateModal] = useState(false)
    const [nameOfPack, setNameOfPack] = useState('')

    const user_id = useSelector<TAppState, string>(state => state.profile._id)
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)
    const dispatch = useDispatch()

    const removeDeckHandler = () => {
        dispatch(removeDeckThunk(id))
        setShownDeleteModal(false)
    }

    const updateNameHandler = () => {
        if(nameOfPack.length) {
            dispatch(updateValueThunk(id, nameOfPack))
            setShownUpdateModal(false)
        }
    }

    const onNavLinkClick = () => dispatch(setPackName({packName: name}))

    return (
        <div className={s.table__body}>
            {user_id === userId ?
                <DeleteModal onClick={removeDeckHandler}
                             title={'Delete Pack'}
                             value={`Do you really want to remove Pack Name - ${name}?
                                    All cards will be excluded from this course.`}
                             close={() => setShownDeleteModal(false)}
                             open={shownDeleteModal}/> : null
            }
            {user_id === userId ?
                <UpdateModal
                    onChange={(e) => setNameOfPack(e.currentTarget.value)}
                    onClick={updateNameHandler}
                    value={nameOfPack}
                    title={'Update deck name'}
                    close={() => setShownUpdateModal(false)}
                    open={shownUpdateModal}/> : null
            }

            <div className={s.table__item}>
                <NavLink to={`/cards/${id}`} className={s.table__link} onClick={onNavLinkClick}>{name}</NavLink>
            </div>
            <div className={s.table__item}>
                {cardsCount}
            </div>
            <div className={s.table__item}>
                {updated.slice(0, 10) + ', ' + updated.slice(11, 19)}
            </div>
            <div className={s.table__item}>
                {user_name}
            </div>
            <div className={s.table__item + ' ' + s.btn__group}>
                {user_id === userId ?
                    <SuperButton
                        className={s.actionBtn}
                        disabled={isFetching}
                        red
                        onClick={() => setShownDeleteModal(true)}>Delete</SuperButton> : null}
                {user_id === userId ? <SuperButton
                    className={s.actionBtn}
                    disabled={isFetching}
                    onClick={() => setShownUpdateModal(true)}>Edit</SuperButton> : null}
                { cardsCount === 0 ? '' : <NavLink to={`/learn/${id}`}
                    className={s.actionBtn + ' ' + s.actionLinkBtn}>Learn</NavLink>}
            </div>
        </div>

    )
}

export default PackItem


