function toggleColor() {
    var heartIcon = document.getElementById("heartIcon");
    var currentSrc = heartIcon.src;
    
    if (currentSrc.includes("uncolored")) {
      heartIcon.src = "./red_heart_icon.png";
    } else {
      heartIcon.src = "./uncolored_heart_icon.png";
    }
  }