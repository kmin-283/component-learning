export interface AppenderProp {
  addItem: (value: string) => void;
}

export default class ItemAppender {
  constructor(private $target: HTMLElement, private $props: AppenderProp) {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  addEvent(eventType: string, selector: string, callback: EventListener) {
    const appender = document.querySelector(selector)! as HTMLInputElement;
    appender.addEventListener(eventType, callback);
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent("keyup", ".appender", (e) => {
      const event = e! as KeyboardEvent;
      const key = event.key;
      const target = event.target! as HTMLInputElement;
      if (key !== "Enter") return;
      addItem(target.value);
    });
  }
}
