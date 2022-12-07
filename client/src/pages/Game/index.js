import React from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'
import { Bounce } from 'react-reveal'
import './style.css'

export default function Game() {

    return (
        
        <div id='gameContainer'>
           <Bounce top> <IonPhaser game={config} initialize={true}/> </Bounce>
        </div>
       
    )
}
