document.getElementById("MainTitle").innerText = "Point and Click adventure";

//game window reference
const gamewindow = document.getElementById("gameWindow");

//main character reference
const mainCharacter = document.getElementById("mainCharacter")
const offsetCharacter = 16;

//foreground items
const door1 = document.getElementById("door1")

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
            break

        default:
            mainCharacter.style.backgroundColor = "#ff0000"
            door1.style.opacity = 1;
            break;

    }

}