import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import HeadLessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import * as searchServices from '~/services/searchService'
import styles from './Search.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import { CircleXIcon, SearchIcon, SpinnerIcon } from '~/components/Icons'
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles)

function Header() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showResults, setShowResults] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([])
            return
        }
        const fetchApi = async () => {
            setLoading(true)

            const result = await searchServices.search(debouncedValue)

            setSearchResults(result)
            setLoading(false)
        }
        fetchApi()
    }, [debouncedValue])

    const handleClear = () => {
        setSearchValue('')
        setSearchResults([])
        inputRef.current.focus()
    }

    const handleChange = e => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) setSearchValue(searchValue)
    }

    return (
        // Using a wrapper <div> tag around the reference element
        // solves this by creating a new parentNode context.
        <div>
            <HeadLessTippy
                interactive
                visible={showResults && searchResults.length > 0}
                onClickOutside={() => setShowResults(false)}
                render={attrs => (
                    <div className={cx('search-results')} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResults.map(result => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        placeholder='Search accounts and videos'
                        value={searchValue}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <CircleXIcon />
                        </button>
                    )}

                    {loading && <SpinnerIcon className={cx('loading')} />}
                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadLessTippy>
        </div>
    )
}

export default Header
