const MAX_HEALTH = 10;
let health = MAX_HEALTH;

function reset() {
    health = MAX_HEALTH;
    light.stopAllAnimations();
    displayHealth();
}

function takeHit() {
    if (health <= 0) {
        music.playSound(music.sounds(Sounds.Wawawawaa));
        light.showAnimation(light.rainbowAnimation, 4000);
        light.setAll(Colors.Black);
    } else {
        // Quick red flash
        light.setAll(Colors.Red);
        health--;
        displayHealth();
        music.playSoundUntilDone(music.sounds(Sounds.MagicWand));
    }
}

function displayHealth() {
    light.setAll(Colors.Black);
    for (let i = 0; i < health; i++) {
        light.setPixelColor(i, Colors.Blue);
    }
}

// Wire Events
input.buttonA.onEvent(ButtonEvent.Click, takeHit);
input.buttonB.onEvent(ButtonEvent.Click, reset);

// Unfortunately all IR is throwing infrared errors...
// TODO: debounce this so only one hit happens
network.onInfraredError(takeHit);

// Set the stage
reset();
