import { customFetch } from './utils/fetch.mjs';

export default class Login {
  #idBox;
  #pwBox;
  #submit;
  constructor() {
    this.#init();
  }

  #init() {
    if (localStorage.jwt) {
      location.href = '/notepad';
    }

    this.#setDOM();
    this.#setEvent();
  }

  #setDOM() {
    [this.#idBox, this.#pwBox, this.#submit] = document.querySelectorAll('#id, #pw, .submit');
  }

  #setEvent() {
    this.#submit.addEventListener('click', this.#login);
  }

  #login = async () => {
    const [id, pw] = this.#getValue();
    if (this.#validation(id, pw) !== true) {
      return;
    }

    try {
      const query = {
        query: `
          mutation {
            login(userId: "${id}", userPw: "${pw}")
          }
        `,
      };
      const body = await customFetch('POST', query, {
        Authorization: 'bearer ' + 'null',
      });

      if (body.errors) {
        throw body.errors;
      }

      localStorage.removeItem('edt_cur_tab');
      localStorage.jwt = body.data.login;
      location.href = '/notepad';
    } catch (errors) {
      alert(errors[0].message);
    }
  };

  #getValue() {
    return [this.#idBox.value, this.#pwBox.value];
  }

  #validation(id, pw) {
    this.#setDefaultColor();

    if (!id) {
      this.#setHightLight(this.#idBox);
      return alert('id를 입력하세요');
    }

    if (!pw) {
      this.#setHightLight(this.#pwBox);
      return alert('비밀번호를 입력하세요');
    }

    if (id.trim() === '') {
      this.#setHightLight(this.#idBox);
      return alert('공백은 허용되지 않습니다');
    }

    if (pw.trim() === '') {
      this.#setHightLight(this.#pwBox);
      return alert('공백은 허용되지 않습니다');
    }

    return true;
  }

  #setDefaultColor() {
    this.#idBox.style.borderColor = 'black';
    this.#pwBox.style.borderColor = 'black';
  }

  #setHightLight(dom) {
    dom.style.borderColor = 'red';
  }
}
