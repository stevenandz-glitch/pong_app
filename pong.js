const pong_game = document.querySelector("#pong");
const game_controls = document.querySelector("#controls");
const play_btn = document.querySelector("#play_button")
const reset_btn = document.querySelector("#reset_button");
const points_btn = document.querySelector("#submit_button");

const pong_context = pong_game.getContext("2d");
const control_context = game_controls.getContext("2d");

const paddle_width = 10;
const paddle_height = 100;

const ball = {
  x_axis: pong_game.width / 2,
  y_axis: pong_game.height / 2,
  radius: 10,
  x_velocity: 5,
  y_velocity: 5
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
  y_velocity: 5, 
  score: 0
};

let game_points = 1;
let game_interval;
const text_location = pong_game.height / 3;
const text_family = "Bitcount Prop Double";
const text_color = "rgb(13, 207, 10)";

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

function DrawGamePad(x_axis, y_axis, width, height, color) {
  control_context.fillStyle = color;
  control_context.beginPath();

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
  control_context.strokeStyle = "blue";
  control_context.stroke();
}

function DrawNet() {
  for (let count = 0; count < pong_game.height; count++) {
    DrawRectangle(pong_game.width / 2 - 1, count, 2.5, 10, "white");
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
        "Computer Won", pong_game.width / 15, text_location, text_color, text_family)
  } else if (player.score === game_points) {
    DrawText(
        "Player Won", pong_game.width / 4.5, text_location, text_color, text_family);
  }

  DrawGamePad(
    game_controls.width / 2, 17.2, game_controls.width / 3, game_controls.height / 3, "red");
  
}