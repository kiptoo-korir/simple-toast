class SimpleToast {
  constructor({ duration = 6000, position = "top-right" } = {}) {
    this.errArray = ["", null, undefined];
    this.positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

    this.duration = duration < 0 ? 6000 : duration;
    this.position = this.positions.includes(position) ? position : "top-right";

    this.initialize();
  }

  #checkForContainer() {
    let containerElement = document.getElementById("simple_toast_container");
    return containerElement ? true : false;
  }

  initialize() {
    if (this.#checkForContainer()) {
      document.removeChild(document.getElementById("simple_toast_container"));
    }
    let newContainerElement = document.createElement("div");
    newContainerElement.classList.add("toast-container", this.position);
    newContainerElement.id = "simple_toast_container";
    document.body.append(newContainerElement);
  }

  toast(message, variant) {
    !this.#checkForContainer() ? this.initialize() : "";
    let toastClass = this.#getToastClass(variant);
    let newToast = document.createElement("div");
    let newToastId = Date.now() + this.#randomIdGenerator();
    newToast.id = newToastId;
    newToast.classList.add(toastClass, "toast", "toast-notification");
    let newToastBody = document.createElement("div");
    newToastBody.innerHTML = message;
    newToastBody.classList.add("toast-body");
    newToast.append(newToastBody);
    let topToastChild = document.getElementById("simple_toast_container")
      .children[0];
    if (this.errArray.includes(topToastChild)) {
      document.getElementById("simple_toast_container").append(newToast);
    } else {
      document
        .getElementById("simple_toast_container")
        .insertBefore(newToast, topToastChild);
    }

    setTimeout(() => {
      newToast.style.opacity = 1;
    }, 20);

    setTimeout(() => {
      newToast.style.opacity = 0;
    }, this.duration);

    setTimeout(() => {
      let nodeToRemove = document.getElementById(newToastId);
      nodeToRemove.parentNode.removeChild(nodeToRemove);
    }, this.duration + 500);
  }

  #getToastClass(variant) {
    let toastClass =
      variant == "success"
        ? "toast-success"
        : variant == "error"
        ? "toast-error"
        : variant == "warning"
        ? "toast-warning"
        : variant == "info"
        ? "toast-info"
        : "toast-info";

    return toastClass;
  }

  #randomIdGenerator() {
    return Math.random().toString(16).substring(2, 4);
  }
}
