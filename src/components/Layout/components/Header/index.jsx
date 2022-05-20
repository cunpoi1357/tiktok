import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import Tippy from '@tippyjs/react'
import HeadLessTippy from '@tippyjs/react/headless'
import 'tippy.js/dist/tippy.css'

import styles from './Header.module.scss'
import images from '~/assets/images/'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import {
    CircleXIcon,
    InboxIcon,
    MessageIcon,
    MoreIcon,
    SearchIcon,
    SpinnerIcon,
    UploadIcon,
    LanguageIcon,
    QuestionIcon,
    KeyboardIcon,
    UserIcon,
    SettingsIcon,
    LogOutIcon
} from '~/components/Icons'
import Image from '~/components/Image'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <LanguageIcon />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt'
                }
            ]
        }
    },
    {
        icon: <QuestionIcon />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <KeyboardIcon />,
        title: 'Keyboard shortcuts'
    }
]

function Header() {
    const [searchResults, setSearchResults] = useState([])

    const currentUser = true

    useEffect(() => {
        setSearchResults([])
    }, [])

    const handleMenuChange = item => {
        console.log(item)
    }

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'View Profile',
            to: '/@hoaa'
        },
        // {
        //     icon: <FontAwesomeIcon icon={faCoins} />,
        //     title: 'Get coins',
        //     to: '/coin'
        // },
        {
            icon: <SettingsIcon />,
            title: 'Settings',
            to: '/settings'
        },
        ...MENU_ITEMS,
        {
            icon: <LogOutIcon />,
            title: 'Log out',
            to: '/logout',
            separate: true
        }
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt='Tiktok' className={cx('logo')} />
                <HeadLessTippy
                    interactive
                    visible={searchResults.length > 0}
                    render={attrs => (
                        <div className={cx('search-results')} {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder='Search accounts and videos' />
                        <button className={cx('clear')}>
                            <CircleXIcon />
                        </button>
                        <SpinnerIcon className={cx('loading')} />
                        <button className={cx('search-btn')}>
                            <SearchIcon />
                        </button>
                    </div>
                </HeadLessTippy>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content='Upload video' placement='bottom' theme='tippy'>
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy content='Message' placement='bottom' theme='tippy'>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content='Inbox' placement='bottom' theme='tippy'>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1653051600&x-signature=h3ramS8QPBxBELo%2Fu%2FIBgFY0w1g%3D'
                                alt='Nguyen Van A'
                                fallback='https://yt3.ggpht.com/wgneNTiW753q5G6XMnjyNLAzReR4TVFJryTKTpIqJefrKMyhABPwfnyNWIoT5NNGstFlva1tgw=s68-c-k-c0x00ffffff-no-rj'
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <MoreIcon />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
