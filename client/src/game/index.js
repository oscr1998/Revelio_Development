import Phaser from 'phaser';

// import { useSelector, useDispatch } from "react-redux";
// const socket = useSelector(state => state.socket.socket)

import { socket } from '../pages/Dashboard/index'

const players = {
    // id1: { id: "", username: "", character: "", sprite: "", moved: false },
    // id2: { id: "", username: "", character: "", sprite: "", moved: false },
}


const gameState = {
    // socketID: "",
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


        socket.on('updating', playersID => {
            Object.keys(playersID).forEach(id => {
                players[id] = playersID[id]
            })
        })
        socket.emit("in-game")

        gameState.socketID = socket.id

    }

    create(){

        const listOfPlayers = Object.keys(players) //["id1", "id2"]

        listOfPlayers.forEach(id => {
            if(players[id].character === "seeker" ){
                players[id] = { ...players[id], sprite: this.physics.add.sprite(500, 450, 'bug') }
            } else {
                players[id] = { ...players[id], sprite: this.physics.add.sprite(500, 450, 'codey') }
            }
        })


        // Initialsed Controls
        gameState.cursors = this.input.keyboard.createCursorKeys();

        // Debugging
        this.debug("create")
    }

    update(time, delta){
        // Controls
        if (gameState.cursors.right.isDown) {
            players[gameState.socketID].sprite.setVelocity(350, 0);
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.left.isDown) {
            players[gameState.socketID].sprite.setVelocity(-350, 0);
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.up.isDown) {
            players[gameState.socketID].sprite.setVelocity(0, -350);
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.down.isDown) {
            players[gameState.socketID].sprite.setVelocity(0, 350);
            players[gameState.socketID].moved = true;
        } 

        if (gameState.cursors.right.isDown && gameState.cursors.up.isDown) {
            players[gameState.socketID].sprite.setVelocity(Math.sqrt((350**2)/2), -Math.sqrt((350**2)/2));
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.right.isDown && gameState.cursors.down.isDown) {
            players[gameState.socketID].sprite.setVelocity(Math.sqrt((350**2)/2), Math.sqrt((350**2)/2));
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.left.isDown && gameState.cursors.up.isDown) {
            players[gameState.socketID].sprite.setVelocity(-Math.sqrt((350**2)/2), -Math.sqrt((350**2)/2));
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.left.isDown && gameState.cursors.down.isDown) {
            players[gameState.socketID].sprite.setVelocity(-Math.sqrt((350**2)/2), Math.sqrt((350**2)/2));
            players[gameState.socketID].moved = true;
        } 
        if (gameState.cursors.up.isUp && gameState.cursors.down.isUp && gameState.cursors.left.isUp && gameState.cursors.right.isUp){
            players[gameState.socketID].sprite.setVelocity(0, 0);
            players[gameState.socketID].moved = false;
        }
        if (gameState.cursors.space.isDown) {
            players[gameState.socketID].sprite.x = 500;
            players[gameState.socketID].sprite.y = 400;
            players[gameState.socketID].moved = true;
        }

        if (players[gameState.socketID].moved){
            socket.emit('moved', players[gameState.socketID].sprite)
            // console.log(player.sprite.body.speed);
        }

        this.debug("update", delta, players[gameState.socketID].sprite.body.speed)
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
        gravity: { y: 0 },
        enableBody: true,
        }
    },
    scene: [GameScene]
}
