function init(){
	var canvas = document.getElementById('mycanvas');
	w=canvas.width=700;
	h=canvas.height=600;
	pen = canvas.getContext('2d');
	cs = 50;
	human = getRandomHuman();
	game_over = false;
	score = 1;

	human_img = new Image();
	human_img.src = "Assets/human.png";

	corona_img = new Image();
	corona_img.src = "Assets/corona.png";

	trophy_img = new Image();
	trophy_img.src = "Assets/trophy.png";

	name = "Made by - Neha Pandey";
	game = "Infectious Trail";

	corona = {
		init_len:1,
		cells:[],
		direction:"right",

		createCorona:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:1});
			}
		},
 
		drawCorona:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.drawImage(corona_img,this.cells[i].x*cs+3,this.cells[i].y*cs+3,cs-6,cs-6);
			}
		},

		updateCorona:function(){
			
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==human.x && headY==human.y)
			{
				human=getRandomHuman();
				score++;
			}
			else
				this.cells.pop();
			
			if(this.direction=="right")
			{
				var X = headX + 1;
				var Y = headY;
			}
			else if(this.direction=="left")
			{
				var X = headX - 1;
				var Y = headY;
			}
			else if(this.direction=="up")
			{
				var X = headX;
				var Y = headY - 1;
			}
			else
			{
				var X = headX;
				var Y = headY + 1;
			}
			this.cells.unshift({x:X,y:Y});

			var last_x = Math.round((w/cs)-2);
			var last_y = Math.round((h/cs)-2);

			if(this.cells[0].x<1 || this.cells[0].y<1 || this.cells[0].x>last_x || this.cells[0].y>last_y)
				game_over = true;
		}

	};

	corona.createCorona();

	function keyPressed(e){
		if(e.key=="ArrowRight")
			corona.direction = "right";
		else if(e.key=="ArrowLeft")
			corona.direction = "left";
		else if(e.key=="ArrowDown")
			corona.direction = "down";
		else
			corona.direction = "up";
		console.log(corona.direction);
	}

	document.addEventListener('keydown',keyPressed);

}

function draw(){
	pen.clearRect(0,0,w,h);
	corona.drawCorona();

	pen.drawImage(human_img,human.x*cs-3,human.y*cs-3,cs+6,cs+6);

	pen.drawImage(trophy_img,-10,0,cs+30,2*cs);
	pen.fillStyle = "black";
	pen.font = "20px Cursive";
	pen.fillText(score,25,40);

	pen.fillStyle = "Gold";
	pen.font = "30px Cursive";
	pen.fillText(game,240,40);
	pen.font = "25px Cursive";
	pen.fillText(name,220,580);
}

function update(){
	corona.updateCorona();
}

function getRandomHuman(){
	var humanX = Math.round(Math.random()*(w-cs)/cs);
	var humanY = Math.round(Math.random()*(h-cs)/cs);
	if(humanX==0 || humanX==13)
		humanX=5;
	if(humanY==0 || humanY==11)
		humanY=5;
	var human = {
		x:humanX,
		y:humanY,
	}
	return human;
}

function gameloop(){
	if(game_over==true)
	{
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,300);