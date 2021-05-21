import ItemAppender from "./components/itemAppender.js";
import Item, { ItemType } from "./components/item.js";
import ItemFilter from "./components/itemFilter.js";

type AppType = {
  isFilter: number;
  items: ItemType[];
};

interface Component {
  mounted: () => void;
  template: () => string;
  render: () => void;
  setState: (newState: AppType) => void;
}

export default class App implements Component {
  private $state: AppType;
  constructor(private $target: HTMLElement) {
    this.$state = {
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
    this.$target.innerHTML = this.template();
    this.render();
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    )! as HTMLElement;
    const $items = this.$target.querySelector(
      '[data-component="items"]'
    )! as HTMLElement;
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    )! as HTMLElement;

    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this),
    });
    new Item($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      (item: ItemType) =>
        (isFilter === 1 && item.active) ||
        (isFilter === 2 && !item.active) ||
        isFilter === 0
    );
  }

  addItem(content: string) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({
      ...this.$state,
      items: [...items, { seq, content, active }],
    });
  }

  deleteItem(seq: number) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ ...this.$state, items });
  }

  toggleItem(seq: number) {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);
    const item = items[index]! as ItemType;
    item.active = !item.active;
    this.setState({ ...this.$state, items });
  }

  filterItem(isFilter: number) {
    this.setState({ ...this.$state, isFilter });
  }

  setState(nextState: AppType) {
    this.$state = nextState;
    this.render();
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}

new App(document.querySelector(".app")! as HTMLElement);
