# Pong Web Application
This is a web application programmed in HTML, CSS, and Javascript in which it is inspired by the classic game **Pong**. Here, there are two paddles, each controled by an entity, and the main objective it to be the first to achive a certain number of points before the other where the a point is gained when the ball passes the border. The paddles themselves can be controlled by a player, or a computer. For this project, I decided that the game play should be *player vs. computer*, where one paddle is controlled by the user, and the other is programmed to predict where the ball will go. The main areas of interest for this project will be in **HTML** where I practice using the `canvas` element, and in **Javascript** where I utilize mathematical concepts such as geometry and velocity. While those areas are the topic of discussion, I will acknowledge that this project helped introduce me to `embedded-systems`. Because it is small, there will not be much time spend on the front-end development process, but rather on the back-end logic. 

## Front-end

### HTML
From the conception of this project, I settled on a design where the game would be controlled by two buttons housed in one control pad. What the buttons do be simple; one makes the user paddle go up, and the other will make it go down. At first, I planned to create a `div` that housed the buttons, each being a `button` element respectively, and from there, it would have been trivial to add simple event listeners. However, though small, I began to have a vision of how the buttons should look like. This would require specific calculations, which inspired me to consider the `canvas` element. This allowed me condence nesting `button` elements inside a single `div` into one `canvas`.
```html
<canvas id="controls"></canvas>
```
Here, I will be able to draw my buttons without adding more elements or event listeners. Once I finished the planning phase for the buttons, I reconsidered my plans for the **PONG** game itself. Yes, I am able to create seperate `div` elements, one for the ball and two for each paddle, however, that will surely convolute the size of the **HTML** page as well as the backend code in which the majority would have been using the `.querySelector()` **Javascrpt** function, and the `translate()` **CSS** function. In order to save tedious code, I settled on using `canvas` once again to draw the paddles, the ball, and the net.
```html
<canvas height="600" id="pong" width="600"></canvas>
```
Therefore, I will have two `canvas` elements that are in charge of the overall program functionality. `height` is set to *600* as well as `width` to accomodate the pixel ratio of the screen, meaning that the pixels will be distributed to what the window allows. Adjusting the canvas's inline `height` and `width` increases content sharpness. Furthermore, with the reduction of container elements originally thought for the game itself, I am able to focus on the raw logic instead of fidgeting with **CSS** properties such as `display` or `justify-content`. Continuing further, since the amount of container elements are greatly reduced, it makes the addition of new features less complex, such as adding *start*, and *reset* game functionality along with setting the maximum points. In conclusion, the final **HTML** is condenced, and efficient in emphasizing the organization of the important game functionality.
```html 
<canvas height="600" id="pong" width="600"></canvas>
<canvas id="controls"></canvas>

<div class="console__buttons">
  <button id="play_button"> <p> PLAY </p> </button>
  <button id="reset_button"> <p> RESET </p> </button>
</div>

<span>
  <label for="points"> <p> Max Points: </p> </label>
  <input type="number" name="max_points" id="max_points" min="1" max="10">
  <button type="submit" id="submit_button"> Enter </button>
</span>
```
## Back-end

### Javascript
I shall begin the thought process behind the back-end logic by first stating the main objects at play. In a **PONG** game, there are three factors that are constantly moving, or objects with dynamic states, those begin the two paddles, and the ball. Realizing this, and seeing them as objects, I then considered their properties. *What do they have in common?*; *What properties allow them to move*? To answer the former, all of the objects need coordinates, X and Y respectively, and a width and height of which the paddles need to be the same. For the latter, the ball will contain a radius and non-static velocity for both X and Y as well as the paddles. What differs between paddles and ball is the motion that is allowed; the ball has more range while the paddles only move up or down. 
[Button Coordinates](planning/button_coordinates.pdf)
