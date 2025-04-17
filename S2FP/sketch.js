function setup() {
    // createCanvas(400, 400
    createCanvas(windowWidth, windowHeight); // make the canvas the size of the OG screen 
    angleMode(DEGREES);
  }
  
  function draw() {
    background("#F5F3E5");
    translate(width / 2, height / 2); // Makes visual center the actual center 
    
    
    
      //All the mappings
    let rawseconds = second();
    let rawminutes = minute();
    let rawhours = hour();
    
    let seconds = map(rawseconds, 0, 60, 0, 360);
    let minutes = map(rawminutes, 0, 60, 0, 360);
    let hours = map(rawhours, 0, 24, 0, 720);
    
    
      // Seconds
    push();
      translate(-200, 130); 
    //large circle 
      // noFill();
      fill("#BFEFF5");
      stroke("#BFEFF5");
      ellipse(0, 0, 120, 120);
    //smaller circle
      rotate(seconds);
      fill("#FFFFFF");
      ellipse(0, -53, 15, 15); // tiny circle, using radius 
    pop();
    
    
  // Minutes 
    push();
      translate(-100, -100);
    // large circle 
      fill("#71E0F4");
      stroke("#71E0F4");
      ellipse(0, 0, 220, 220);
    //small circle 
      rotate(minutes);
      fill("#FFFFFF");
      ellipse(0, -100, 20, 20); 
    pop();
    
    
    
  //Hours 
    push();
       translate(120, 110);
    //large circle 
       fill("#1CCDF5");
       stroke("##1CCDF5");
       ellipse(0, 0, 290, 290);
    //small cirlce 
      rotate(hours);
      fill("#FFFFFF");
      ellipse(0, -125, 20, 20); // tiny circle, using radius
    pop();
    
    
   push(); //seconds label
      translate(-210, 120);
      fill("#FFFFFF"); 
      textSize(30);
      textAlign(CENTER,CENTER);
      text(`${rawseconds}`, 10, 10);
    pop();
    
   push(); //minutes label
      translate(-110, -100);
      fill("#FFFFFF"); 
      textSize(80);
      textAlign(CENTER,CENTER);
      text(`${rawminutes}`, 10, 10);
    pop();
    
    
   push(); //hours label
      translate(110, 110);
      fill("#FFFFFF"); 
      textSize(80);
      textAlign(CENTER,CENTER);
      text(`${rawhours}`, 10, 10);
    pop();
    
    
  }
  
  
  
  
  