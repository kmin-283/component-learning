type appType = {
  items: string[];
};

class App {
  private states: appType;
  constructor(private parent: HTMLElement) {
    this.states = {
      items: ["1", "2"],
    };
    this.setEvent();
    this.render();
  }
  setState(nextState: appType) {
    this.states = nextState;
    this.render();
  }
  setEvent() {
    this.parent.addEventListener("click", (e) => {
      const { items } = this.states;
      console.log(e.target);
      if (
        e.target instanceof HTMLButtonElement &&
        e.target.classList.contains("add")
      ) {
        this.setState({ items: [...items, `${items.length + 1}`] });
      }

      if (
        e.target instanceof HTMLButtonElement &&
        e.target.classList.contains("deleteBtn")
      ) {
        const delIdx = e.target.dataset["index"];
        items.splice(+delIdx! as number, 1);
        this.setState({ items });
      }
    });
  }
  render() {
    const template: string = `
    <ul>
      ${this.states.items
        .map(
          (item, index) => `
      <li>
      ${item}
      <button class="deleteBtn" data-index="${index}">삭제</button>
      </li>
      `
        )
        .join("")}
    </ul>
    <button class="add">추가하기</button>
    `;
    this.parent.innerHTML = template;
  }
}

new App(document.querySelector(".app")! as HTMLElement);
