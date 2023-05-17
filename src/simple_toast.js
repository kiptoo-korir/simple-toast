class SimpleToast {
  constructor({ duration = 6000, position = "top-right" } = {}) {
    this.errArray = ["", null, undefined];
    this.positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

    this.duration = duration < 0 || isNaN(duration) ? 6000 : duration;
    this.position = this.positions.includes(position) ? position : "top-right";

    this.initialize();
  }

  #checkForContainer() {
    const containerElement = document.getElementById("simple-toast-container");
    return containerElement ? true : false;
  }

  initialize() {
    if (this.#checkForContainer()) {
      document.body.removeChild(
        document.getElementById("simple-toast-container")
      );
    }
    const newContainerElement = document.createElement("div");
    newContainerElement.classList.add("simple-toast-container", this.position);
    newContainerElement.id = "simple-toast-container";
    document.body.append(newContainerElement);
  }

  toast(message, variant) {
    !this.#checkForContainer() ? this.initialize() : "";
    const toastClass = this.#getToastClass(variant);
    const newToast = document.createElement("div");
    const newToastId = Date.now() + this.#randomIdGenerator();
    newToast.id = newToastId;
    newToast.classList.add(
      toastClass,
      "simple-toast",
      "simple-toast-notification"
    );
    const newToastBody = document.createElement("div");
    newToastBody.innerHTML = message;
    newToastBody.classList.add("simple-toast-body");
    newToast.append(newToastBody);
    const topToastChild = document.getElementById("simple-toast-container")
      .children[0];
    if (this.errArray.includes(topToastChild)) {
      document.getElementById("simple-toast-container").append(newToast);
    } else {
      document
        .getElementById("simple-toast-container")
        .insertBefore(newToast, topToastChild);
    }

    setTimeout(() => {
      newToast.style.opacity = 1;
    }, 20);

    setTimeout(() => {
      newToast.style.opacity = 0;
    }, this.duration);

    setTimeout(() => {
      const nodeToRemove = document.getElementById(newToastId);
      nodeToRemove.parentNode.removeChild(nodeToRemove);
    }, this.duration + 500);
  }

  #getToastClass(variant) {
    return variant === "success"
      ? "simple-toast-success"
      : variant === "error"
      ? "simple-toast-error"
      : variant === "warning"
      ? "simple-toast-warning"
      : variant === "info"
      ? "simple-toast-info"
      : "simple-toast-info";
  }

  #randomIdGenerator() {
    return Math.random().toString(16).substring(2, 4);
  }
}
