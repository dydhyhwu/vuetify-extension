import MessageComponent from "./main";

export default class Notification {
  static _instances = [];
  static _zIndex = 2000;
  static _seed = 0;
  static _messageBaseOffset = 20;
  static _messageSpace = 15;
  static _messageConstructor = null;
  static _vuetify = null;

  static init(vue, vuetify) {
    Notification._messageConstructor = vue.extend(MessageComponent);
    Notification._vuetify = vuetify;
  }

  static notify(options) {
    const instance = Notification._create(options);
    Notification._instances.push(instance);
  }

  static success(text) {
    Notification.notify({ message: text, color: "success" });
  }

  static error(text) {
    Notification.notify({ message: text, color: "error" });
  }

  static primary(text) {
    Notification.notify({ message: text, color: "primary" });
  }

  static warn(text) {
    Notification.notify({ message: text, color: "warning" });
  }

  static _generateId() {
    Notification._seed += 1;
    return `custom_message_alter_${Notification._seed}`;
  }

  static _close(id) {
    const removeElement = Notification._remove(id);
    Notification._reorderInstances(removeElement);
  }

  static _create(options) {
    const id = Notification._generateId();
    options.onClose = function() {
      Notification._close(id);
    };

    const instance = new Notification._messageConstructor({
      vuetify: Notification._vuetify,
      data: options
    });
    instance.id = id;
    instance.$mount();
    document.getElementById("app").appendChild(instance.$el);

    Notification._pushInstance(instance);

    return instance;
  }

  static _remove(id) {
    const len = Notification._instances.length;
    for (let index = 0; index < len; index++) {
      const instance = Notification._instances[index];
      if (instance.id === id) {
        Notification._instances.splice(index, 1);
        instance.removeElement();
        return {
          index: index,
          offsetHeight: instance.$el.offsetHeight
        };
      }
    }
    return null;
  }

  static _reorderInstances(removeInstance) {
    const len = Notification._instances.length;

    for (let index = removeInstance.index; index < len; index++) {
      const popInstance = Notification._instances[index];
      const offsetHeight =
        parseInt(popInstance.$el.style["top"], 10) -
        removeInstance.offsetHeight -
        Notification._messageSpace;
      popInstance.$el.style["top"] = `${offsetHeight}px`;
    }
  }

  static _pushInstance(instance) {
    let verticalOffset = Notification._messageBaseOffset;
    Notification._instances.forEach(
      item =>
        (verticalOffset += item.$el.offsetHeight + Notification._messageSpace)
    );
    instance.verticalOffset = verticalOffset;
    instance.$el.style.zIndex = Notification._zIndex;
  }
}
