//window.alert("all's ok");
const canvas = document.getElementById('Canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
};

const createCanvas = function(width, height) {
    canvas.width = width;
    canvas.height = height;
};

const colors = ["", "#004358", "#1F8A70", "#BEDB39", "#FFE11A", "#FD7400"];
        
const returnArray = function(num, W, H) {
    const a = [];
    const pushArray = function(n) {
        if(n>num-1) {
            return;
        }
        const size = 70;
        a[n] = {
           x: rand(W-size),
           y: rand(H-size),
           width: size,
           height: size,
           xDelta: rand(2),
           yDelta: rand(2),
           color: colors[rand(5)]
        };
        pushArray(n+1);
    };
    pushArray(0); 
    return a;
};

const forEach = function(arr, f) {
    const looper = function(n) {
        if(n<=0) {
            return;
        }
        f(arr[n-1]);
        looper(n-1);
    };
    looper(arr.length);
};




const createPoints = function(count, canvasWidth, canvasHeight) {
    createCanvas(canvasWidth, canvasHeight);
    
    const storage = returnArray(count, canvasWidth, canvasHeight);
    
    return storage;
};

//const pts = createPoints(4, 1000, 600);

const gameData = {
    hero: {
        x: 0,
        y: canvas.height/2,
        width: 70,
        height: 70,
        xDelta: 20,
        yDelta: 20
    },
    
    badGuys: createPoints(3, window.innerWidth, window.innerHeight),
    
    over: false
};

const hero = gameData.hero;
const virus = gameData.badGuys;

const gameOverCheck = function(virus) {
    if(gameData.over === false){
        if(virus.x <= hero.x + hero.width 
                && virus.x + virus.width >= hero.x 
                && virus.y <= hero.y + hero.height 
                && virus.y + virus.height >= hero.y) {
           //gameData.over = true;
           gameData.over = !gameData.over;
           window.alert('Game Over!');
        }
    }
};


const updateData = function(point) {
    point.x = point.xDelta + point.x;
    point.y = point.yDelta + point.y;
    if((point.x >= canvas.width - point.width)||(point.x <= 0)) {
        point.xDelta = point.xDelta * (-1);
        point.color = colors[rand(5)];

    };
    if((point.y >= canvas.height - point.height)||(point.y <= 0)) {
        point.yDelta = point.yDelta * (-1);
        point.color = colors[rand(5)];

    };
    forEach(virus, gameOverCheck);
};

const virusImage = new Image();
virusImage.src = 'https://www.wpclipart.com/dl.php?img=/cartoon/animals/germ/virus_cartoon_T.png';

const backgroundImg = new Image();
backgroundImg.src = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/S15GBCm/colorful-cartoon-airport-background-with-space-for-your-text-or-logo-seamless-loop-animation-of-airport-traffic-with-many-airplanes-taking-off-and-landing-4k-travel-concept_ryub9c___F0008.png';

const heroImg = new Image();
heroImg.src = 'https://openclipart.org/image/2400px/svg_to_png/145735/Fly.png';


const draw = function(point) {
    c.drawImage(virusImage, point.x , point.y, point.width, point.height);
    
    updateData(point);
};


const drawHero = function() {
    c.drawImage(heroImg, gameData.hero.x , gameData.hero.y, gameData.hero.width, gameData.hero.height);
    
};

//bouncing

const loop = function() {
    
    if(!gameData.over) {
        c.drawImage(backgroundImg, 0 , 0, canvas.width, canvas.height);

        drawHero();

        forEach(gameData.badGuys, draw); 
    }

    requestAnimationFrame(loop);
    
};

loop();


const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

  
document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey) {
            hero.y = hero.y - hero.yDelta;
            
            if (hero.y <= 0) {
                hero.y = canvas.height-hero.height;
            }
  	} else if (event.keyCode === leftKey) {
            hero.x = hero.x - hero.xDelta;
            
            if (hero.x <=0) {
                hero.x = canvas.width - hero.width;
            }
        } else if (event.keyCode === rightKey) {
            hero.x = hero.x + hero.xDelta;
            
            if (hero.x + hero.width >= canvas.width) {
                hero.x = 0;
            }
        } else if (event.keyCode === downKey) {
            hero.y = hero.y + hero.yDelta;
            
            if (hero.y + hero.height >= canvas.height) {
                hero.y = 0;
            }
        };
        
}, false);

 




//Merge Sort
//const forEach = function(arr, f) {
//    const looper = function(n) {
//        if(n >= arr.length) {
//            return;
//        }
//        f(arr[n]);
//        looper(n+1);
//    };
//    looper(0);
//};
//
//const merge = function(arr1, arr2) {
//    const arr3 = [];
//    const looper = function(arr1, arr2) {
//        if(arr1.length === 0 && arr2.length === 0) {
//            return;
//        }
//        if(arr1.length !== 0 && arr2.length !== 0) {
//            if(arr1[0]>=arr2[0]) {
//                arr3.push(arr2[0]);
//                arr2.shift();
//            } else {
//                arr3.push(arr1[0]);
//                arr1.shift();
//            }
//        } else if(arr1.length === 0) {
//            const f = function(point) {
//                arr3.push(point);
//            };
//            forEach(arr2, f);
//            arr2.splice(0, arr2.length);
//            //arr2.splice(0, arr2.length);
//        } else {
//            const f = function(point) {
//                arr3.push(point);
//            };
//            forEach(arr1, f);
//            arr1.splice(0, arr1.length);
//        };
//        looper(arr1, arr2);
//    };
//    
//    looper(arr1, arr2);
//    
//    return arr3;
//}; 
//
//const mergeSort = function(arr1) {
//    if(arr1.length > 1) {
//        const arr2 = [];
//        const arr3 = [];
//        const m = Math.floor(arr1.length/2);
//        const looper1 = function(n) {
//            if(n === m) {
//                return;
//            }
//            arr2.push(arr1[n]);
//            looper1(n+1);
//        };
//        const looper2 = function(n) {
//            if(n === arr1.length) {
//                return;
//            }
//            arr3.push(arr1[n]);
//            looper2(n+1);
//        };
//        looper1(0);
//        looper2(m);
//        const result = merge(mergeSort(arr2), mergeSort(arr3));
//        return result;
//    }
//    return arr1;
//};
//
//console.log(mergeSort([7, 5, 6, 28, 4, -10, -90, 9, 20, -236, 86578, 0, 1, -6, 0, 19, 2]));