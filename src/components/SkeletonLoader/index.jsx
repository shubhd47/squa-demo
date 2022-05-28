import React from 'react'
import styles from './skeleton.module.css'
import Skeleton from "@mui/material/Skeleton";

function SkeletonLoader() {
const initialAmountOfLoader = [1, 2, 3, 4, 5];
  return (
    <div className={styles.skeletonContainer}>
      {initialAmountOfLoader.map((loader) => (
        <Skeleton key={loader} width={210} height={160} />
      ))}
    </div>
  )
}

export default SkeletonLoader