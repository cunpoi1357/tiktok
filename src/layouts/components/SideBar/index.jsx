import React from 'react'
import classNames from 'classnames/bind'
import styles from './SideBar.module.scss'
import Menu, { MenuItem } from './Menu'
import config from '~/config'
import { HomeIcon, HomeIconActive, LiveIcon, LiveIconActive, PeopleIcon, PeopleIconActive } from '~/components/Icons'

const cx = classNames.bind(styles)

function SideBar(props) {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title='For You' to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeIconActive />} />
                <MenuItem
                    title='Following'
                    to={config.routes.following}
                    icon={<PeopleIcon />}
                    activeIcon={<PeopleIconActive />}
                />
                <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveIconActive />} />
            </Menu>
        </aside>
    )
}

export default SideBar
