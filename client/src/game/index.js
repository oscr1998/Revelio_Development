import Phaser from 'phaser';

// import { useSelector, useDispatch } from "react-redux";
// const socket = useSelector(state => state.socket.socket)

import { socket, room } from '../pages/Dashboard/index'
import { default as controls } from './controls';

const players = {
    // id1: { id: "", username: "", character: "", sprite: "", moved: false },
    // id2: { id: "", username: "", character: "", sprite: "", moved: false },
}

let seeker = [];
let hider = [];

const gameState = {
    cursors: "",
}

class GameScene extends Phaser.Scene {
    constructor(){
        super('GameScene')
    }

    preload(){
        // Assets
        this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
        this.load.image('bug', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');

        console.log("preload: ", players);

        socket.on('update-client', players_server => {

            Object.keys(players_server).forEach(id => {

                // If sprite is not created locally
                if(!players[id]){
                    console.log("init");
                    // copy the list
                    players[id] = players_server[id]
                } else if (id !== socket.id){
                    console.log("moving");
                    // update player coords
                    players[id].sprite.x = players_server[id].x
                    players[id].sprite.y = players_server[id].y
                } else if (id !== socket.id){
                    // update whatever you want
                }
            })
        })
        socket.emit("in-game", room)
    }

    create(){

        const listOfPlayers = Object.keys(players) //["id1", "id2"]

        listOfPlayers.forEach(id => {
            if(players[id].character === "seeker" ){
                players[id] = { ...players[id], sprite: this.physics.add.sprite(players[id].x, players[id].y, 'bug') }
            } else {
                players[id] = { ...players[id], sprite: this.physics.add.sprite(players[id].x, players[id].y, 'codey') }
            }
            players[id].sprite.setCollideWorldBounds(true);
            players[id].sprite.body.immovable = true
        })

        // listOfPlayers.forEach(id => {
        //     if(players[id].character === "seeker" ){
        //         seeker = players[id]
        //     } else {
        //         hider.push(players[id])
        //     }
        // })
        const listOfHiders = Object.values(players).filter(p => p.character !== "seeker")
        const listOfSeekers= Object.values(players).filter(p => p.character !== "hider")
        console.log("listOfHiders", listOfHiders)
        console.log("listOfSeekers", listOfSeekers)
        listOfHiders.forEach(id => {
            this.physics.add.collider(listOfSeekers[0].sprite, id.sprite, function(){
                console.log("Collision detected")
                // id.sprite.destroy()
            })
        })

        
        console.log("hider", hider)
        console.log("seeker", seeker)

        // Initialsed Controls
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Debugging
        this.debug("create")
    }

    update(time, delta){
        // Controls
        controls(gameState.cursors, players[socket.id], 350)

        if (players[socket.id].moved){
            socket.emit('moved', {
                x: players[socket.id].sprite.x,
                y: players[socket.id].sprite.y 
            }, room)
        }


        // console.log("character", players[socket.id].character)

        // if( players[socket.id].character === "seeker"){
            
        // }
        

        this.debug("update", delta, players[socket.id].sprite.body.speed)
    }

    debug(mode, delta = 0.1, velocity=0){
        switch(mode){
            case "create":
                this.FPS = this.add.text(0, 0, "FPS", { fontSize: '15px' })
                this.speed = this.add.text(0, 20, "speed", { fontSize: '15px' })
                break;
            case "update":
                this.FPS.setText(`FPS: ${Math.floor(1000/delta)}`)
                this.speed.setText(`${velocity}`)
                break;
        }
    }

}

export const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    backgroundColor: "131313",
    physics: {
        default: 'arcade',
        arcade: {
        gravity: {},
        enableBody: true,
        debug : true
        }
    },
    scene: [GameScene]
}
