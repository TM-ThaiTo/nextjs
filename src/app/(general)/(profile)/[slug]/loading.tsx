import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => {
    return (
        <div style={{ padding: '1rem' }}>
            <Skeleton height={30} style={{ marginBottom: '10px' }} />
            {/* <Skeleton height={20} count={3} /> */}
        </div>
    );
};

export default SkeletonLoader;
