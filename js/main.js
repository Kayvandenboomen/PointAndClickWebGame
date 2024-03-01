document.getElementById("mainTitle").innerText = "Point and Click adventure game";

if (typeof (Storage) !== "undefined") {

} else {
    alert("Web storage not supported!")
}
//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Game state
let gameState = {
    "door2locked": true,
    "inventory": [
    ]
}

const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("mainCharacter");
const offsetCharacter = 16;

//speech bubbles
const mainCharacterSpeech = document.getElementById("mainCharacterSpeech");
const counterSpeech = document.getElementById("counterSpeech");
const counterAvatarImg = document.getElementById("counterAvatarImg");
const mcAudio = document.getElementById("mcAudio");
const cAudio = document.getElementById("cAudio");
//Inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

//Foreground Items
const door1 = document.getElementById("door1");
const sign = document.getElementById("sign");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (e.target.id !== "mcImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    console.log(e.target.id);
    switch (e.target.id) {

        case "door1":
            sign.style.opacity = 1;
            if (document.getElementById("key1") !== null) {
                console.log('Found key!');
                document.getElementById("key1").remove();
                changeInventory('key', 'add');
                showMessage(mainCharacterSpeech, mcAudio, "Hey I found a key!")
            }

            break;
        case "door2":
            if (gameState.door2locked == true) {
                // check if we have key
                if (document.getElementById("inv-key") !== null) {
                    //yes -> unlock door?
                    gameState.door2locked = false;
                    changeInventory('key', 'delete');
                    showMessage(mainCharacterSpeech, mcAudio, "Oh hey the door unlocked");
                    setTimeout(function () { mainCharacterAvatar.style.opacity = 1; }, 4 * sec);
                    setTimeout(showMessage, 4 * sec, mainCharacterSpeech, mcAudio, "There's a map here leading to a treasure!");
                    changeInventory('map', 'add');
                    onsole.log('Door unlocked!');

                } else {
                    //no -> alert 'door locked'
                    alert("Door is locked!");
                }
            } else {
                console.log('enter building');
            }

            break;

        case "sign":
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 0 * sec);
            showMessage(counterSpeech, cAudio, "Welcome to Ulvengard, Population 45");
            sign.style.opacity = 0.5;

            break;

        case "Questboard":
            showMessage(mainCharacterSpeech, mcAudio, "Let's read what's on the quest board...");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, cAudio, "There is a man missing in Ulvengard.");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 8 * sec);
            setTimeout(showMessage, 8 * sec, mainCharacterSpeech, mcAudio, "Ooooh interesting");
            setTimeout(function () { counterAvatarImg.style.opacity = 1; }, 12 * sec);
            setTimeout(showMessage, 12 * sec, counterSpeech, cAudio, "He was last seen in the north part of Ulvengard");
            setTimeout(function () { counterAvatarImg.style.opacity = 0; }, 16 * sec);
            break;

        default:
            //explode


            sign.style.opacity = 1;
            break;

    }

}

/**
 * function to change inventory
 * @param {string} itemName 
 * @param {string} action "add", "delete"
 * @returns 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.log('wrong parameters given to changeInventory()');
        return
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break
        case 'delete':
            gameState.inventory.find(function (item, index) {
                if (item == itemName) {
                    var index = gameState.inventory.indexOf(item);
                    if (index !== -1) {
                        gameState.inventory.splice(index, 1);
                    }
                }
            })
            break

        default:
            break;
    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * update inventoryList
 * @param {Array} inventory array of items 
 * @param {HTMLElement} inventoryList html <ul> element 
 */
function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = "inv-" + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * Shows a message in a speech bubble
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 * @param {string} message 
 */
function showMessage(targetBalloon, targetSound, message) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBalloon.style.opacity = "1";
    targetBalloon.innerText = message;
    setTimeout(hideMessage, 4 * sec, targetBalloon, targetSound);
}

/**
 * Set the opacity to 0
 * @param {getElementById} targetBalloon 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBalloon, targetSound) {
    targetSound.pause();
    targetBalloon.style.opacity = "0";
}