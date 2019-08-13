import 'normalize.css';
import * as PIXI from 'pixi.js';
import scaleToWindow from './assets/js/scaleToWindow';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bgFarImg = require('./assets/images/bg-far.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bgMidImg = require('./assets/images/bg-mid.png');

const {
  Application,
  Loader,
  Container,
  Texture,
  TilingSprite,
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
let bgFar: PIXI.TilingSprite;
let bgMid: PIXI.TilingSprite;

const end = (): void => {

};

const play = (delta: number): void => {
  bgFar.tilePosition.set(bgFar.tilePosition.x - 0.128, bgFar.tilePosition.y);
  bgMid.tilePosition.set(bgMid.tilePosition.x - 0.64, bgMid.tilePosition.y);
};

const gameLoop = (delta: number): void => {
  state(delta);
};

const setup = (pixiLoader: PIXI.Loader, resource: PIXI.LoaderResource): void => {
  gameScene = new Container();
  app.stage.addChild(gameScene);

  const farTexture = Texture.from(bgFarImg);
  bgFar = new TilingSprite(
    farTexture,
    farTexture.baseTexture.width,
    farTexture.baseTexture.height,
  );
  // bgFar.tilePosition.set(0, 0);
  gameScene.addChild(bgFar);

  const midTexture = Texture.from(bgMidImg);
  bgMid = new TilingSprite(
    midTexture,
    midTexture.baseTexture.width,
    midTexture.baseTexture.height,
  );
  bgMid.position.set(0, 128);
  gameScene.addChild(bgMid);

  state = play;

  app.ticker.add((delta: number): void => gameLoop(delta));
};

const loadProgressHandler = (pixiLoader: PIXI.Loader, resource: PIXI.LoaderResource): void => {
  console.log(`loading ${resource.url}`);
  console.log(`progress ${pixiLoader.progress} %`);
};

new Loader()
  .add(bgFarImg)
  .add(bgMidImg)
  .on('progress', loadProgressHandler)
  .load(setup);
