/**
 * Created by @iamserj on 30.05.2017.
 */

import AbstractView from '../../view';
import imageOnLoad from '../../utils/resizeImage';
import {ServerAnswerType, currentLevel, answers, levelTypes} from '../../data';


const game1Markup = (image) => `\
<div class="game">
  <p class="game__task">Угадайте, фото или рисунок?</p>
  <form class="game__content  game__content--wide">
    <div class="game__option">
      <img id="imageid" src= ${image[0]} alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
</div>`;

const game2Markup = (image) => `\
<div class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img id="imageid1" src= ${image[0][0]} alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img id="imageid2" src= ${image[1][0]} alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
</div>`;

const game3Markup = (image, taskText) => `\
<div class="game">
  <p class="game__task">${taskText}</p>
  <form class="game__content game__content--triple">
    <div class="game__option" id="option0">
      <img id="imageid1" src= ${image[0][0]} alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option" id="option1">
      <img id="imageid2" src= ${image[1][0]} alt="Option 1" width="304" height="455">
    </div>
    <div class="game__option" id="option2">
      <img id="imageid3" src= ${image[2][0]} alt="Option 1" width="304" height="455">
    </div>
  </form>
</div>`;


let answer1ImageType;

export class Game1View extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    const currentAnswer = (levelTypes.answers[currentLevel.level - 1]);
    currentAnswer.forEach((image) => {
      answer1ImageType = [image.image.url, image.type];
    });
    // console.log(answer1ImageType[1]);
    return game1Markup(answer1ImageType);
  }

  bind() {
    const img = this.element.querySelector(`#imageid`);
    img.style.visibility = `hidden`;
    img.onload = imageOnLoad(img);

    const answerClick = (event) => {
      const isCorrect = answers.check(event.target.value, ServerAnswerType[answer1ImageType[1]]);
      answers.save(isCorrect);
      this.answerHandler();
    };

    const question1 = this.element.querySelectorAll(`input[name="question1"]`);
    Array.from(question1).forEach((answer) => answer.addEventListener(`click`, answerClick));
  }

  answerHandler() {}
}


let answer2ImageType = [];

export class Game2View extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    const currentAnswer = (levelTypes.answers[currentLevel.level - 1]);
    currentAnswer.forEach((image, index) => {
      answer2ImageType[index] = [image.image.url, image.type];
    });
    // console.log(answer2ImageType[0][1], answer2ImageType[1][1]);
    return game2Markup(answer2ImageType);
  }

  bind() {
    const img1 = this.element.querySelector(`#imageid1`);
    const img2 = this.element.querySelector(`#imageid2`);
    img1.style.visibility = `hidden`;
    img2.style.visibility = `hidden`;
    img1.onload = imageOnLoad(img1);
    img2.onload = imageOnLoad(img2);

    let answer1 = ``;
    let answer2 = ``;
    let firstImageType;
    let secondImageType;

    const answer1Click = (event) => {
      if (answer1 !== ``) {
        event.preventDefault();
        return;
      }
      answer1 = event.target.value;
      firstImageType = ServerAnswerType[answer2ImageType[0][1]];
      checkAnotherAnswer();
    };

    const answer2Click = (event) => {
      if (answer2 !== ``) {
        event.preventDefault();
        return;
      }
      answer2 = event.target.value;
      secondImageType = ServerAnswerType[answer2ImageType[1][1]];
      checkAnotherAnswer();
    };

    const question1 = this.element.querySelectorAll(`input[name="question1"]`);
    const question2 = this.element.querySelectorAll(`input[name="question2"]`);
    Array.from(question1).forEach((answer) => answer.addEventListener(`click`, answer1Click));
    Array.from(question2).forEach((answer) => answer.addEventListener(`click`, answer2Click));

    const checkAnotherAnswer = () => {
      if (answer1 !== `` && answer2 !== ``) {
        const isCorrectFirst = answers.check(answer1, firstImageType);
        const isCorrectSecond = answers.check(answer2, secondImageType);
        answers.save(isCorrectFirst, isCorrectSecond);
        this.answerHandler();
        answer1 = answer2 = ``;
      }
    };
  }
  answerHandler() {}
}


let answer3ImageType = [];
let currentText;
export class Game3View extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    const currentAnswer = (levelTypes.answers[currentLevel.level - 1]);
    currentText = (levelTypes.questionTexts[currentLevel.level - 1]);
    currentAnswer.forEach((image, index) => {
      answer3ImageType[index] = [image.image.url, image.type];
    });
    // console.log(answer3ImageType[0][1], answer3ImageType[1][1], answer3ImageType[2][1]);
    return game3Markup(answer3ImageType, currentText);
  }

  bind() {
    const img1 = this.element.querySelector(`#imageid1`);
    const img2 = this.element.querySelector(`#imageid2`);
    const img3 = this.element.querySelector(`#imageid3`);
    img1.style.visibility = `hidden`;
    img2.style.visibility = `hidden`;
    img3.style.visibility = `hidden`;
    img1.onload = imageOnLoad(img1);
    img2.onload = imageOnLoad(img2);
    img3.onload = imageOnLoad(img3);

    const question1 = this.element.querySelectorAll(`.game__option`);

    const answerClick = (event) => {

      const selectedAnswer = answer3ImageType[event.target.id.slice(-1)][1];

      if (currentText.indexOf(`фото`) !== -1) {
        answers.save(selectedAnswer === `photo`);
      } else if (currentText.indexOf(`рисунок`) !== -1) {
        answers.save(selectedAnswer === `painting`);
      } else {
        answers.save(false);
      }
      this.answerHandler();
    };

    Array.from(question1).forEach((answer) => answer.addEventListener(`click`, answerClick));
  }

  answerHandler() {}
}
