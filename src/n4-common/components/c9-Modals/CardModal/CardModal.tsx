import React, {ChangeEvent} from "react";
import Modal from "../Modal";
import SuperButton from "../../Elements/e1-SuperButton/SuperButton";
import SuperInputText from "../../Elements/e3-SuperInputText/SuperInputText";

type ModalType = {
    open: boolean,
    close: () => void,
    question: string,
    answer: string
    questionOnchange: (e: ChangeEvent<HTMLInputElement>) => void,
    answerOnchange: (e: ChangeEvent<HTMLInputElement>) => void,
    onClick: () => void
    closeBtn: boolean
}

export const CardModal: React.FC<ModalType> = (
    {open, close, question, answer, questionOnchange, answerOnchange, onClick, closeBtn}
) => {
    return <Modal closeBtn={closeBtn} title={"Card Info"} isOpen={open} close={close}>
        <SuperInputText label={"Question"}
                        autoFocus
                        value={question}
                        onChange={questionOnchange}/>
        <SuperInputText label={"Answer"}
                        value={answer}
                        onChange={answerOnchange}/>
        <div>
            <SuperButton width={"100px"}
                         onClick={close}>
                Cancel
            </SuperButton>
            <SuperButton width={"100px"} onClick={onClick}>
                Save
            </SuperButton>
        </div>
    </Modal>;
}