import React, {useCallback, useEffect, useState} from 'react'
import {Redirect, useParams} from 'react-router-dom'
import {getCards, gradeCardUpdateThunk, setGetRequestParams, TSetRequestParams} from '../f6-cards/cards_reducer'
import {useDispatch, useSelector} from 'react-redux'
import {selectCards, selectPackName} from '../../n2-bll/selectors/cards_selectors'
import Modal from '../../n4-common/components/c9-Modals/Modal'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import SuperRadio from '../../n4-common/components/Elements/e5-SuperRadio/SuperRadio'
import s from './Learn.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'
import {selectIsFetching} from '../../n2-bll/selectors/app_selectors'

const Learn: React.FC = () => {
    const [shownAnswer, setShowAnswer] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [index, setIndex] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [grade, setGrade] = useState(0)

    const packName = useSelector(selectPackName)
    const isFetching = useSelector(selectIsFetching)
    const cards = useSelector(selectCards)

    const dispatch = useDispatch()
    const packIdParam = useParams<{ packId: string }>()

    const setGetRequestParamsCallback = useCallback((requestParams: TSetRequestParams) => {
        dispatch(setGetRequestParams(requestParams))
        dispatch(getCards('100'))
    }, [dispatch])

    useEffect(() => {
        if (packIdParam.packId !== ':packId') setGetRequestParamsCallback({cardsPack_id: packIdParam.packId})
    }, [packIdParam, setGetRequestParamsCallback])

    if (!isOpen) return <Redirect to={PATH.CARD_DECKS}/>

    const randomInteger = (min: number, max: number) => {
        let rand = min + Math.random() * (max + 1 - min);
        let randomNumber = Math.floor(rand);
        if (index === randomNumber) {
            randomInteger(min, max - 1)
        }
        return randomNumber
    }

    let newLearnCards = []

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].grade < 2) {
            newLearnCards.push(cards[i], cards[i], cards[i])
        } else if (cards[i].grade < 4) {
            newLearnCards.push(cards[i], cards[i])
        } else if (cards[i].grade < 5) {
            newLearnCards.push(cards[i])
        }
    }
    let LearnCards = [...cards, ...newLearnCards]
    console.log(LearnCards)
    return (
        <div>
            {isFetching && <Preloader left={'45%'} top={'45%'} size={'100px'}/>}

            <Modal title={`Learn ${packName ? packName : '"no name"'}`} modalBackGround={'pinkFulfilled'}
                   isOpen={isOpen} close={() => null}>
                <div className={s.question}>
                    <span className={s.title}>Question:</span><span
                    className={s.spanQuestion}>{LearnCards.length === 0 ? '' : LearnCards[index].question}</span>
                </div>
                {shownAnswer && <>
                    <div className={s.answer}><span className={s.title}>Answer:</span><span
                        className={s.spanAnswer}>{LearnCards.length === 0 ? '' : LearnCards[index].answer}</span>
                    </div>
                    <div className={s.radio__block}>
                        <h2>Rate yourself:</h2>
                        <SuperRadio
                            options={['Did not know', 'Forgot', 'A lot of trough', 'Confused', 'Knew the answer']}
                            onChange={e => {
                                setGrade(+e.currentTarget.name)
                                setDisabled(false)
                            }}
                        />

                    </div>
                </>}
                <div>
                    <SuperButton onClick={() => setIsOpen(false)} width={"100px"}>
                        Cancel
                    </SuperButton>
                    {!shownAnswer && <SuperButton onClick={() => setShowAnswer(true)} width={"150px"}>
                        Show answer
                    </SuperButton>}
                    {shownAnswer && <SuperButton width={"150px"}
                                                 onClick={() => {
                                                     setIndex(randomInteger(0, LearnCards.length - 1))
                                                     dispatch(gradeCardUpdateThunk(LearnCards[index]._id, grade))
                                                     setShowAnswer(false)
                                                     setDisabled(true)
                                                 }}
                                                 disabled={disabled}>
                        next
                    </SuperButton>}
                </div>
            </Modal>

        </div>
    );
};

export default Learn;
