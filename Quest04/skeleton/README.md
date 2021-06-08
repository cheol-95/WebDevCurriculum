### composition 기반의 코드에 MakeElement를 상속한 이유

- document.createElement()를 통해 생성한 객체를 하위 클래스의 this로 할당하고 싶었으나 다른 방법을 찾지 못했습니다.

<br>

### Mixin을 사용하지 않은 이유

- Mixin을 사용해서 공통적으로 사용하는 이벤트인 `드래그`를 추가하는 코드를 작성하였으나 의도한 대로 동작하지 않았습니다.

```
ex)

// 베이스 아이콘
class Icon extends MakeElement{
  constructor(...args){
    super(...args)
  }
}

// 드래그 기능을 추가하는 믹스인
const DragMixin = superclass => class extends superclass {
  onmousedown = (e) => {
    // 드래그 이벤트 정의
  }
  ondragstart = () => false;
}

// 드래그 기능을 가진 아이콘
class DragIcon = DragMixin(Icon) {
  constructor(...args) {
    super(...args)
  }
}

const newIcon = DragIcon()
```
