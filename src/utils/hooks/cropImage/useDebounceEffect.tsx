import { useEffect, DependencyList, useRef } from 'react';

export function useDebounceEffect(fn: () => void, waitTime: number, deps: DependencyList = []) {
    const savedFn = useRef(fn);

    useEffect(() => {
        savedFn.current = fn;
    }, [fn]);

    useEffect(() => {
        const t = setTimeout(() => {
            savedFn.current();
        }, waitTime);

        return () => {
            clearTimeout(t);
        };
    }, [waitTime, ...deps]);
}
