import ConfirmDialog from "./index";

export function Confirm(title, content, yesText = '是', noText = '否') {
    return (target, name, descriptor) => {
        let func = descriptor.value;
        descriptor.value = async function(...args) {
            try {
                await ConfirmDialog.Confirm(title, content, yesText, noText);
                await func.apply(this, args);
                // eslint-disable-next-line no-empty
            } catch (e) {

            }
        }
    };
}
