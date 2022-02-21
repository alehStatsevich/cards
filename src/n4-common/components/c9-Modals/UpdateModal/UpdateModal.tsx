import React, {ChangeEvent} from "react";
import Modal from "../Modal";
import SuperButton from "../../Elements/e1-SuperButton/SuperButton";
import SuperInputText from "../../Elements/e3-SuperInputText/SuperInputText";

type ModalType = {
    open: boolean,
    value: string
    title: string
    close: () => void,
    onClick: () => void
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const UpdateModal: React.FC<ModalType> = (
    {open, close, value, onClick, onChange,title}
) => {
    return <Modal closeBtn={true} title={title} isOpen={open} close={close}>

        <SuperInputText label={"Name of pack"}
                        value={value}
                        onChange={onChange}/>
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
