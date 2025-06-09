import './style.css';
class Main {
  hashInput!: HTMLInputElement;
  hashResult!: HTMLElement;

  set hashedValue(v: string) {
    if (this.hashResult) {
      this.hashSHA256(v).then(r => {
        this.hashResult.innerHTML = r;
      });
    }
  }

  constructor() {
    this.init();
  }

  init() {
    this.domInit();
    this.domEventsInit();
  }

  domInit() {
    this.hashInput = document.querySelector('#hash-input') as HTMLInputElement;
    this.hashResult = document.querySelector('#result') as HTMLElement;
  }

  domEventsInit() {
    this.hashInput.addEventListener('keyup', () => {
      setTimeout(() => {
        this.hashedValue = this.hashInput.value;
      }, 250);
    });

    this.hashResult.addEventListener('click', () => {
      const val = this.hashResult.innerHTML;
      navigator.clipboard.writeText(val);
    });
  }

  async hashSHA256(message: string) {
    // Encode the message as a Uint8Array. TextEncoder is the standard way to do this.
    const msgUint8 = new TextEncoder().encode(message);

    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);

    // Convert ArrayBuffer to Array of bytes
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Convert bytes to hexadecimal string
    const hexHash = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return hexHash;
  }
}

(async () => {
  new Main();
})();
