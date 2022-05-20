import React, { forwardRef, useState } from 'react'
import classNames from 'classnames'

import images from '~/assets/images'
import styles from './image.module.scss'

function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) {
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
}

export default forwardRef(Image)
