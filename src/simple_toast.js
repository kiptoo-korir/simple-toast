function SimpleToast() {
  var _this = this;
  this.errArray = ["", null, undefined];

  this.initialize = () => {
    if (!checkForContainer) {
      document.removeChild(document.getElementById("simple_toast_container"));
    }
    let newContainerElement = document.createElement("div");
    newContainerElement.classList.add("toast-container");
    newContainerElement.id = "simple_toast_container";
    document.body.append(newContainerElement);
  };

  function checkForContainer() {
    let containerElement = document.getElementById("simple_toast_container");
    return containerElement ? true : false;
  }

  this.toast = (message, variant) => {
    !checkForContainer ? init() : "";
    let toastClass = getToastClass(variant);
    let newToast = document.createElement("div");
    let newToastId = Date.now() + randomIdGenerator();
    newToast.id = newToastId;
    newToast.classList.add(
      toastClass,
      "toast",
      "toast-notification",
      "fade",
      "show"
    );
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
      let nodeToRemove = document.getElementById(newToastId);
      nodeToRemove.parentNode.removeChild(nodeToRemove);
    }, 6000);
  };

  function getToastClass(variant) {
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

  function randomIdGenerator() {
    return Math.random().toString(16).substr(2, 4);
  }
}

var simpleToast = new SimpleToast();
simpleToast.initialize();
