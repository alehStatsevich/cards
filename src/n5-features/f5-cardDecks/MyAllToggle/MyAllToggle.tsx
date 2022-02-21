import React from 'react'
import s from '../CardDecks.module.css'

type TMyAllToggleProps = {
    isFetching: boolean
    user_id: string
    showMyDecksHandler: () => void
    getAllCardsHandler: () => void
}
export const MyAllToggle: React.FC<TMyAllToggleProps> = ({
                                                             isFetching,
                                                             user_id,
                                                             showMyDecksHandler,
                                                             getAllCardsHandler
                                                         }) => {
    return (
        <>
            <h3>Show packs cards</h3>
            <div className={s.show__packs_btn_group}>
                <button disabled={isFetching} onClick={showMyDecksHandler}
                        className={user_id ? s.active : ''}>My
                </button>
                <button disabled={isFetching} onClick={getAllCardsHandler}
                        className={user_id ? '' : s.active}>All
                </button>
            </div>
        </>
    )
}