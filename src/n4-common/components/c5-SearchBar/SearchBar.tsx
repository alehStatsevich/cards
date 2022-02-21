import React, {useState} from 'react'
import s from './SearchBar.module.css'
import SuperInputText from '../Elements/e3-SuperInputText/SuperInputText'

type TSearchBarProps = {
    searchCallback: (searchText: string) => void
    /**
     * param to connect FLUX to redux, if needed.
     */
    searchTextRequest?: string
    placeholder?: string
    disabled?: boolean
}

export const SearchBar: React.FC<TSearchBarProps> = ({
                                                         searchCallback,
                                                         searchTextRequest = '',
                                                         placeholder = 'Search...',
                                                         disabled = false
                                                     }) => {

    const [searchText, setSearchText] = useState(searchTextRequest)

    const onEnterCB = () => {
        if (!disabled) {
            searchCallback(searchText)
        }
    }

    return (
        <div className={s.searchBar}>
            <SuperInputText className={s.searchBarInput}
                            placeholder={placeholder}
                            onChangeText={setSearchText}
                            value={searchText}
                            onEnter={onEnterCB}/>
            <button className={s.searchBarBtn} onClick={() => searchCallback(searchText)} disabled={disabled}/>
        </div>
    )
}