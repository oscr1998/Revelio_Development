export default function controls(cursors, player, velocity ){
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
    if (cursors.space.isDown) {
        player.sprite.x = 500;
        player.sprite.y = 400;
        player.moved = true;
    }
}
