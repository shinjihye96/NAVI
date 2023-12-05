import React from 'react';
import { PrimButton } from 'styles/components/button'
import Icon from 'styles/components/icon';
import 'styles/components/button.scss'

export default function Diary() {
    return(
        <>
            <div className="">다이어리</div>
            <div className="">
                <Icon name='ArrowLeft' className='1'/>
                <PrimButton title='test' iconPosition='left' icon='Plus' type='primary'/>
            </div>
        </>
    );
}