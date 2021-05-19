type ItemType = {
  seq: number;
  content: string;
  active: boolean;
};

type AppType = {
  isFilter: number;
  items: ItemType[];
};

class App {
  private states: AppType;
  constructor(private parent: HTMLElement) {
    this.states = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          content: "1",
          active: false,
        },
        {
          seq: 2,
          content: "2",
          active: true,
        },
      ],
    };
    this.setEvent();
    this.render();
  }

  get filteredItems() {
    const { isFilter, items } = this.states;
    return items.filter(
      (item: ItemType) =>
        (isFilter === 1 && item.active) ||
        (isFilter === 2 && !item.active) ||
        isFilter === 0
    );
  }

  setState(nextState: AppType) {
    this.states = nextState;
    this.render();
  }
  setEvent() {
    this.parent.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key !== "Enter") {
        return;
      }
      const target = e.target! as HTMLInputElement;
      if (!target.classList.contains("appender")) {
        return;
      }
      const { items } = this.states;
      const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
      const { value } = target;
      const active = false;
      this.setState({
        ...this.states,
        items: [...items, { seq, content: value, active }],
      });
    });
    this.parent.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }
      const target = e.target! as HTMLButtonElement;
      const items = [...this.states.items];
      if (target.classList.contains("toggleBtn")) {
        const closest = target.closest("[data-seq]")! as HTMLLIElement;
        const seq = Number(closest.dataset["seq"]);
        const index = items.findIndex((v) => v.seq === seq);
        items[index]!.active = !items[index]?.active;
        this.setState({ ...this.states, items });
      } else if (target.classList.contains("deleteBtn")) {
        const closest = target.closest("[data-seq]")! as HTMLLIElement;
        const seq = Number(closest.dataset["seq"]);
        items.splice(
          items.findIndex((v) => v.seq === seq),
          1
        );
        this.setState({ ...this.states, items });
      } else if (target.classList.contains("filterBtn")) {
        const seq = Number(target.dataset["isFilter"]);
        console.log(seq);
        this.setState({ ...this.states, isFilter: Number(seq) });
      } else {
        return;
      }
    });
  }
  render() {
    const template: string = `
    <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems
            .map(
              ({ content, active, seq }) => `
            <li data-seq="${seq}">
              ${content}
              <button class="toggleBtn" style="color: ${
                active ? "#09F" : "#F09"
              }">
                ${active ? "활성" : "비활성"}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `
            )
            .join("")}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `;
    this.parent.innerHTML = template;
  }
}

new App(document.querySelector(".app")! as HTMLElement);
