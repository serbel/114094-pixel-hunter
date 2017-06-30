/**
 * Created by @iamserj on 26.06.2017.
 */

import assert from 'assert';
import {currentLevel, MAX_LEVELS_AMOUNT} from './data';
import {headerData} from './data';
import {GameType, levelTypes} from './data';
import {AnswerType, AnswerTiming, answers} from './data';
import {ScorePoints, score} from './data';


describe(`Game`, () => {

  describe(`Current level should start from 1 and finish at 10`, () => {

    it(`Levels should starts from 1`, () => {
      currentLevel.reset();
      currentLevel.up();
      assert.strictEqual(1, currentLevel.level);
    });

    it(`showNextGame() shouldn't increase current level number higher than 10`, () => {
      for (let i = 0; i < 50; i++) {
        if (currentLevel.level === MAX_LEVELS_AMOUNT) {
          return;
        }
        currentLevel.up();
      }
      assert.ok(currentLevel.level <= MAX_LEVELS_AMOUNT);
    });

  });

  describe(`Timer should be in range from 30 to 0`, () => {

    it(`resetTime() sets headerData.time to 30`, () => {
      headerData.resetTime();
      assert.strictEqual(30, headerData.time);
    });

    it(`timer shouldn't decrease time lower than 0`, () => {
      for (let i = 0; i < 50; i++) {
        if (headerData.time === 0) {
          return;
        }
        headerData.time--;
      }
      assert.strictEqual(0, headerData.time);
    });

  });

  // commented to disable eslint error: Too many nested callbacks (4). Maximum allowed is 3  max-nested-callbacks
  // describe(`Level type should be 1, 2, 3 and length must be less than 10`, () => {

  it(`levelTypes should present 1, 2 or 3`, () => {
    levelTypes.reset();
    levelTypes.levelsArray.forEach(function (element) {
      assert.ok(element === GameType.ONE_IMAGE || element === GameType.TWO_IMAGE || element === GameType.THREE_IMAGE);
    });
  });

  it(`levelTypes should contain 10 elements`, () => {
    assert.strictEqual(MAX_LEVELS_AMOUNT, levelTypes.levelsArray.length);
  });

  // });

  describe(`Answers check`, () => {

    // commented to disable eslint error: Too many nested callbacks (4). Maximum allowed is 3  max-nested-callbacks
    // describe(`Correct and wrong check`, () => {

    it(`answer is correct if both of questions correct`, () => {
      answers.save(true, true);
      assert.ok(answers.data[currentLevel.level - 1] !== AnswerType.WRONG);
    });

    it(`answer is wrong if one of questions wrong`, () => {
      answers.save(false, true);
      assert.ok(answers.data[currentLevel.level - 1] === AnswerType.WRONG);
      answers.save(true, false);
      assert.ok(answers.data[currentLevel.level - 1] === AnswerType.WRONG);
    });

    it(`answer is wrong if both of questions wrong`, () => {
      answers.save(false, false);
      assert.ok(answers.data[currentLevel.level - 1] === AnswerType.WRONG);
    });

    // });

    // commented to disable eslint error: Too many nested callbacks (4). Maximum allowed is 3  max-nested-callbacks
    // describe(`Timing check`, () => {

    it(`answer timing FAST, CORRECT, SLOW`, () => {
      headerData.resetTime();
      for (let i = headerData.time; i >= 0; i--) {
        headerData.time = i;
        answers.save(true);
        if (i >= AnswerTiming.FAST) {
          assert.ok(answers.data[currentLevel.level - 1] === AnswerType.FAST);
        } else if (i >= AnswerTiming.SLOW) {
          assert.ok(answers.data[currentLevel.level - 1] === AnswerType.CORRECT);
        } else {
          assert.ok(answers.data[currentLevel.level - 1] === AnswerType.SLOW);
        }
      }
    });

    // });

  });

  describe(`Lives amount`, () => {

    it(`Decrease number of lives in case of wrong answer`, () => {
      headerData.resetLives();
      const initialLivesMinusOne = headerData.lives - 1;
      answers.save(false);
      assert.strictEqual(headerData.lives, initialLivesMinusOne);
    });

  });

});

describe(`STATISTICS`, () => {

  describe(`Score points`, () => {

    it(`Correct answer adds 100 points`, () => {
      score.reset();
      const pointsPlus = score.points + ScorePoints.CORRECT;
      score.add(ScorePoints.CORRECT);
      assert.equal(pointsPlus, score.points);
    });

    it(`Fast answer adds 150 points`, () => {
      score.reset();
      const pointsPlus = score.points + ScorePoints.FAST;
      score.add(ScorePoints.FAST);
      assert.equal(pointsPlus, score.points);
    });

    it(`Slow answer adds 50 points`, () => {
      score.reset();
      const pointsPlus = score.points + ScorePoints.SLOW;
      score.add(ScorePoints.SLOW);
      assert.equal(pointsPlus, score.points);
    });

    it(`Saved lives adds 50 points`, () => {
      score.reset();
      headerData.resetLives();

      let pointsCheck = score.points;

      for (let i = headerData.lives; i > 0; i--) {
        pointsCheck += ScorePoints.SAVEDLIVE;
        score.add(ScorePoints.SAVEDLIVE);
      }
      assert.equal(pointsCheck, score.points);
    });

  });

});