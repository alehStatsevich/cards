import React, {ChangeEvent} from "react";
import Modal from "../Modal";
import SuperButton from "../../Elements/e1-SuperButton/SuperButton";

type ModalType = {
    open: boolean,
    value: string
    title: string
    close: () => void,
    onClick: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const DeleteModal: React.FC<ModalType> = (
    {open, close, value, onClick, title}
) => {
    return <Modal title={title} isOpen={open} close={close}>
        <div>{value}</div>
        <div>
            <SuperButton width={"100px"}
                         onClick={close}>
                Cancel
            </SuperButton>
            <SuperButton red={true} width={"100px"} onClick={onClick}>
                Delete
            </SuperButton>
        </div>
    </Modal>;
}