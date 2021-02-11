'use strict'
var gElCanvas;
var gCtx;
var gCurrImg;
var gFontSize = 70;
var gFont = 'Impact';
var gFillColor;
var gStrokeColor;
var gTextAlign = 'center';
var gPos = {
    x: 250,
    y: 100
};
var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: []
};

function init() {
    document.querySelector('main.gallery').classList.remove('hidden');
    document.querySelector('main.edit').classList.add('hidden');
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d');
    // var dataURL = localStorage.getItem('canvas001');
    // var img = new Image;
    // img.src = dataURL;
    // img.onload = function () {
    //     resizeCanvas(img);
    //     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // };
}

function createMeme(img) {
    gMeme.selectedImgId = img.id;
    gCurrImg = img;
    toggleView();
    resizeCanvas(img);
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function renderCanvas() {
    clearCanvas();
    gMeme.lines.forEach(line => {
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = gStrokeColor;
        gCtx.fillStyle = gFillColor;
        gCtx.font = gFontSize + 'px ' + gFont;
        gCtx.textAlign = gTextAlign;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    });
    // localStorage.setItem('canvas001', gElCanvas.toDataURL());
}

function drawText(text) {
    gMeme.lines[gMeme.selectedLineIdx] = {
        txt: text,
        fontSize: gCtx.font,
        align: gCtx.textAlign,
        fillColor: gCtx.fillStyle,
        strokeColor: gCtx.strokeStyle,
        pos: { x: gPos.x, y: gPos.y }
    };
    renderCanvas();
}

function switchLine() {
    if (gMeme.lines.length === 2) {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.selectedLineIdx = 1;
            document.getElementById('txt').value = gMeme.lines[gMeme.selectedLineIdx].txt;
            gPos = { x: 250, y: 400 };
        }
        else {
            gMeme.selectedLineIdx = 0;
            document.getElementById('txt').value = gMeme.lines[gMeme.selectedLineIdx].txt;
            gPos = { x: 250, y: 100 };
        }
    }
    else {
        gMeme.selectedLineIdx = 0;
        document.getElementById('txt').value = gMeme.lines[gMeme.selectedLineIdx].txt;
        gPos = { x: 250, y: 100 };
    }
}
function addLine() {
    if (gMeme.lines.length === 2) return;
    gMeme.selectedLineIdx = 1;
    document.getElementById('txt').value = '';
    gPos = {
        x: 250,
        y: 400
    };
}
function deleteLine() {

}
function fontPlus() {
    gFontSize += 10;
    renderCanvas();
}
function fontMinus() {
    gFontSize -= 10;
    renderCanvas();
}
function alignRight() {
    gTextAlign = 'right';
    renderCanvas();
}
function alignCenter() {
    gTextAlign = 'center';
    renderCanvas();
}
function alignLeft() {
    gTextAlign = 'left';
    renderCanvas();
}
function changeFont(font) {
    gFont = font;
    renderCanvas();
}
function toggleUnderline() {

}
function changeFillColor(color) {
    gFillColor = color;
    renderCanvas();
}
function changeStrokeColor(color) {
    gStrokeColor = color;
    renderCanvas();
}

function showTag(span) {
    var tag=span.innerText.toLowerCase();
    span.dataset.font = parseInt(span.dataset.font) + 1;
    span.style.fontSize = span.dataset.font + "px";
    if(tag!=='all'){
        var imgsForDisplay=gImgs.filter(img=>{
            return img.keyWords.includes(tag);
        });
        var imgsHTML=imgsForDisplay.map(img=>{
            return gMemes[img.id];
        })
    }
    else{
        var imgsHTML=gMemes.join('');
    }
    document.querySelector('.imgs.grid').innerHTML=imgsHTML;
}

function canvasClicked(ev) {
}

function resizeCanvas(img) {
    gElCanvas.width = img.naturalHeight;
    gElCanvas.height = img.naturalWidth;
}

function toggleView(value) {
    if (document.body.classList.contains('menu-open')) toggleMenu();
    if (document.querySelector('main.gallery').classList.contains('hidden') && !value) return;
    if (document.querySelector('main.edit').classList.contains('hidden') && value) return;
    document.querySelector('main.gallery').classList.toggle('hidden');
    document.querySelector('main.edit').classList.toggle('hidden');
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'canvas';
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

// function saveToStorage(key, val) {
//     localStorage.setItem(key, JSON.stringify(val))
// }

// function loadFromStorage(key) {
//     var val = localStorage.getItem(key)
//     return JSON.parse(val)
// }