document.getElementById("MainTitle").innerText = "Point and Click adventure";

//game window reference
const gamewindow = document.getElementById("gameWindow");

//game State
gamestate = {
    "door2Locked": true,
}

//main character reference
const mainCharacter = document.getElementById("mainCharacter")
const offsetCharacter = 16;

//foreground items
const door1 = document.getElementById("door1")
const door2 = document.getElementById("door2")
const key1 = document.getElementById("key1")

//inventory
const inventoryBox = document.getElementById("inventoryBox"); //div
const inventoryList = document.getElementById("inventoryList"); //ul

gamewindow.onclick = function (e) {
    var rect = gamewindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    console.log(e.target.id);
    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch (e.target.id) {

        case "door1":
            mainCharacter.style.backgroundColor = "#964B00"
            door1.style.opacity = 0.5;
            if (document.getElementById("key1") !== null) {
                document.getElementById("key1").remove();
                console.log("keyfound");
                const keyElement = document.createElement("li");
                keyElement.id = "Inv-key";
                keyElement.innerText = "Key";
                inventoryList.appendChild(keyElement);
            }

            break
        case "door2":
            if (gamestate.door2Locked == true) {
                if (document.getElementById("Inv-key") !== null) {
                    gamestate.door2Locked = false;
                    console.log("Door Unlocked!")
                } else {
                    alert("door is locked");
                }
            } else {
                console.log("Enter building");
            }

        default:
            mainCharacter.style.backgroundColor = "#ff0000"
            door1.style.opacity = 1;
            break;

    }

}