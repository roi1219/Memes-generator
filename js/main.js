'use strict'
var gElCanvas;
var gCtx;
var gCurrImg;
var gFontSize = 70;
var gFont = 'Impact';
var gFillColor;
var gStrokeColor;
var gTextAlign = 'center';
var gUnderLine = 'none'
var gPos = {
    x: 250,
    y: 100
};
var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [],
};

function init() {
    document.querySelector('main.gallery').classList.remove('hidden');
    document.querySelector('main.edit').classList.add('hidden');
    document.querySelector('main.my-memes').classList.add('hidden');
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d');
    renderMyMemes();
    addListeners();
}

function renderMyMemes() {
    gMyMemes = Array.from(loadFromStorage('memes'));
    if (gMyMemes) {
        var imgsHTML = gMyMemes.map(url => {
            return `${url}`
        }).join('');
        document.querySelector('.meme-container').innerHTML = imgsHTML;
    }

    // EDIT SAVED MEMES

    // var imgs=Array.from(document.querySelectorAll('.meme-container img'));
    // imgs.forEach(img=>{
    //     img.addEventListener('click',function(){
    //         toggleView(1);
    //         resizeCanvas(img);
    //         gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    //     });
    // })
}

function createMeme(img) {
    gMeme.selectedImgId = img.id;
    gCurrImg = img;
    toggleView(1);
    resizeCanvas(img);
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function renderCanvas() {
    clearCanvas();
    gMeme.lines.forEach(line => {
        // UNDERLINE
        // if (gUnderLine === 'bottom') {
        //     gCtx.textBaseLine = gUnderLine;
        //     gCtx.strokeStyle = 'black';
        //     gCtx.moveTo(5, line.pos.y);
        //     gCtx.lineTo(395, line.pos.y);
        //     gCtx.stroke();
        // }
        gCtx.lineWidth = 3;
        gCtx.strokeStyle = gStrokeColor;
        gCtx.fillStyle = gFillColor;
        gCtx.font = gFontSize + 'px ' + gFont;
        gCtx.textAlign = gTextAlign;
        gCtx.fillText(line.txt, line.pos.x, line.pos.y);
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    });
}

function drawText(text) {
    if (gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx] = {
            txt: text,
            fontSize: gCtx.font,
            align: gCtx.textAlign,
            fillColor: gCtx.fillStyle,
            strokeColor: gCtx.strokeStyle,
            pos: { x: gMeme.lines[gMeme.selectedLineIdx].pos.x, y: gMeme.lines[gMeme.selectedLineIdx].pos.y },
            isDragging: false
        };
    }
    else {
        gMeme.lines[gMeme.selectedLineIdx] = {
            txt: text,
            fontSize: gCtx.font,
            align: gCtx.textAlign,
            fillColor: gCtx.fillStyle,
            strokeColor: gCtx.strokeStyle,
            pos: { x: gPos.x, y: gPos.y },
            isDragging: false
        };

    }
    console.log(gCtx.measureText(text).width);
    renderCanvas();
    // drawRect(gPos.x - gCtx.measureText(text).width / 2, gPos.y - gFontSize,gPos.x+gCtx.measureText(text).width/2,gPos.y);
    drawRect(gPos.x-5 - gCtx.measureText(text).width / 2, gPos.y - gFontSize, gCtx.measureText(text).width+10, gFontSize+10);
}

function switchLine() {
    if (gMeme.lines.length === 2) {
        if (gMeme.selectedLineIdx === 0) {
            gMeme.selectedLineIdx = 1;
            var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
            document.getElementById('txt').value = txt;
            gPos = { x: 250, y: 400 };
            renderCanvas();
            // drawRect(gPos.x - gCtx.measureText(txt).width / 2 - 5, gPos.y - gFontSize, gCtx.measureText(txt).width + 10, gFontSize + 5);
            drawRect(
                gMeme.lines[gMeme.selectedLineIdx].pos.x-gCtx.measureText(txt).width / 2-5,
                gMeme.lines[gMeme.selectedLineIdx].pos.y-gFontSize,
                gCtx.measureText(txt).width+10,
                gFontSize+5);
            // gCtx.beginPath();
            // gCtx.rect
            // renderCanvas();
            // setTimeout(function(){

            // },3000);
        }
        else {
            gMeme.selectedLineIdx = 0;
            var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
            document.getElementById('txt').value = txt
            gPos = { x: 250, y: 100 };
            renderCanvas();
            // drawRect(gPos.x - gCtx.measureText(txt).width / 2 - 5, gPos.y - gFontSize, gCtx.measureText(txt).width + 10, gFontSize + 5);
            drawRect(
                gMeme.lines[gMeme.selectedLineIdx].pos.x-gCtx.measureText(txt).width / 2-5,
                gMeme.lines[gMeme.selectedLineIdx].pos.y-gFontSize,
                gCtx.measureText(txt).width+10,
                gFontSize+5);
        }
    }
    else {
        gMeme.selectedLineIdx = 0;
        var txt = gMeme.lines[gMeme.selectedLineIdx].txt;
        document.getElementById('txt').value = txt;
        gPos = { x: 250, y: 100 };
        renderCanvas();
        // drawRect(gPos.x - gCtx.measureText(txt).width / 2 - 5, gPos.y - gFontSize, gCtx.measureText(txt).width + 10, gFontSize + 5);
        drawRect(
            gMeme.lines[gMeme.selectedLineIdx].pos.x-gCtx.measureText(txt).width / 2-5,
            gMeme.lines[gMeme.selectedLineIdx].pos.y-gFontSize,
            gCtx.measureText(txt).width+10,
            gFontSize+5);
    }
}
function drawRect(xStart, yStart, xEnd, yEnd) {
    gCtx.beginPath()
    gCtx.rect(xStart, yStart, xEnd, yEnd)
    // gCtx.fillStyle = 'orange'
    // gCtx.fill()
    // gCtx.fillRect(x, y, xEnd, yEnd)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}
function addLine() {
    if (gMeme.lines.length === 2) return;
    gMeme.selectedLineIdx = 1;
    document.getElementById('txt').value = '';
    gPos = {
        x: 250,
        y: 400
    };
    drawRect(gPos.x, gPos.y, 100, 50);
}
function deleteLine() {
    document.getElementById('txt').value = '';
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    renderCanvas();
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
    gUnderLine = (gUnderLine === 'bottom') ? 'none' : 'bottom';
    renderCanvas();
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
    var tag = span.innerText.toLowerCase();
    span.dataset.font = parseInt(span.dataset.font) + 3;
    span.style.fontSize = span.dataset.font + "px";
    if (tag !== 'all') {
        var imgsForDisplay = gImgs.filter(img => {
            return img.keyWords.includes(tag);
        });
        var imgsHTML = imgsForDisplay.map(img => {
            return gElImgs[img.id];
        })
    }
    else {
        var imgsHTML = gElImgs.join('');
    }
    document.querySelector('.imgs.grid').innerHTML = imgsHTML;
}

function canvasClicked(ev) {
}

function resizeCanvas(img) {
    console.log('img:', img.naturalWidth)
    console.log('img:', img.naturalHeight)
    if (img.naturalHeight < img.naturalWidth) {
        console.log('bi');
        gElCanvas.height = 200;
        gElCanvas.width = 400;
    }
    else {
        console.log('hi');
        gElCanvas.height = 500;
        gElCanvas.width = 400;
    }
    // gElCanvas.height = (img.naturalHeight > 500) ? 500 : img.naturalHeight;
    // gElCanvas.width = (img.naturalWidth > 400) ? 400 : img.naturalWidth;
}

function toggleView(value) {
    if (document.body.classList.contains('menu-open')) toggleMenu();
    if (value === 0) {
        document.querySelector('main.gallery').classList.remove('hidden');
        document.querySelector('main.edit').classList.add('hidden');
        document.querySelector('main.my-memes').classList.add('hidden');
    }
    if (value === 1) {
        document.querySelector('main.gallery').classList.add('hidden');
        document.querySelector('main.edit').classList.remove('hidden');
        document.querySelector('main.my-memes').classList.add('hidden');
    }
    if (value === 2) {
        document.querySelector('main.gallery').classList.add('hidden');
        document.querySelector('main.edit').classList.add('hidden');
        document.querySelector('main.my-memes').classList.remove('hidden');
    }
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

function saveCanvas() {
    const data = gElCanvas.toDataURL();
    var imgHTML = `<img src="${data}" alt="">`;
    gMyMemes.push(imgHTML);
    saveToStorage('memes', gMyMemes);
    renderMyMemes();
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

function onImgInput(ev) {
    loadImageFromInput(ev, createMeme)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        // gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}

// function renderImg(img) {
//     gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
// }