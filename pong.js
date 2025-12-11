const pong_game = document.querySelector("#pong");
const game_controls = document.querySelector("#controls");
const play_btn = document.querySelector("#play_button")
const reset_btn = document.querySelector("#reset_button");
const points_btn = document.querySelector("#submit_button");

const pong_context = pong_game.getContext("2d");
const control_context = game_controls.getContext("2d");

const paddle_width = 20;
const paddle_height = 220;

const ball = {
  x_axis: pong_game.width / 2,
  y_axis: pong_game.height / 2,
  radius: 15,
  x_velocity: 10,
  y_velocity: 10
};

const player = {
  x_axis: 0,
  y_axis: pong_game.height / 2 - paddle_height / 2,
  width: paddle_width, 
  height: paddle_height,
  y_velocity: 50,
  score: 0
};

const computer = {
  x_axis: pong_game.width - paddle_width,
  y_axis: pong_game.height / 2 - paddle_height / 2,
  width: paddle_width,
  height: paddle_height,
  y_velocity: 9.5, 
  score: 0
};

let game_points = 1;
let game_interval;
const text_location = pong_game.height / 3;
const text_family = "Bitcount";
const ghost_white = "#f0eff4";

function ControlPadColor(first, second, third) {
  return `rgb(${first}, ${second}, ${third})`;
}

function DrawRectangle(x_axis, y_axis, width, height, color) {
  pong_context.fillStyle = color;
  pong_context.fillRect(x_axis, y_axis, width, height);
}

function DrawCircle(x_axis, y_axis, radius, color) {
  pong_context.fillStyle = color;
  pong_context.beginPath();
  pong_context.arc(x_axis, y_axis, radius, 0, 2 * Math.PI, false);
  pong_context.closePath();
  pong_context.fill();
}

control_context.fillStyle = ControlPadColor(255, 5, 5);

function DrawGamePad(x_axis, y_axis, width, height, color) {
  control_context.beginPath();
  control_context.fillStyle = color;

  control_context.moveTo(x_axis, y_axis);
  control_context.lineTo(x_axis + width, y_axis * 2);
  control_context.lineTo(x_axis + width, y_axis + height);
  control_context.lineTo(x_axis, y_axis + height);
  control_context.lineTo(x_axis - width, y_axis + height);
  control_context.lineTo(x_axis - width, y_axis * 2);
  control_context.lineTo(x_axis, y_axis);
  control_context.fill();

  control_context.save();
  control_context.scale(1, -1);
  control_context.translate(0, -game_controls.height);
  control_context.lineWidth = 4.34;
  
  control_context.strokeStyle = "#9e829c";
  control_context.stroke();
}

function DrawNet() {
  for (let count = 0; count < pong_game.height; count+= 15) {
    DrawRectangle(pong_game.width / 2 - 1, count, 2.5, 10, "white");
  }
}

function ResetBall() {
  ball.x_axis = pong_game.width / 2;
  ball.y_axis = pong_game.height / 2;
  ball.x_velocity *= -1;
  ball.y_velocity = 5 * (Math.random() > 0.5 ? 1 : -1);
}

function DrawText(text, x_axis, y_axis, color = "white", font_family = text_family) {
  pong_context.fillStyle = color;
  pong_context.font = `4rem ${font_family}`;
  pong_context.fillText(text, x_axis, y_axis);
}

function GameMechanics() {
  ball.x_axis += ball.x_velocity;
  ball.y_axis += ball.y_velocity;
  const ball_touch_top_edge = ball.y_axis - ball.radius < 0;
  const ball_touch_bottom_edge = ball.y_axis + ball.radius > pong_game.height;

  if (ball_touch_top_edge || ball_touch_bottom_edge) {
    ball.y_velocity *= -1;
  }

  let paddle = (ball.x_axis < pong_game.width / 2) ? player : computer;

  function BallTouchPaddle() {
     const ball_in_paddle_x = ball.x_axis - ball.radius < paddle.x_axis + paddle_width;
     const ball_touch_front = ball.x_axis + ball.radius > paddle.x_axis;
     const ball_in_paddle_y = ball.y_axis < paddle.y_axis + paddle.height;
     const ball_touch_top = ball.y_axis > paddle.y_axis;
     const ball_touch_bottom = ball.y_axis + ball.radius < paddle.y_axis + paddle.height;
     return ball_in_paddle_x && ball_touch_front && ball_in_paddle_y && ball_touch_top && ball_touch_bottom;
  }

  if (BallTouchPaddle()) {
    ball.x_velocity *= -1;
    new Audio("sounds/bounce_blip.mp3").play();
  }

  const computer_scored = ball.x_axis - ball.radius < -60;
  const player_scored = ball.x_axis + ball.radius > pong_game.width+ 60;

  if (computer_scored) {
    computer.score++;
    new Audio("sounds/scored.mp3").play();
    ResetBall();
  } else if (player_scored) {
    player.score++;
    new Audio("sounds/scored.mp3").play();
    ResetBall();
  }

  if (ball.y_axis < computer.y_axis + computer.height / 2) {
    computer.y_axis -= computer.y_velocity;
  } else {
    computer.y_axis += computer.y_velocity;
  }
}

function DrawGame() {
  DrawRectangle(0, 0, pong_game.width, pong_game.height, "black");
  DrawRectangle(
    player.x_axis, player.y_axis, player.width, player.height, "white");
  DrawRectangle(
    computer.x_axis, computer.y_axis, computer.width, computer.height, "white");
  DrawNet();
  DrawCircle(ball.x_axis, ball.y_axis, ball.radius, "white");
  DrawText(player.score, pong_game.width / 7, 50);
  DrawText(computer.score, 4.5 * (pong_game.width / 7), 50);

  if (computer.score === game_points) {
    DrawText(
        "Computer Won", pong_game.width / 9, text_location, ghost_white, text_family)
    new Audio("sounds/victory.mp3").play();
  } else if (player.score === game_points) {
    DrawText(
        "Player Won", pong_game.width / 6.5, text_location, ghost_white, text_family);
    new Audio("sounds/victory.mp3").play();
  }

  DrawGamePad(
    game_controls.width / 2, game_controls.height / 9, game_controls.width / 3, game_controls.height / 3, ghost_white);
}

function GamePlay() {
  GameMechanics();

  if (computer.score === game_points) {
    clearInterval(game_interval);
  } else if (player.score === game_points) {
    clearInterval(game_interval);
  }

  DrawGame();
}

points_btn.addEventListener("click", ()=>{
  let user_input = document.querySelector("#max_points");

  if ((user_input.value < 1) || (user_input.value > 11)) {
    game_points = 1;
  } else {
    game_points = Number(user_input.value);
  }

  user_input.value = 0;
});

game_controls.addEventListener("click", function (event) {
  new Audio("sounds/mouse_clicky.mp3").play();
  let user_touch = game_controls.getBoundingClientRect();
  const direction_btn = event.clientY - user_touch.top;
  user_touch = parseFloat((user_touch.height / 2).toPrecision(2));

  if (direction_btn > user_touch) {
    player.y_axis += player.y_velocity;

    if ((player.y_axis + player.height) >= pong_game.height) {
      player.y_axis = pong_game.height - player.height;
    }
  } else {
    player.y_axis -= player.y_velocity;

    if ((player.y_axis - player.height) <= (player.height * -1)) {
      player.y_axis = 0;
    }
  }
});

play_btn.addEventListener("click", ()=>{
  game_interval = setInterval(GamePlay, 16.6);
  play_btn.disabled = true;

  reset_btn.addEventListener("click", ()=>{
    play_btn.disabled = false;
    window.location.reload();
  });
});