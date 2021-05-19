# component-learning
타입스크립트로 컴포넌트 익히기

# day1

컴포넌트는 `현재 자신의 상태`에 따라서 render()를 한다.

자신의 상태는 `setState()`를 통해서 변경한다.

# day2

컴포넌트에 삭제 버튼을 추가하여 삭제 버튼이 클릭되면

해당 아이템이 삭제될 수 있도록 구현하였다.
## 주의점
타입스크립트에서 컴포넌트에 dataset을 활용하기 위해서는 변수를 받은 후에 타입을 강제시켜주자.
```
const deleteBtns = this.parent.querySelectorAll(".deleteBtn");
deleteBtns.forEach((button) => {
      const deleteBtn = button! as HTMLButtonElement;
      deleteBtn.addEventListener("click", (e) => {
        const target = e.target! as HTMLButtonElement;
        const delIdx = target.dataset["index"];
        const items = [...this.states.items];
        items.splice(+delIdx! as number, 1);
        this.setState({ items });
      });
```
