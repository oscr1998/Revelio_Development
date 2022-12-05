import React from 'react'
import { config } from '../../game/index'
import { IonPhaser } from '@ion-phaser/react'

export default function Game() {

    return (
        <div>
            <IonPhaser game={config} initialize={true} var={"12321"}/>
        </div>
    )
}
