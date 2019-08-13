import 'normalize.css';
import * as PIXI from 'pixi.js';
import scaleToWindow from './assets/js/scaleToWindow';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bgFarImg = require('./assets/images/bg-far.png');

const {
  Application,
  Loader,
  Container,
  Sprite,
} = PIXI;

const app = new Application({
  antialias: true,
});

document.querySelector('#app').appendChild(app.view);

window.addEventListener('resize', (): void => {
  scaleToWindow(app.renderer.view);
});

app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let state: (delta: number) => void;
let gameScene: PIXI.Container;

const end = (): void => {

};

const play = (delta: number): void => {

};

const gameLoop = (delta: number): void => {
  state(delta);
};

const setup = (pixiLoader: PIXI.Loader, resource: PIXI.LoaderResource): void => {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  const bgFar = Sprite.from(bgFarImg);
  gameScene.addChild(bgFar);

  state = play;

  app.ticker.add((delta: number): void => gameLoop(delta));
};

const loadProgressHandler = (pixiLoader: PIXI.Loader, resource: PIXI.LoaderResource): void => {
  console.log(`loading ${resource.url}`);
  console.log(`progress ${pixiLoader.progress} %`);
};

new Loader()
  .add(bgFarImg)
  .on('progress', loadProgressHandler)
  .load(setup);
