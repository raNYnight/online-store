import { makeMyJsonProperties } from './filtering';
import { build } from './page-builder';
import { router } from './router';

export class App {

  static renderNewPage(pageId: string = 'main') {
    document.body.innerHTML = '';
    if ((window.location.hash).slice(1) === '') {
      pageId = 'main/';
      window.location.hash = 'main/';
    } else {
      pageId = (window.location.hash).slice(1);
    }
    build(pageId);
  }

  run() {
    // console.log('app.run()')
    makeMyJsonProperties();
    App.renderNewPage();
    window.addEventListener("hashchange", router);
  }
}