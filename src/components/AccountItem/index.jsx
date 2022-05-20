import React from 'react'
import classNames from 'classnames/bind'

import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1653051600&x-signature=h3ramS8QPBxBELo%2Fu%2FIBgFY0w1g%3D'
                alt='Avatar'
                className={cx('avatar')}
            />
            <div className={cx('info')}>
                <h4 className={cx('username')}>
                    <span>nguyenvana</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('name')}>Nguyen Van A</span>
            </div>
        </div>
    )
}

export default AccountItem
