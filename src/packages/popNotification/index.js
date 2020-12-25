import MessageComponent from './main';

export default class PopNotification {
    static _instances = [];
    static _zIndex = 2000;
    static _seed = 0;
    static _messageBaseOffset = 20;
    static _messageSpace = 15;

    static _messageConstructor = null;
    static _vuetify = null;

    static init(vue, vuetify) {
        PopNotification._messageConstructor = vue.extend(MessageComponent);
        PopNotification._vuetify = vuetify;
    }

    static notify(options) {
        let instance = PopNotification._create(options);
        PopNotification._instances.push(instance);
    }

    static success(text, options) {
        PopNotification.notify({ ...options, message: text, color: 'success' });
    }

    static error(text, options) {
        PopNotification.notify({ ...options, message: text, color: 'error' });
    }

    static primary(text, options) {
        PopNotification.notify({ ...options, message: text, color: 'primary' });
    }

    static warn(text, options) {
        PopNotification.notify({ ...options, message: text, color: 'warning' });
    }

    static _generateId() {
        PopNotification._seed += 1;
        return `custom_message_pop_${PopNotification._seed}`;
    }

    static _close(id) {
        let removeElement = PopNotification._remove(id);
        PopNotification._reorderInstances(removeElement);
    }

    static _create(options) {
        let id = PopNotification._generateId();
        options.onClose = function() {
            PopNotification._close(id);
        };

        let instance = new PopNotification._messageConstructor({
            vuetify: PopNotification._vuetify,
            data: options,
        });
        instance.id = id;
        instance.$mount();
        document.getElementById('app').appendChild(instance.$el);

        PopNotification._pushInstance(instance);

        return instance;
    }

    static _remove(id) {
        let len = PopNotification._instances.length;
        for (let index = 0; index < len; index++) {
            let instance = PopNotification._instances[index];
            if (instance.id === id) {
                PopNotification._instances.splice(index, 1);
                return {
                    index: index,
                    offsetHeight: instance.$el.offsetHeight,
                    vertical: instance.vertical,
                    horizontal: instance.horizontal,
                };
            }
        }
        return null;
    }

    static _reorderInstances(removeInstance) {
        let len = PopNotification._instances.length;

        for (let index = removeInstance.index; index < len; index++) {
            let popInstance = PopNotification._instances[index];
            let vertical = popInstance.vertical;

            if (!PopNotification._isSamePosition(removeInstance, popInstance))
                continue;

            let offsetHeight =
                parseInt(popInstance.$el.style[vertical], 10) -
                removeInstance.offsetHeight -
                PopNotification._messageSpace;
            popInstance.$el.style[vertical] = `${offsetHeight}px`;
        }
    }

    static _isSamePosition(source, other) {
        return (
            source.vertical === other.vertical &&
            source.horizontal === other.horizontal
        );
    }

    static _pushInstance(instance) {
        let verticalOffset = PopNotification._messageBaseOffset;
        PopNotification._instances
            .filter(x => PopNotification._isSamePosition(instance, x))
            .forEach(
                item =>
                    (verticalOffset +=
                        item.$el.offsetHeight + PopNotification._messageSpace)
            );
        instance.verticalOffset = verticalOffset;
        instance.$el.style.zIndex = PopNotification._zIndex;
    }
}
