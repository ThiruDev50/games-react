import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface TimerHandle {
    start: () => void;
    pause: () => void;
    continueTimer: () => void;
    reset: () => void;
}

const Timer = forwardRef<TimerHandle>((_, ref) => {
    const [milliseconds, setMilliseconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Start the timer
    const start = () => {
        if (!isActive) {
            setIsActive(true);
            timerRef.current = setInterval(() => {
                setMilliseconds(prev => {
                    const newMilliseconds = prev + 10;
                    if (newMilliseconds >= 86399000) { // 23:59:59 in milliseconds
                        clearInterval(timerRef.current!);
                        return 86399000; // Cap to max time
                    }
                    return newMilliseconds;
                });
            }, 10);
        }
    };

    // Pause the timer
    const pause = () => {
        setIsActive(false);
        clearInterval(timerRef.current!);
    };

    // Continue the timer
    const continueTimer = () => {
        if (!isActive) {
            start();
        }
    };

    // Reset the timer
    const reset = () => {
        clearInterval(timerRef.current!);
        setMilliseconds(0);
        setIsActive(false);
    };

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
        start,
        pause,
        continueTimer,
        reset
    }));

    const formatTime = (ms: number) => {
        let hours = Math.floor(ms / 3600000);
        let minutes = Math.floor((ms % 3600000) / 60000);
        let seconds = Math.floor((ms % 60000) / 1000);
        let milli = Math.floor((ms % 1000) / 10);

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milli).padStart(2, '0')}`;
        }
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current!); // Cleanup on unmount
    }, []);

    return (
        <div >
            {formatTime(milliseconds)}
        </div>
    );
});

export default Timer;
