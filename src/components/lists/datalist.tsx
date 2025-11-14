import React, { ReactNode } from 'react'

interface dataListProps<T> {
    items? :T[],
    renderItem: (item:T, index:number) => ReactNode 
}

const DataList = <T,> ({items, renderItem}:dataListProps<T>) => {
    return (
        <div className='flex flex-col flex-1 gap-3 min-w-0'>
            {items?.map((item,index) => (
                <div key={index}>{renderItem(item,index)}</div>
            ))}
        </div>
    )
}

export default DataList
