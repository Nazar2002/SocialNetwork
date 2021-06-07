import React, {useState} from 'react'
import styles from "./Paginator.module.css"
import cn from "classnames"
type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number)=> void
    portionSize?: number
}
let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
            let pages: Array<number> =[];
            for(let i =1;i<pagesCount;i++){
                pages.push(i)
            }
    
    return (
        <div className={styles.paginator}>
            {pages.map((p) => {
                return(
                    <span className={ cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber) }
                        key={p}
                        onClick={(e) => {onPageChanged(p) }}>{p}
                    </span>
                )
            })}
        </div>
    )

}
export default Paginator