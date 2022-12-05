import React, { useEffect } from 'react'
import Phaser from 'phaser';
import { config } from '../../game/index'


export default function Game() {

    useEffect(() => {
        const game = new Phaser.Game(config)
    },[])

    return (
        <div>
            {/* <button onClick={()=>{}}></button> */}
        </div>
    )
}
