import {props, propListLarge, propListSmall} from './index'
import { socket, room } from '../pages/Dashboard/index'

export default function controls(cursors, player, velocity, character, isAlive){
    const angledVelocity = Math.sqrt((velocity**2)/2)
    if (cursors.right.isDown) {
        player.sprite.setVelocity(velocity, 0);
        player.moved = true;
    } 
    if (cursors.left.isDown) {
        player.sprite.setVelocity(-velocity, 0);
        player.moved = true;
    } 
    if (cursors.up.isDown) {
        player.sprite.setVelocity(0, -velocity);
        player.moved = true;
    } 
    if (cursors.down.isDown) {
        player.sprite.setVelocity(0, velocity);
        player.moved = true;
    } 

    if (cursors.right.isDown && cursors.up.isDown) {
        player.sprite.setVelocity(angledVelocity, -angledVelocity);
        player.moved = true;
    } 
    if (cursors.right.isDown && cursors.down.isDown) {
        player.sprite.setVelocity(angledVelocity, angledVelocity);
        player.moved = true;
    } 
    if (cursors.left.isDown && cursors.up.isDown) {
        player.sprite.setVelocity(-angledVelocity, -angledVelocity);
        player.moved = true;
    } 
    if (cursors.left.isDown && cursors.down.isDown) {
        player.sprite.setVelocity(-angledVelocity, angledVelocity);
        player.moved = true;
    } 
    if (cursors.up.isUp && cursors.down.isUp && cursors.left.isUp && cursors.right.isUp){
        player.sprite.setVelocity(0, 0);
        player.moved = false;
    }
    if (cursors.space.isDown && character === "hider" && isAlive === true ) {
        console.log("space pressed")
        const randomSize = Math.floor(Math.random()*2)
        const randomId = randomSize ? Math.floor(Math.random()*propListSmall.length) : Math.floor(Math.random()*propListLarge.length)
        socket.emit('changedProp', room, randomSize, randomId)
        
        // if(randomSize === 1){
        //     let randomId = Math.floor(Math.random()*propListLarge.length)

        //     player.sprite.setTexture("natureSheetLarge", propListLarge[randomId]).setScale(2).setSize(32, 32)

        //     console.log("large")
        //     socket.emit('changedProp',room)
        // } else {
        //     let randomId = Math.floor(Math.random()*propListSmall.length)

        //     player.sprite.setTexture("natureSheet", propListSmall[randomId]).setScale(2).setSize(16, 16)

        //     console.log("small", randomId)
        //     socket.emit('changedProp',room)
        // }
        
        console.log("sprite:", player.sprite)
    }
}
