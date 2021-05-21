export type ItemType = {
  seq: number;
  content: string;
  active: boolean;
};

export interface ItemProp {
  filteredItems: ItemType[];
  deleteItem: (v: number) => void;
  toggleItem: (v: number) => void;
}

export default class Item {
  constructor(private $target: HTMLElement, private $props: ItemProp) {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems
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
    `;
  }

  addEvent(eventType: string, selector: string, callback: EventListener) {
    const item = document.querySelector(selector);
    item?.addEventListener(eventType, callback);
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent("click", "[data-component='items']", (e) => {
      const target = e.target! as HTMLButtonElement;
      const closest = target.closest("[data-seq]")! as HTMLElement;
      console.log(target, closest);
      if (target.classList.contains("deleteBtn")) {
        deleteItem(Number(closest.dataset["seq"]));
      } else if (target.classList.contains("toggleBtn")) {
        toggleItem(Number(closest.dataset["seq"]));
      }
    });
  }
}
