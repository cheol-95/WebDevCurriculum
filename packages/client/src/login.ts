import { customFetch } from './utils/fetch.js';

interface CustomElement extends HTMLElement {
  value: string;
}

export default class Login {
  private idBox: CustomElement | any = document.querySelector('#id');

  private pwBox: CustomElement | any = document.querySelector('#pw');

  private submit: CustomElement | any = document.querySelector('.submit');

  constructor() {
    this.init();
  }

  private init() {
    if (localStorage.jwt) {
      location.href = '/notepad';
    }
    this.setEvent();
  }

  private setEvent(): void {
    this.submit.addEventListener('click', this.login);
  }

  private login = async (): Promise<void> => {
    const [id, pw] = this.getValue();
    if (this.validation(id, pw) !== true) {
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
        throw body.errors[0];
      }

      localStorage.removeItem('edt_cur_tab');
      localStorage.jwt = body.data.login;
      location.href = '/notepad';
    } catch (err) {
      err.extensions ? alert(err.message) : alert('로그인에 실패했습니다');
    }
  };

  private getValue(): Array<any> {
    return [this.idBox.value, this.pwBox.value];
  }

  private validation(id: string, pw: string) {
    this.setDefaultColor();

    if (!id) {
      this.setHightLight(this.idBox);
      return alert('id를 입력하세요');
    }

    if (!pw) {
      this.setHightLight(this.pwBox);
      return alert('비밀번호를 입력하세요');
    }

    if (id.trim() === '') {
      this.setHightLight(this.idBox);
      return alert('공백은 허용되지 않습니다');
    }

    if (pw.trim() === '') {
      this.setHightLight(this.pwBox);
      return alert('공백은 허용되지 않습니다');
    }

    return true;
  }

  private setDefaultColor() {
    this.idBox.style.borderColor = 'black';
    this.pwBox.style.borderColor = 'black';
  }

  private setHightLight(DOM: HTMLElement) {
    DOM.style.borderColor = 'red';
  }
}
