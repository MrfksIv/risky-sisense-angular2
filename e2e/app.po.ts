import { browser, element, by } from 'protractor';

export class ChurnAvoidancePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rz-root h1')).getText();
  }
}
