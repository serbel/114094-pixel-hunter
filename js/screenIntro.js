/**
 * Created by soniko on 30.05.2017.
 */

import greetingScreen from './screenGreeting';
import createElement from './createDOMElement';
import showNextScreen from './showNextScreen';

const introMarkup = `\
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
<footer class="footer">
  <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
  <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2017</span>
  <div class="footer__social-links">
    <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
    <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
    <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
    <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
  </div>
</footer>`;


const introScreen = createElement(introMarkup);

const asterisk = introScreen.querySelector(`.intro__asterisk`);
asterisk.addEventListener(`click`, asteriskHandler);

function asteriskHandler(event) {
  event.preventDefault();
  asterisk.removeEventListener(`click`, asteriskHandler);
  showNextScreen(greetingScreen);
}

export default introScreen;
