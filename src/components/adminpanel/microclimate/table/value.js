import React from 'react'
import { Tag } from 'antd';

export const ValueTag = ({int}) => {

    let tag = ''

    if(Number(int) === 0) {
        tag = <Tag color="volcano" >Выкл</Tag>
    }

    if(Number(int) === 100) {
        tag = <Tag color="green" >Вкл</Tag>
    }

    return (
        <>
        {tag}
        </>
    )
}