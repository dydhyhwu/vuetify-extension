import Notification from "./index";
function IsValidException(e) {
    // TODO: 应该寻找一种更严谨且合理的判定方式
    return e;
}

export function Notice(successMsg, errorMsg) {
    return (target, name, descriptor) => {
        let func = descriptor.value;
        descriptor.value = async function(...args) {
            try {
                await func.apply(this, args);
                Notification.success(successMsg);
            } catch (e) {
                if (IsValidException(e) && errorMsg) {
                    Notification.error(errorMsg);
                }
                throw e;
            }
        };
    };
}
