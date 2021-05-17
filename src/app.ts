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
  }
  render() {
    const template: string = `
    <ul>
      ${this.states.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <button class="add">추가하기</button>
    `;
    this.parent.innerHTML = template;
    this.setEvent();
  }
}

new App(document.querySelector(".app")! as HTMLElement);
