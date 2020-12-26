declare module "vuetify-extension" {
    export default function install(vue: any, vuetify: any);
    export class Notification {
        static notify(options: any);
        static success(text: string);
        static error(text: string);
        static primary(text: string);
        static warn(text: string);
    }

    export class Loader{
        static Loading(text: string, options?: object): string;
        static Close(id: string);
        static CloseAll();
    }

    export class ConfirmDialog{
        static Confirm(title: string, context: string, yesText: string, noText: string): Promise<any>;
    }

    export class PopNotification{
        static notify(options: object);
        static success(text: string, options?: object);
        static error(text: string, options?: object);
        static primary(text: string, options?: object);
        static warn(text: string, options?: object);
    }

    export function Loading(text: string);

    export function Confirm(title: string, context: string, yesText: string, noText: string);

    export function Notice(successMsg: string, errMsg?: string);
}
