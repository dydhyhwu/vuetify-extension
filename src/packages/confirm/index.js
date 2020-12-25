import Component from './main';

export default class ConfirmDialog {
    _instance = null;
    _options = {};

    static _messageConstructor = null;
    static _vuetify = null;

    static init(vue, vuetify) {
        ConfirmDialog._messageConstructor = vue.extend(Component);
        ConfirmDialog._vuetify = vuetify;
    }

    constructor(options) {
        this._options = options;
        this._instance = new ConfirmDialog._messageConstructor({
            vuetify: ConfirmDialog._vuetify,
            data: this._options,
        });
        this._instance.$mount();
        document.getElementById('app').appendChild(this._instance.$el);
    }

    Show() {
        return new Promise((resolve, reject) => {
            this._instance.OnConfirm = () => {
                this._instance.Hide();
                this._instance.RemoveElement();
                resolve();
            };
            this._instance.OnCancel = () => {
                this._instance.Hide();
                this._instance.RemoveElement();
                reject();
            };
            this._instance.Show();
        });
    }

    static Create(options) {
        return new ConfirmDialog(options);
    }

    static Confirm(title, content,yesText,noText) {
        let instance = ConfirmDialog.Create({
            title: title,
            content: content,
            yesText:yesText,
            noText:noText
        });
        return instance.Show();
    }
}
