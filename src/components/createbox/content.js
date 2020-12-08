import React from 'react'
import { Box } from '../climat/allbox'
import { useDispatch, useSelector } from 'react-redux'
import { CREATE_BOX_UPDATE } from '../../constants/store'

export const Content = ({box, act, index }) => {
    const dispatch = useDispatch()

    const boxs = useSelector(state => state.createbox.boxs)
    const active = boxs[index].active

    const onClick = (val) => {
        dispatch({
            type: CREATE_BOX_UPDATE,    
            add:  box[val],
            box: val,
            boxs: index
        })
    }
    return (
        box.map((val, indexbox) => {
            return (
                <Box
                    key={indexbox}
                    boxsindex={index}
                    box={val}
                    index={indexbox}
                    active={active}
                    setActive={onClick}
                />
            )
        })
    )
}