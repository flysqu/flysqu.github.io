import { rainbowCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";
new rainbowCursor({
    length: 12,
    colors: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
    size: 4,
});





// Spawn Gif Code! (12-285)
let highestZIndex = 0

const gifPaths = [
    'gifs/anime-hacking.gif',
    'gifs/anime-waves-hi.gif',
    'gifs/blahaj-spinning.gif',
    'gifs/blahaj-sunset.gif',
    'gifs/bocchi-the-rock-despair.gif',
    'gifs/bocchi-cry.gif',
    'gifs/bocchi-the-rock-many-dance.gif',
    'gifs/bocchi-the-rock-solo-dance.gif',
    'gifs/cat-keyboard.gif',
    'gifs/hatsune-miku-ear-flap.gif',
    'gifs/hatsune-miku.gif',
    'gifs/jdydhda-kaiduo.gif',
    'gifs/kaido-shun-kaido.gif',
    'gifs/kinger-digital-circus.gif',
    'gifs/kitty-soggen.gif',
    'gifs/madeline-celeste.gif',
    'gifs/miku-seseren.gif',
    'gifs/miku.gif',
    'gifs/patapata.gif',
    'gifs/saiki-k-saiki-kuriko.gif',
    'gifs/the-promised-neverland-anime.gif',
    'gifs/venetian-snares-vsnares.gif',
    'gifs/violent-cat.gif',
];

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

// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp) this is based on that
function dragElement(elmnt, draggable, img, highestZIndex) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var lastTime = 0;
    var fpsInterval = 1000 / 5; // 30fps

    if (draggable) {
        draggable.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        highestZIndex += 1
        applyHighestZIndex(elmnt)
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        document.body.style.cursor = "grab";
        img.style.opacity = "0%"
        draggable.style.opacity = "0%"


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

    function closeDragElement() {
        document.body.style.cursor = "default";
        img.style.opacity = "100%"
        draggable.style.opacity = "100%"

        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function spawnGif() {

    // Select a random GIF path
    const randomGifPath = gifPaths[Math.floor(Math.random() * gifPaths.length)];
    //const randomGifPath = "blahaj-spinning.gif"
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


    // Create an img element and set its src to the random GIF path

    const img = new Image();
    img.src = randomGifPath;
    img.alt = "Random GIF";
    img.id = "img"

    if (!document.hidden) {
        img.onload = () => {

            // Calculate random positions within the viewport
            let rw = Math.floor(Math.random() * (vw));
            let rh = Math.floor(Math.random() * (vh));


            // html this creates
            // <div id="window">
            //   <div id="windowControls">
            //      <p id="windowName">GIFNAME<p>
            //      <button id="windowClose">x</button>
            //   </div>
            //   <img id="img">gif</img>
            // </div>

            // set up div
            const window = document.createElement("div");
            window.style.position = "absolute";
            window.style.opacity = "100%";
            window.style.top = `${rh}px`;
            window.style.left = `${rw}px`;
            window.style.display = "flex"
            window.style.flexDirection = "column";
            window.style.zIndex = "0"
            window.id = "window";

            // set up window controls
            const windowControls = document.createElement("div")
            windowControls.id = "windowControls"
            const windowName = document.createElement("p")
            windowName.textContent = `${randomGifPath.replace("gifs/", "")}`
            windowName.id = "windowName"
            const windowClose = document.createElement("button")
            windowClose.id = "windowClose"
            windowClose.textContent = "x"
            windowClose.onclick = function () { window.remove(); }

            windowControls.appendChild(windowName)
            windowControls.appendChild(windowClose)
            window.appendChild(windowControls)

            // Create a div to hold the GIF
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

            var element = document.getElementById('windowControls');
            var positionInfo = element.getBoundingClientRect();
            console.log(positionInfo.width)
            
            img.style.maxWidth = `${windowControls.clientWidth}px`
            window.appendChild(img);
            
            dragElement(window, windowControls, img, highestZIndex);
            let rect = window.getBoundingClientRect();
            if (rect["top"] < 0) {
                window.remove()
                spawnGif()
                return
            }
            else if (rect["bottom"] > vh) {
                window.remove()
                spawnGif()
                return
            }
            else if (rect["right"] > vw) {
                window.remove()
                spawnGif()
                return
            }
            else {
                window.style.opacity = "100%";
            }
            
        };
        //let min = 40
        //let max = 80
        //const minCeiled = Math.ceil(min);
        //const maxFloored = Math.floor(max);
        //const toWait = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The 
        //setTimeout(spawnGif, toWait*1000);
    } else if (document.hidden) {
        //let min = 40
        //let max = 80
        //const minCeiled = Math.ceil(min);
        //const maxFloored = Math.floor(max);
        //const toWait = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
        //console.log(toWait*1000)
        //setTimeout(spawnGif, toWait*1000);
    }

    img.onerror = () => {
        console.error(`Failed to load image: ${randomGifPath}`);
        //let min = 40
        //let max = 80
        //const minCeiled = Math.ceil(min);
        //const maxFloored = Math.floor(max);
        //const toWait = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The 
        //setTimeout(spawnGif, toWait*1000);
    };
}

// Desktop
const desktopIcons = {
    "About Me": {
        "url": "about-me.html",
        "icon": "icons/user.svg"
    },
};


let i = 10
for (let [name, data] of Object.entries(desktopIcons)) {
    console.log(name, data["icon"]);

    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const desktopIcon = document.createElement("div");
    desktopIcon.id = "desktopIcon"
    desktopIcon.style.position = "absolute";
    desktopIcon.style.opacity = "100%";
    desktopIcon.style.top = `${i}px`;
    desktopIcon.style.left = `10px`;
    desktopIcon.style.width = `75px`;
    desktopIcon.style.display = "flex"
    desktopIcon.style.flexDirection = "column";
    desktopIcon.style.justifyContent = "center";
    desktopIcon.style.fontSize = "12px";
    desktopIcon.style.padding = "3px";
    

    const img = new Image();
    img.src = data["icon"];
    img.id = "img"

    const text = document.createElement("p")
    text.textContent = name
    text.style.textAlign = "center"

    //location.href=data["url"]
    if (data["url"]) {
        desktopIcon.onclick=function(){console.log("hi")};
        console.log("Adding href")
    }

    img.onload = function () {
        document.body.appendChild(desktopIcon);
        desktopIcon.appendChild(img)
        desktopIcon.appendChild(text)
    }

    i += 150
}