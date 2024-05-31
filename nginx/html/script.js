import { rainbowCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";
new rainbowCursor({
    length: 12,
    colors: ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"],
    size: 4,
});

const gifPaths = [
    'gifs/kitty-soggen.gif',
    'gifs/kinger-digital-circus.gif',
    'gifs/blahaj-spinning.gif',
    'gifs/madeline-celeste.gif',
    'gifs/miku-seseren.gif',
    'gifs/violent-cat-cat.gif',
    'gifs/hatsune-miku.gif',
    'gifs/miku.gif',
    'gifs/bocchi-the-rock.gif',
    'gifs/bocchi-the-rock-bocchi.gif',
    'gifs/the-promised-neverland-anime.gif',
    'gifs/anime-waves-hi.gif',
    'gifs/bocchi-bocchi-the-rock.gif',
    'gifs/venetian-snares-vsnares.gif',
    'gifs/hatsune-miku-ear-flap.gif',
    'gifs/patapata.gif',
    'gifs/bocchi-cry.gif',
    'gifs/blahaj-sunset.gif',
    'gifs/cat-keyboard.gif',
    'gifs/anime-hacking.gif',
    'gifs/kaido-shun-kaido.gif',
    'gifs/jdydhda-kaiduo.gif',
    'gifs/saiki-k-saiki-kuriko.gif',
];

function spawnGif() {

    // Select a random GIF path
    const randomGifPath = gifPaths[Math.floor(Math.random() * gifPaths.length)];
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


    // Create an img element and set its src to the random GIF path
    const img = new Image();
    img.src = randomGifPath;
    img.alt = "Random GIF";

    if (!document.hidden) {
        img.onload = () => {

            // Get image dimensions
            const imgWidth = img.width;
            const imgHeight = img.height;
    
            // Calculate random positions within the viewport
            let rw = Math.floor(Math.random() * (vw));
            let rh = Math.floor(Math.random() * (vh));
    
            // Create a div to hold the GIF
            var css = 'img:hover { opacity: 30%; cursor: pointer; }';
            var style = document.createElement('style');
    
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
    
            document.getElementsByTagName('head')[0].appendChild(style);
    
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.opacity = "0%";
            div.style.top = `${rh}px`;
            div.style.left = `${rw}px`;
    
            div.onclick = function () { div.remove(); }
            div.appendChild(img);
    
            // Append the div to the body
            document.body.appendChild(div);
            let rect = div.getBoundingClientRect();
            if (rect["top"] < 0) {
                div.style.top = "5px"
                div.style.opacity = "100%";
            }
            else if (rect["bottom"] > vh) {
                div.style.top = `${vh-img.height-20}px`
                div.style.opacity = "0%";
            }
            else if (rect["right"] > vw) {
                div.style.left = `${vw-img.width-20}px`
                console.log("left fixed")
                div.style.opacity = "100%";
            }
            else {
                div.style.opacity = "100%";
            }
    
            // Call spawnGif again after 10 seconds
            
        };
        setTimeout(spawnGif, 5000);
    } else if (document.hidden) {
        setTimeout(spawnGif, 5500);
    }

    img.onerror = () => {
        console.error(`Failed to load image: ${randomGifPath}`);
        // Still call spawnGif again after 10 seconds even if the image fails to load
        setTimeout(spawnGif, 5000);
    };
}

spawnGif();
