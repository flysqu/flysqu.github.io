import { rainbowCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";
new rainbowCursor({
    length: 12,
    colors: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
    size: 4,
});

const gifPaths = [
    'gifs/anime-hacking.gif',
    'gifs/anime-waves-hi.gif',
    'gifs/blahaj-spinning.gif',
    'gifs/blahaj-sunset.gif',
    'gifs/bocchi-bocchi-the-rock.gif',
    'gifs/bocchi-cry.gif',
    'gifs/bocchi-the-rock-bocchi.gif',
    'gifs/bocchi-the-rock.gif',
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
    'gifs/violent-cat-cat.gif',
];

// credits to w3schools (https://www.w3schools.com/howto/howto_js_draggable.asp)
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Controls")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "Controls").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      document.body.style.cursor = "grab";
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.body.style.cursor = "default";
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function spawnGif() {

    // Select a random GIF path
    //const randomGifPath = gifPaths[Math.floor(Math.random() * gifPaths.length)];
    const randomGifPath = "blahaj-spinning.gif"
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


    // Create an img element and set its src to the random GIF path
    const img = new Image();
    img.src = randomGifPath;
    img.alt = "Random GIF";
    img.id  = "img"

    if (!document.hidden) {
        img.onload = () => {

            // Get image dimensions
            const imgWidth = img.width;
            const imgHeight = img.height;

            // Calculate random positions within the viewport
            let rw = Math.floor(Math.random() * (vw));
            let rh = Math.floor(Math.random() * (vh));

            // Create a div to hold the GIF
            var css = `
              #window {
                display: flex;
                flex-direction: column;
                background-color: grey;
                border-style: solid;
                border-color: grey;
                border-top-style: none;
                border-right-style: solid;
                border-bottom-style: none;
                border-left-style: solid;
              }
              
              #window > div {
                margin-left: 2px;
                margin-right: 2px;
                line-height: 75px;
                
              }
              
              #windowControls {
                width: 100%;
                display: flex;
                align-items: stretch;
                background-color: grey;
                margin-top: 2px;
                margin-bottom: 2px;
                height: 20px;
                text-align: left;
                line-height: 20px;
                font-size: 15px;
              }
              #windowControls p {
                color: black;
                margin-top: 0;
                text-align: left;
                line-height: 20px;
                font-size: 15px;
                margin-right: 1px;
                user-select: none;
              }

              #windowControls button {
                margin-left: auto;
              }
              
              #img {
                font-size: 30px;
                margin-bottom: 2px;
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
            window.id = "window";


            
            // set up window controls
            const windowControls = document.createElement("div")
            windowControls.id = "windowControls"
            const windowName = document.createElement("p")
            windowName.textContent = `${randomGifPath.replace("gifs/","")}`
            windowName.id = "windowName"
            const windowClose = document.createElement("button")
            windowClose.id = "windowClose"
            windowClose.textContent = "x"
            windowClose.onclick = function () { window.remove(); }
            // Make the DIV element draggable:
            

            windowControls.appendChild(windowName)
            windowControls.appendChild(windowClose)

            window.appendChild(windowControls)
            window.appendChild(img);

            // Append the div to the body
            document.body.appendChild(window);
            dragElement(window);
            //let rect = div.getBoundingClientRect();
            //if (rect["top"] < 0) {
            //    div.style.top = "5px"
            //    div.style.opacity = "100%";
            //}
            //else if (rect["bottom"] > vh) {
            //    div.style.top = `${vh - img.height - 20}px`
            //    div.style.opacity = "0%";
            //}
            //else if (rect["right"] > vw) {
            //    div.style.left = `${vw - img.width - 20}px`
            //    console.log("left fixed")
            //    div.style.opacity = "100%";
            //}
            //else {
            //    div.style.opacity = "100%";
            //}

            // Call spawnGif again after 10 seconds

        };
        //setTimeout(spawnGif, 5000);
    } else if (document.hidden) {
        //setTimeout(spawnGif, 5500);
    }

    img.onerror = () => {
        console.error(`Failed to load image: ${randomGifPath}`);
        // Still call spawnGif again after 10 seconds even if the image fails to load
        //setTimeout(spawnGif, 5000);
    };
}

spawnGif();
