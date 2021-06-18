class Tab {
  #tab;
  constructor(fileName) {
    this.#tab = this.#clone();

    this.#init(fileName);
    return this.#tab;
  }

  #clone() {
    const template = document.querySelector('#tb-tab');
    return template.content.cloneNode(true);
  }

  #init(fileName) {
    this.#setList(fileName);
    this.#setAnchor(fileName);
    this.#setIndicator(fileName);
  }

  #setList(fileName) {
    const li = this.#tab.querySelector('li');
    li.id = 'tab_' + fileName;
    li.fileName = fileName;
  }

  #setAnchor(fileName) {
    const anchor = this.#tab.querySelector('a');
    anchor.href = '#';
    anchor.textContent = fileName;
  }

  #setIndicator(fileName) {
    const indicator = this.#tab.querySelector('img');
    indicator.id = 'indicator_' + fileName;
    indicator.src = dummy.src.xbox;
    indicator.status = 'xbox';

    indicator.setExclamation = () => {
      if (indicator.status === 'xbox') {
        indicator.src = dummy.src.exclamation;
        indicator.status = 'exclamation';
      }
    };

    indicator.setXBox = () => {
      if (indicator.status === 'exclamation') {
        indicator.src = dummy.src.xbox;
        indicator.status = 'xbox';
      }
    };
  }
}

// class Tab {
//   #tab = document.createElement('a');
//   constructor(fileName) {
//     this.#tab.className = 'tab';
//     this.#tab.fileName = fileName;

//     this.#tab.id = 'tab_' + fileName;
//     this.#tab.href = '#';

//     this.#init();
//     return this.#tab;
//   }

//   #init() {
//     this.#setTabName();
//     this.#setIndicator();
//   }

//   #setTabName() {
//     const newSpan = document.createElement('span');
//     newSpan.innerText = this.#tab.fileName;
//     newSpan.fileName = this.#tab.fileName;
//     this.#tab.append(newSpan);
//   }

//   #setIndicator() {
//     this.#tab.append(new Indicator(this.#tab.fileName));
//   }
// }

// {
//   /* <section class="tabbar">
//   <template id="tb-tab">
//     <li class="tab">
//       <span></span>
//       <img class="indicator"></img>
//     </li>
//   </template>
// </section>; */
// }
//
// class Indicator {
//   #indicator;
//   constructor(fileName) {
//     this.#indicator = document.createElement('img');
//     this.#indicator.className = 'indicator';

//     this.#indicator.id = 'indicator_' + fileName;
//     this.#indicator.src = dummy.src.xbox;
//     this.#indicator.status = 'xbox';

//     this.#init();
//     return this.#indicator;
//   }

//   #init() {
//     this.#indicator.setExclamation = this.setExclamation;
//     this.#indicator.setXBox = this.setXBox;
//   }

//   setExclamation() {
//     if (this.status === 'xbox') {
//       this.src = dummy.src.exclamation;
//       this.status = 'exclamation';
//     }
//   }

//   setXBox() {
//     if (this.status === 'exclamation') {
//       this.src = dummy.src.xbox;
//       this.status = 'xbox';
//     }
//   }
// }
