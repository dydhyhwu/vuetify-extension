import Component from './main';

export default class Loader {
    static _instances = [];
    static _seed = 1;

    static _messageConstructor = null;
    static _vuetify = null;

    static init(vue, vuetify) {
        Loader._messageConstructor = vue.extend(Component);
        Loader._vuetify = vuetify;
    }

    static Loading(text, options) {
        return Loader.Create({
            text,
            ...options,
        }).id;
    }

    static Create(options) {
        return Loader._create(options);
    }

    static Close(id) {
        for (let index = 0; index < Loader._instances.length; index++) {
            let instance = Loader._instances[index];
            if (instance.id === id) {
                instance.Close();
                Loader._instances.splice(index, 1);
                return;
            }
        }
    }

    static CloseAll() {
        for (let index = 0; index < Loader._instances.length; index++) {
            let instance = Loader._instances[index];
            instance.Close();
        }
        Loader._instances = [];
    }

    static _create(options) {
        let id = Loader._generateId();
        let instance = new Loader._messageConstructor({
            vuetify: Loader._vuetify,
            data: options,
        });
        instance.id = id;
        instance.$mount();
        document.getElementById('app').appendChild(instance.$el);
        Loader._instances.push(instance);
        return instance;
    }

    static _generateId() {
        Loader._seed += 1;
        return `custom_loader_${Loader._seed}`;
    }
}
