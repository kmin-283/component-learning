export interface ItemFilterProp {
  filterItem: (isFilter: number) => void;
}

export default class ItemFilter {
  constructor(private $target: HTMLElement, private $props: ItemFilterProp) {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  template() {
    return `
    <button class="filterBtn" data-is-filter="0">전체 보기</button>
    <button class="filterBtn" data-is-filter="1">활성 보기</button>
    <button class="filterBtn" data-is-filter="2">비활성 보기</button>
  `;
  }

  addEvent(eventType: string, selector: string, callback: EventListener) {
    const item = document.querySelector(selector);
    item?.addEventListener(eventType, callback);
  }

  setEvent() {
    const { filterItem } = this.$props;
    this.addEvent("click", "[data-component='item-filter']", (e) => {
      const target = e.target! as HTMLButtonElement;
      filterItem(Number(target.dataset["isFilter"]));
    });
  }
}
