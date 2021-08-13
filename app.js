const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0,0,700,700);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;    

function stopPainting(){
    painting = false;
}

function startPainting (){
    if (filling === false) {
    painting = true;
    }
}; 

function onMouseMove(event){
const x = event.offsetX;
const y = event.offsetY;
if(!painting){   //경로를 만든다
    ctx.beginPath();   //경로생성
    ctx.moveTo(x,y);   //선 시작 좌표
} else{   //그린다
    ctx.lineTo(x,y);   //선 끝 좌표
    ctx.stroke();   //선 그리기
}

}

function handleColorClick(event){
const color = event.target.style.backgroundColor;
ctx.strokeStyle = color;
ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,700,700)
    }
}

function handleContextMenu(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(colorChoose => colorChoose.addEventListener("click", handleColorClick));


if(range){
range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
    }

if(save){
    save.addEventListener("click", handleSaveClick);
    }