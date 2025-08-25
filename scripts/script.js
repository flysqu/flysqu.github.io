let highestZIndex = 0

var els = document.querySelectorAll('[id^="index.css"]');
if (els.length == 0) {
    var gifPaths = [
        '../resources/gifs/anime-hacking.gif',
        '../resources/gifs/anime-waves-hi.gif',
        '../resources/gifs/blahaj-spinning.gif',
        '../resources/gifs/blahaj-sunset.gif',
        '../resources/gifs/bocchi-cry.gif',
        '../resources/gifs/bocchi-despair.gif',
        '../resources/gifs/many-bocchis-dance.gif',
        '../resources/gifs/bocchi-solo-dance.gif',
        '../resources/gifs/cat-keyboard.gif',
        '../resources/gifs/miku-ear-flap.gif',
        '../resources/gifs/hatsune-miku.gif',
        '../resources/gifs/kaido-shun1.gif',
        '../resources/gifs/kaido-shun2.gif',
        '../resources/gifs/kinger.gif',
        '../resources/gifs/kitty-soggen.gif',
        '../resources/gifs/madeline-celeste.gif',
        '../resources/gifs/miku-seseren.gif',
        '../resources/gifs/miku.gif',
        '../resources/gifs/patapata.gif',
        '../resources/gifs/kuriko.gif',
        '../resources/gifs/promised-neverland.gif',
        '../resources/gifs/venetian-snares.gif',
        '../resources/gifs/violent-cat.gif',
    ];
}else {
    var gifPaths = [
        'resources/gifs/anime-hacking.gif',
        'resources/gifs/anime-waves-hi.gif',
        'resources/gifs/blahaj-spinning.gif',
        'resources/gifs/blahaj-sunset.gif',
        'resources/gifs/bocchi-cry.gif',
        'resources/gifs/bocchi-despair.gif',
        'resources/gifs/many-bocchis-dance.gif',
        'resources/gifs/bocchi-solo-dance.gif',
        'resources/gifs/cat-keyboard.gif',
        'resources/gifs/miku-ear-flap.gif',
        'resources/gifs/hatsune-miku.gif',
        'resources/gifs/kaido-shun1.gif',
        'resources/gifs/kaido-shun2.gif',
        'resources/gifs/kinger.gif',
        'resources/gifs/kitty-soggen.gif',
        'resources/gifs/madeline-celeste.gif',
        'resources/gifs/miku-seseren.gif',
        'resources/gifs/miku.gif',
        'resources/gifs/patapata.gif',
        'resources/gifs/kuriko.gif',
        'resources/gifs/promised-neverland.gif',
        'resources/gifs/venetian-snares.gif',
        'resources/gifs/violent-cat.gif',
    ];
}

function applyHighestZIndex(element) {
    let highestZIndex = 0;

    const windowDivs = document.querySelectorAll('div#window');

    windowDivs.forEach(div => {
        const zIndex = window.getComputedStyle(div).zIndex;

        if (!isNaN(zIndex) && zIndex !== 'auto') {
            highestZIndex = Math.max(highestZIndex, parseInt(zIndex, 10));
        }
    });

    element.style.zIndex = highestZIndex + 1;
}


// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp) this is based on that owo
function dragElement(elmnt, draggable, img, highestZIndex) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var lastTime = 0;
    var fpsInterval = 500 / 5; // 30fps
    var activePointerId = null;

    // ensure touch/gesture defaults don't interfere with dragging
    try {
        (elmnt).style.touchAction = 'none';
        if (draggable) document.getElementById("windowControls").style.touchAction = 'none';
        if (img) img.style.touchAction = 'none';

        (elmnt).style.userSelect = 'none';
        (elmnt).style.webkitUserSelect = 'none';
        (elmnt).style.webkitTouchCallout = 'none';
        if (img) {
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.webkitTouchCallout = 'none';
        }
    } catch (e) { /* ignore style set errors */ }

    const target = draggable || elmnt;

    // Use Pointer Events for unified mouse/touch behavior
    target.addEventListener('pointerdown', dragPointerDown, { passive: false });

    function dragPointerDown(e) {
        // only respond to primary button / primary touch
        if (e.isPrimary === false) return;
        e.preventDefault();

        activePointerId = e.pointerId;
        pos3 = e.clientX;
        pos4 = e.clientY;

        applyHighestZIndex(elmnt);

        // capture the pointer so we continue getting pointermove events
        try { target.setPointerCapture(activePointerId); } catch (err) {}

        document.addEventListener('pointermove', elementPointerMove, { passive: false });
        document.addEventListener('pointerup', closePointerDrag);
        document.addEventListener('pointercancel', closePointerDrag);
    }

    function elementPointerMove(e) {
        if (activePointerId !== e.pointerId) return;
        e.preventDefault();

        document.body.style.cursor = "grab";
        if (img) img.style.opacity = "0%";
        if (draggable) document.getElementById("windowControls").style.opacity = "0%";
        elmnt.style.borderTopWidth = "3px";

        var currentTime = new Date().getTime();
        if (currentTime - lastTime >= fpsInterval) {
            lastTime = currentTime;

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closePointerDrag(e) {
        if (activePointerId !== null && e.pointerId !== activePointerId && e.type !== 'pointercancel') {
            // ignore other pointers
            return;
        }

        // ensure window is at pointer location when stopping drag
        try {
            pos1 = pos3 - (e.clientX || pos3);
            pos2 = pos4 - (e.clientY || pos4);
            pos3 = e.clientX || pos3;
            pos4 = e.clientY || pos4;

            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        } catch (err) { /* ignore if no client coords */ }

        document.body.style.cursor = "default";
        if (img) img.style.opacity = "100%";
        if (draggable) document.getElementById("windowControls").style.opacity = "100%";
        elmnt.style.borderTopWidth = "0px";

        if (activePointerId !== null) {
            try { target.releasePointerCapture(activePointerId); } catch (err) {}
        }
        activePointerId = null;

        document.removeEventListener('pointermove', elementPointerMove);
        document.removeEventListener('pointerup', closePointerDrag);
        document.removeEventListener('pointercancel', closePointerDrag);
    }
}

export function spawnGif(path = "undefined", size = 400) {
    if (path == "undefined") {
        const randomGifPath = gifPaths[Math.floor(Math.random() * gifPaths.length)];
        path = randomGifPath
    } else {
        const existingImages = document.querySelectorAll('img');
        for (const existingImg of existingImages) {
            //console.log(existingImg.src)
            if (existingImg.src.includes(path.replace("..",""))) {
                return;
            }
        }
    }

    const randomGifPath = path
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    // Create an img element and set its src to the random GIF path

    const img = new Image();
    img.src = randomGifPath;
    img.alt = path;
    img.id = "img"
    img.style.width = `${size}px`
    img.style.display = "block"

    img.onload = () => {
            // Calculate random positions within the viewport uwu
            let rw = Math.floor(Math.random() * (vw));
            let rh = Math.floor(Math.random() * (vh));

            // SOLVE ISSUE THE ISSUE OF THE
            // Get size of image

            let iwrw = size + rw
            //let ihrh = ih + rh
            // Check if imgSizeX + rw is more then vw
            if (iwrw > vw) {
                spawnGif(path)
                //console.log("Fixed Out Of Bounds")
                //console.log(`${iwrw}, ${rw}, ${rh}`)
                return
            }

            // html this creates
            // <div id="window">
            //   <div id="windowControls">
            //      <p id="windowName">GIFNAME<p>
            //      <button id="windowClose">x</button>
            //   </div>
            //   <img id="img">gif</img>
            // </div>

            // set up div owo
            const window = document.createElement("div");
            window.style.position = "absolute";
            window.style.opacity = "100%";
            window.style.top = `${rh}px`;
            window.style.left = `${rw}px`;
            window.style.display = "flex"
            window.style.flexDirection = "column";
            window.style.zIndex = "0"
            window.id = "window";

            // set up window controls uwu
            const windowControls = document.createElement("div")
            windowControls.id = "windowControls"

            // prevent touch default behaviors (long-press menus, gestures)
            windowControls.style.touchAction = 'none';
            windowControls.style.userSelect = 'none';
            windowControls.style.webkitTouchCallout = 'none';

            const windowName = document.createElement("p")
            windowName.textContent = `${randomGifPath.replace("resources/gifs/", "").replace("resources/pictures/","").replace("../","").replace(" (Medium)","").replace("JPG","jpg")}`
            windowName.id = "windowName"
            windowName.style.flexGrow = "1"
            const windowClose = document.createElement("button")
            windowClose.id = "windowClose"
            windowClose.textContent = "x"
            windowClose.onclick = function () { window.remove(); }
            
            // also make the image not trigger long-press menus
            img.style.touchAction = 'none';
            img.style.userSelect = 'none';
            img.style.webkitTouchCallout = 'none';

            const windowMinimize = document.createElement("button")
            windowMinimize.id = "windowMinimize"
            windowMinimize.textContent = "-"
            windowMinimize.onclick = function () {
                const imgVisibility = img.style.display
                if (imgVisibility == "block") {
                    img.style.display = "none";
                    windowMinimize.textContent = "+"
                    window.style.opacity="0.5"

                } else if (imgVisibility == "none"){
                    img.style.display = "block"; 
                    windowMinimize.textContent = "-"
                    window.style.opacity="1"
                }
            }

            windowControls.appendChild(windowName)
            windowControls.appendChild(windowMinimize)
            windowControls.appendChild(windowClose)
            window.appendChild(windowControls)

            // Create a div to hold the GIF owo
            var css = `
                        #window {
                          display: flex;
                          flex-direction: column;
                          border-style: solid;
                          border-color: rgb(241, 160, 231);
                          border-top-style: solid;
                          border-right-style: solid;
                          border-bottom-style: solid;
                          border-left-style: solid;
                          opacity: 0;
                          border-top-width: 0px;
                          border-right-width: 3px;
                        }
                        
                        #windowControls {
                          display: flex;
                          align-items: stretch;
                          background-color: rgb(241, 160, 231);
                          padding-bottom: 2px;
                          height: 20px;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                        }
                        #windowControls p {
                          color: #5C3357;
                          height: fit-content;
                          margin-top: 0;
                          text-align: left;
                          line-height: 20px;
                          font-size: 15px;
                          margin-right: 1px;
                          user-select: none;
                        }
          
                        #windowControls button {
                          margin-left: auto;
                          background-color: rgb(241, 160, 231);
                          color: #5C3357;
                          box-shadow: none;
                          border: none;
                        }
                        
                        #img {
                          font-size: 30px;
                          text-align: center;
                          background-color: red;
                          min-width
                        }
                      `;
            var style = document.createElement('style');

            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(style);

            document.body.appendChild(window);

            let maxWidthA = size
            img.style.maxWidth = `${maxWidthA}px`
            window.appendChild(img);
            
            dragElement(window, windowName, img, highestZIndex);
    };


    img.onerror = () => {
        console.error(`Failed to load image: ${randomGifPath}`);
    };
    
}

spawnGif("undefined", 200)

document.querySelectorAll(".openImage").forEach(element => {
    element.addEventListener("click", function () {
      const imageName = this.getAttribute("data-image");
      const imagePath = `../resources/pictures/${imageName}`;
      spawnGif(imagePath, 350);
    });
  });