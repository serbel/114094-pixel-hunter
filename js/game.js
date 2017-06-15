/**
 * Created by soniko on 14.06.2017.
 */

import game1Screen from './screenGame1';
import game2Screen from './screenGame2';
import game3Screen from './screenGame3';
import statsScreen from './screenStats';
import {headerWithState, startTimer} from './gameHeader';
import showNextScreen, {appendScreenElements} from './showNextScreen';
import {gameLevels, answers, gameType, headerData, statsData, currentLevel} from './model';
import {statsWithState} from './gameStats';


let headerElement;
let gameElement;
let statsElement;

export const resetGame = () => {
  currentLevel.reset();
  headerData.reset();
  answers.reset();
  // TODO: generate new levels array (gameLevels)
  statsData.reset();
};

export const showNextGame = () => {
  if (currentLevel.level === gameLevels.length) {
    showNextScreen(statsScreen);
    return;
  }

  currentLevel.up();

  headerElement = headerWithState(headerData);

  switch (gameLevels[currentLevel.level - 1]) {
    case gameType.ONE_IMAGE:
      gameElement = game1Screen;
      break;
    case gameType.TWO_IMAGE:
      gameElement = game2Screen;
      break;
    case gameType.THREE_IMAGE:
      gameElement = game3Screen;
      break;
    default:
      // default action
  }

  statsElement = statsWithState(answers.data);    // set initial stats state

  appendScreenElements(headerElement, gameElement, statsElement);

  startTimer();
};

export const updateHeader = () => {
  if (headerElement) {
    // headerElement = headerWithState(currentHeaderState);  // set current header state
    // mainScreen.querySelector(`.header`).innerHTML = ``;
    // mainScreen.querySelector(`.header`).appendChild(headerElement);
  }
};
