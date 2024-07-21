import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton, { Props as RawButtonProps } from '../RawButton';

import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

const buttonVariantToStyleMap: Record<ButtonVariant, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
}

interface Props<NAME> extends RawButtonProps<NAME> {
    className?: string;
    variant?: ButtonVariant;
}

function Button<NAME>(props: Props<NAME>) {
    const {
        className,
        variant = 'primary',
        ...otherProps
    } = props;

    return (
        <RawButton
            className={_cs(
                styles.button,
                buttonVariantToStyleMap[variant],
                className,
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default Button;