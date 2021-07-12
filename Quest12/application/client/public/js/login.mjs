export default class Login {
  #idBox;
  #pwBox;
  #submit;
  #loginUrl = 'https://localhost:8000/user/login/';
  constructor() {
    this.#init();
  }

  #init() {
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
      const res = await fetch(this.#loginUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify({ id, pw }),
      });

      const body = await res.json();
      if (res.status === 200) {
        localStorage.removeItem('edt_cur_tab');
        localStorage.jwt = body.jwt;
        location.href = '/notepad';
      } else {
        throw body;
      }
    } catch (err) {
      alert(err.message);
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
