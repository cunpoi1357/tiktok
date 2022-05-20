import classNames from 'classnames/bind'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    children,
    text,
    primary,
    outline,
    small,
    large,
    rounded,
    disable,
    to,
    href,
    leftIcon,
    rightIcon,
    className,
    onClick,
    ...passProps
}) {
    let Component = 'button'

    const props = {
        onClick,
        className: cx('wrapper', {
            [className]: className,
            text,
            primary,
            outline,
            small,
            large,
            disable,
            rounded
        }),
        ...passProps
    }

    // Remove event listener when button has `disable` class
    if (disable) {
        Object.keys(props).forEach(propKey => {
            if (propKey.startsWith('on') && typeof propKey === 'function') {
                delete props[propKey]
            }
        })
    }

    if (to) {
        Component = Link
        props.to = to
    } else if (href) {
        Component = 'a'
        props.href = href
    }

    return (
        <Component {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}> {children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    )
}

Button.propTypes = {
    children: PropTypes.node,
    text: PropTypes.bool,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    to: PropTypes.string,
    href: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    text: false,
    primary: false,
    outline: false,
    small: false,
    large: false,
    rounded: false,
    disable: false
}

export default Button
