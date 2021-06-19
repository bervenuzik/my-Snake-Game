

window.addEventListener("keydown", (e) => {
    e.preventDefault();
  
    switch (e.code) {
      case "ArrowUp":
          if(movingDirection.y ==0){
        movingDirection = { x: 0, y: -1 };
          }
        break;
      case "ArrowDown":
          if(movingDirection.y ==0){
        movingDirection = { x: 0, y: 1 };
        
          }
        break;
      case "ArrowRight":
          if(movingDirection.x ==0){
        movingDirection = { x: 1, y: 0 };
        
          }
        break;
      case "ArrowLeft":
          if(movingDirection.x ==0){
        movingDirection = { x: -1, y: 0 };
        
          }
        break;
    }
  });


