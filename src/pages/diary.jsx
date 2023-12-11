import React from 'react';
import { PrimButton, TextButton, IconButton } from 'styles/components/button'
import 'styles/components/button.scss'

export default function Diary() {
    return(
        <>
            <div className="">다이어리</div>
            <div className="">
                <PrimButton title='test L' size='L' iconPosition='left' icon='Plus' type='primary' />
                <PrimButton title='test M' size='M' iconPosition='right' icon='Follower' type='secondary' />
                <PrimButton title='test S' size='S' iconPosition='left' icon='Plus' type='glass' />
                <PrimButton href={`/`} size='M' title='test경로가있음 M' iconPosition='left' icon='Plus' type='primary' />
                <p>ㅋㅋ</p>
                <TextButton title='test L' size='L' iconPosition='left' icon='Plus' type='primary' />
                <TextButton title='test M' size='M' iconPosition='right' icon='Follower' type='secondary' />
                <TextButton title='test S' size='S' iconPosition='left' icon='Plus' type='glass' />
                <TextButton title='test XS' size='XS' iconPosition='left' icon='Plus' type='glass' />
                <TextButton href={`/`} title='test경로가있음' iconPosition='left' icon='Plus' type='primary' />
                <p>zz</p>
                {/* <IconButton iconName='Plus' type='primary' size='L' />
                <IconButton iconName='Follower' type='secondary' size='M' />
                <IconButton iconName='Plus' type='glass' size='S' />
                <IconButton href={`/`} icon='Plus' type='primary' size='L'/> */}
            </div>
        </>
    );
}