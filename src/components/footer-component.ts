import { Component } from "./components";

export class FooterComponent extends Component {
  constructor(tagName: string = 'footer', className: string = 'footer container') {
    super(tagName, className)
  }

  render() {
    const footerGit = document.createElement('a');
    footerGit.href = 'https://github.com/';
    footerGit.className = 'footer__git';

    const footerYear = document.createElement('span');
    footerYear.innerText = "2022";
    footerYear.className = 'footer__year';

    const footerRss = document.createElement('a');
    footerRss.href = 'https://rs.school/js/';
    footerRss.className = 'footer__rss';

    this.container.append(footerGit, footerYear, footerRss);

    return this.container;
  }
}