import React from 'react'
import { Button, notification } from 'antd'
import { useSelector } from 'react-redux'


export const AddButton = () => {
    const createbox = useSelector(state => state.createbox)

    const onSubmit = () => {
        if(createbox.activeplant ===  false ) {
            const args = {
                description:
                  <p style={{fontSize: '20px'}}>Выберите растение</p>,
                duration: 0,
              };
              notification.open(args);

        }
        console.log(createbox)
    } 

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 30,
            marginBottom: 30,
            paddingRight: '10%'
        }}>
            <Button onClick={() => onSubmit()} >Добавить</Button>
        </div>
    )
}