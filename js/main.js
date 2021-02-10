'use strict'
var gElCanvas;
var gCtx;
var gPos = {
    x: 250,
    y: 100
};
var gMeme = {
    selectedLineIdx: 0,
    lines: []
};

function init() {
    // console.log('gPos:', gPos)
    console.log('hi');
    document.querySelector('main.gallery').classList.remove('hidden');
    document.querySelector('main.edit').classList.add('hidden');
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d');
}

function createMeme(img) {
    toggleView();
    resizeCanvas(img);
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(text) {
    console.log('hi');
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '70px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, gPos.x, gPos.y);
    gCtx.strokeText(text, gPos.x, gPos.y);
}

function addLine() {
    const txt = document.getElementById('txt').value;
    drawText(txt);
    gMeme.lines.push({
        txt: txt,
        fontSize: 70,
        align: 'center',
        color: 'white'
    })
    gPos = {
        x: 250,
        y: 400
    };
}

function resizeCanvas(img) {
    gElCanvas.width = img.naturalHeight;
    gElCanvas.height = img.naturalWidth;
}

function toggleView() {
    document.querySelector('main.gallery').classList.toggle('hidden');
    document.querySelector('main.edit').classList.toggle('hidden');
}
