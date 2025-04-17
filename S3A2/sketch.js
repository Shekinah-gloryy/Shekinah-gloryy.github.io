let hi = 0;
let popupCount = 0;
let starterPopup;

function setup() {
  noCanvas(); 
  frameRate(5);

}

function draw() {
  if (hi === 1 && popupCount < 30) {
    let randomPtr = floor(random(0, 4));
    let popup;
    if (randomPtr === 0) {
      popup = createImg('./assets/download_1.svg', 'Download Icon');
    } else if (randomPtr === 1) {
      popup = createImg("./assets/red_download.jpeg", "Download Icon");
    } else if (randomPtr === 2) {
      popup = createImg("./assets/green_download.png", "Download Icon");
    } else {
      popup = createImg("./assets/chinese_download.png", "Download Icon");
    }
    popup.position(random(0, windowWidth - 300), random(0, windowHeight - 150));
    popup.style('width', random(50, 200) + 'px');
    popup.class('popup');
    popupCount++;
  }

  if (popupCount >= 30) {
    noLoop(); 
  }
}

function download_popup() {
  //create the starter image once
  if (!starterPopup) {
    starterPopup = createImg('./assets/download_1.svg', 'Click Me!');
    starterPopup.position(windowWidth/2 - 100, windowHeight/2 - 100);
    starterPopup.style('width', '200px');
    starterPopup.class('popup');

    // When user clicks it -> start the chaos lol
    starterPopup.mousePressed(() => {
      hi = 1;
      popupCount = 0;
      loop();
      // starterPopup.remove(); 
    });
  }
}
