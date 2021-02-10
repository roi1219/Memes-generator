'use strict'
var gElCanvas;
var gCtx;
var gCurrImg;
var gFontSize = 70;
var gFont = 'Impact';
var gFillColor;
var gStrokeColor;
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
}

function createMeme(img) {
    gCurrImg = img;
    toggleView();
    resizeCanvas(img);
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}
function drawText(text) {
    clearCanvas();
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = gStrokeColor;
    gCtx.fillStyle = gFillColor;
    gCtx.font = gFontSize + 'px ' + gFont;
    gCtx.textAlign = 'center';
    gCtx.fillText(text, gPos.x, gPos.y);
    gCtx.strokeText(text, gPos.x, gPos.y);
    gMeme.lines.push({
        txt: text,
        fontSize: gCtx.font,
        align: gCtx.textAlign,
        fillColor: gCtx.fillStyle,
        strokeColor: gCtx.strokeStyle,
        pos: { x: gPos.x, y: gPos.y }
    });
}

function switchLine() {
    document.getElementById('txt').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 1) ? 0 : 1;
}
function addLine() {
    if (gMeme.lines.length === 2) return;
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
}
function fontMinus() {
    gFontSize -= 10;

}
function alignRight() {
    gPos.x = 450;
}
function alignCenter() {
    gPos.x = 250;

}
function alignLeft() {
    gPos.x = 50;

}
function changeFont(font) {
    gFont = font;
}
function toggleUnderline() {

}
function changeFillColor(color) {
    gFillColor = color;
}
function changeStrokeColor(color) {
    gStrokeColor = color;
}

function canvasClicked(ev) {
}

function resizeCanvas(img) {
    gElCanvas.width = img.naturalHeight;
    gElCanvas.height = img.naturalWidth;
}

function toggleView(value) {
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

// function saveToStorage(key, val) {
//     localStorage.setItem(key, JSON.stringify(val))
// }

// function loadFromStorage(key) {
//     var val = localStorage.getItem(key)
//     return JSON.parse(val)
// }