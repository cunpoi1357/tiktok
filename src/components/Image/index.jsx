import React, { forwardRef, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import images from '~/assets/images'
import styles from './image.module.scss'

const Image = forwardRef(({ src, alt, className, fallback: customFallback, ...props }, ref) => {
    const [fallback, setFallback] = useState('')

    return (
        <img
            ref={ref}
            src={fallback || src}
            alt={alt}
            className={classNames(styles.wrapper, className)}
            onError={() => setFallback(customFallback)}
            {...props}
        />
    )
})

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    fallback: PropTypes.string
}

Image.defaultProps = {
    fallback: images.noImage
}

export default Image
