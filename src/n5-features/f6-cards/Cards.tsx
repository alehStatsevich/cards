import React, {useCallback, useEffect, useState} from 'react'
import s from './Cards.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createCard, deleteCard, getCards, setGetRequestParams, TSetRequestParams, updateCard} from './cards_reducer'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardData, TCardUpdateData} from '../../n3-api/cards_api'
import {
    selectCardQuestion,
    selectCards,
    selectCardsPack_id,
    selectCardsTotalCount,
    selectCurrentPage,
    selectPackName,
    selectPackUserId,
    selectPageCount
} from '../../n2-bll/selectors/cards_selectors'
import {selectUser_id} from '../../n2-bll/selectors/profile_selectors'
import {selectIsFetching} from '../../n2-bll/selectors/app_selectors'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'
import {SearchBar} from '../../n4-common/components/c5-SearchBar/SearchBar'
import {Paginator} from '../../n4-common/components/с6-Paginator/Paginator'
import {SelectPage} from '../../n4-common/components/c7-SelectPage/SelectPage'
import {ItemsTable} from './ItemsTable/ItemsTable'
import {DeleteModal} from '../../n4-common/components/c9-Modals/DeleteModal/DeleteModal'
import {CardModal} from '../../n4-common/components/c9-Modals/CardModal/CardModal'


export const Cards = React.memo(() => {
    //* ==================================  local state  ==========================================================>>
    const [shownModal, setShownModal] = useState(false)
    const [shownDeleteModal, setShownDeleteModal] = useState(false)
    const [shownUpdateModal, setShownUpdateModal] = useState(false)
    const [activeCardId, setActiveCardId] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    //* ==================================  Data  =================================================================>>
    const dispatch = useDispatch()
    const isFetching = useSelector(selectIsFetching)
    const history = useHistory()
    // id's
    const cardsPack_id = useSelector(selectCardsPack_id)
    const user_id = useSelector(selectUser_id)
    const packUserId = useSelector(selectPackUserId)
    // cards data
    const packName = useSelector(selectPackName)
    const cards = useSelector(selectCards)
    const cardsTotalCount = useSelector(selectCardsTotalCount)
    const cardQuestion = useSelector(selectCardQuestion)
    // page data
    const currentPage = useSelector(selectCurrentPage)
    const pageCount = useSelector(selectPageCount)

    const packIdParam = useParams<{ packId: string }>()

    // check if it's current user's deck of cards or not and renders Actions, edit and delete according to result
    const isUsersPack = packUserId === user_id
    // hardcode data for create card testing
    const newCard: TCardData = {
        cardsPack_id,
        question: question,
        answer: answer,
        grade: 3
    }

    const editedCard: TCardUpdateData = {
        _id: activeCardId,
        question: question,
        answer: answer,
        grade: 3
    }

    //* ==================================  Callbacks  ============================================================>>
    const createCardCallback = () => {
        if (newCard.question?.length) {
            dispatch(createCard(newCard))
            setShownModal(false)
            setQuestion('')
            setAnswer('')
        }
    }
    const deleteCardCallback = () => {
        dispatch(deleteCard(activeCardId))
        setShownDeleteModal(false)
    }
    const updateCardCallback = () => {
        dispatch(updateCard(editedCard))
        setShownUpdateModal(false)
        setQuestion('')
        setAnswer('')
    }

    const closeEditCardModal = () => {
        setQuestion('')
        setAnswer('')
        setShownUpdateModal(false)
    }

    // helper for all kind of searching and sorting operations
    const setGetRequestParamsCallback = useCallback((requestParams: TSetRequestParams) => {
        dispatch(setGetRequestParams(requestParams))
        dispatch(getCards())
    }, [dispatch])
    const searchCard = (searchText: string) => setGetRequestParamsCallback({cardQuestion: searchText})
    const sortCards = (param: string) => setGetRequestParamsCallback({sortCards: param})
    // paginator callbacks
    const onPageNumberChange = (page: number) => setGetRequestParamsCallback({page})
    const onPageCountChange = (pageCount: number) => setGetRequestParamsCallback({pageCount})

    // if no packUserId is settled in redux, send request
    useEffect(() => {
        if (packIdParam.packId !== ':packId') setGetRequestParamsCallback({cardsPack_id: packIdParam.packId})
    }, [packIdParam, setGetRequestParamsCallback])

    if (packIdParam.packId === ':packId') return <Redirect to={PATH.CARD_DECKS}/>

    return (
        <div className={s.container}>
            {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
            {isUsersPack &&
            <CardModal open={shownModal}
                       close={() => setShownModal(false)}
                       closeBtn={false}
                       question={question}
                       answer={answer}
                       questionOnchange={(e) => setQuestion(e.currentTarget.value)}
                       answerOnchange={(e) => setAnswer(e.currentTarget.value)}
                       onClick={createCardCallback}/>}
            {isUsersPack &&
            <CardModal open={shownUpdateModal}
                       close={closeEditCardModal}
                       closeBtn={false}
                       question={question}
                       answer={answer}
                       questionOnchange={(e) => setQuestion(e.currentTarget.value)}
                       answerOnchange={(e) => setAnswer(e.currentTarget.value)}
                       onClick={updateCardCallback}/>}
            {isUsersPack &&
            <DeleteModal onClick={deleteCardCallback}
                         title={'Delete Pack'}
                         value={`Do you really want to remove this card?`}
                         close={() => setShownDeleteModal(false)}
                         open={shownDeleteModal}
            />}

            <div className={s.cardsContainer}>
                <div className={s.title}>
                    <div onClick={() => history.goBack()} className={s.arrow}>&larr;</div>
                    <h2>{packName}</h2>
                </div>
                <div className={s.search}>
                    <SearchBar searchCallback={searchCard} disabled={isFetching} searchTextRequest={cardQuestion}/>
                    {isUsersPack &&
                    <SuperButton onClick={() => setShownModal(true)} disabled={isFetching}>Add new card</SuperButton>}
                </div>
                <ItemsTable items={cards}
                            isUsersPack={isUsersPack}
                            isFetching={isFetching}
                            sortCallback={sortCards}
                            shownDeleteModal={setShownDeleteModal}
                            shownUpdateModal={setShownUpdateModal}
                            setCardId={setActiveCardId}
                            setAnswer={setAnswer}
                            setQuestion={setQuestion}
                />

                <div className={s.paginator}>
                    <Paginator totalItemsCount={cardsTotalCount}
                               pageSize={pageCount}
                               currentPage={currentPage}
                               disabled={isFetching}
                               onPageNumberClick={onPageNumberChange}
                    />
                    <SelectPage onChangeOptions={onPageCountChange}
                                defaultValue={pageCount}
                                disabled={isFetching}
                                description={'Cards per Page'}/>
                </div>
            </div>
        </div>
    )
})





