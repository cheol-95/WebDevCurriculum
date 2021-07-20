const dummy: Object = {
  src: {
    xbox: 'https://image.flaticon.com/icons/png/512/0/39.png',
    exclamation: 'https://image.flaticon.com/icons/png/512/3521/3521964.png',
  },
};

interface Template {
  content: HTMLElement;
}

export default class Tab {
  private tab: any;

  constructor([fileName, templateTab]: [string, Template]) {
    this.tab = this.clone(templateTab);
    this.init(fileName);
    return this.tab;
  }

  private clone(templateTab: Template) {
    const template = templateTab;
    return template.content.cloneNode(true);
  }

  private init(fileName: string) {
    this.setList(fileName);
    this.setAnchor(fileName);
    this.setIndicator(fileName);
  }

  private setList(fileName: string) {
    const li = this.tab.querySelector('li');
    li.id = `tab_${fileName}`;
    li.fileName = fileName;
  }

  private setAnchor(fileName: string) {
    const anchor = this.tab.querySelector('a');
    anchor.href = '#';
    anchor.textContent = fileName;
  }

  private setIndicator(fileName: string) {
    const indicator = this.tab.querySelector('img');
    indicator.id = `indicator_${fileName}`;
    indicator.src = dummy.src.xbox;
    indicator.status = 'xbox';

    indicator.setImg = (state: string) => {
      if (state === 'xbox' && indicator.status === 'exclamation') {
        indicator.src = dummy.src.xbox;
        indicator.status = 'xbox';
      } else if (state === 'exclamation' && indicator.status === 'xbox') {
        indicator.src = dummy.src.exclamation;
        indicator.status = 'exclamation';
      }
    };
  }
}
