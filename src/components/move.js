import axios from "axios";

function move(xActual, yActual, xAnterior, yAnterior){
    let x = xActual - xAnterior;
    let y = yActual - yAnterior;
    var listaMovimientos = [];
    console.log(x,y);
    while (x != 0 || y != 0) {
        if (x > 0) {
            listaMovimientos.push("left");
            x--;
        } else if (x < 0) {
            listaMovimientos.push("right");
            x++;
        } else if (y > 0){
            listaMovimientos.push("down");
            y--;
        } else if (y < 0){
            listaMovimientos.push("up");
            y++;
        }
    }
    
    return listaMovimientos;

}
var movimiento = move(2, 2, 1, 1);
console.log(movimiento);




export {move};