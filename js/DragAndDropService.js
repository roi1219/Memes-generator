const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
var gStartPos;
var gClickedLineIdx;

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    document.body.style.cursor = 'grab'
    const pos = getEvPos(ev)
    var textPos=isTextClicked(pos);
    if (!textPos) return
    gClickedLineIdx=gMeme.lines.findIndex(line=>{
        if(line.pos.x===textPos.x&&line.pos.y===textPos.y) return line;
    })
    gMeme.lines[gClickedLineIdx].isDragging=true;
    gStartPos = pos
}

function onMove(ev) {
    if(gMeme.lines[gClickedLineIdx]){
        if (gMeme.lines[gClickedLineIdx].isDragging) {
            const pos = getEvPos(ev);
            const dx = pos.x - gStartPos.x;
            const dy = pos.y - gStartPos.y;
            
            gMeme.lines[gClickedLineIdx].pos.x += dx;
            gMeme.lines[gClickedLineIdx].pos.y += dy;
            
            gStartPos = pos;
            renderCanvas();
        }
    }
}

function onUp() {
    gMeme.lines[gClickedLineIdx].isDragging = false;
    document.body.style.cursor = 'grabbing';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isTextClicked(clickedPos) {
    const positions = gMeme.lines.map(line => {
        return line.pos;
    })
    var pos = positions.find(pos => {
        return (pos.y > clickedPos.y && (pos.y - gFontSize < clickedPos.y));
    });
    return pos;
}