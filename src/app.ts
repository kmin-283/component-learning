type appType = {
  items: string[];
};

class App {
  private states: appType;
  constructor(private parent: HTMLElement) {
    this.states = {
      items: ["1", "2"],
    };
    this.render();
  }
  setState(nextState: appType) {
    this.states = nextState;
    this.render();
  }
  setEvent() {
    this.parent.querySelector(".add")?.addEventListener("click", () => {
      const { items } = this.states;
      this.setState({ items: [...items, `${items.length + 1}`] });
    });

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
    this.setEvent();
  }
}

new App(document.querySelector(".app")! as HTMLElement);
