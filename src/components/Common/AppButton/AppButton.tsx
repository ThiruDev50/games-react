import React, { useState } from 'react';
import styles from './AppButton.module.scss';

export const AppButton: React.FC<AppButtonProps> = ({ label, onClick, style }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick();
        setTimeout(() => setIsClicked(false), 200); // Reset the animation after 200ms
    };

    return (
        <div
            className={`${styles.appBtnOuter} ${isClicked ? styles.clicked : ''}`}
            onClick={handleClick}
            style={style}
        >
            {label}
        </div>
    );
};




export const AppButtonWithChild: React.FC<AppButtonWithChildProps> = ({ onClick, style, children }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick();
        setTimeout(() => setIsClicked(false), 200); // Reset the animation after 200ms
    };

    return (
        <div
            className={`${styles.appBtnOuter} ${isClicked ? styles.clicked : ''}`}
            onClick={handleClick}
            style={style}
        >
            {children}
        </div>
    );
};


export interface AppButtonWithChildProps {
    onClick: () => void;
    style?: React.CSSProperties;
    children: React.ReactNode
}


export interface AppButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
}