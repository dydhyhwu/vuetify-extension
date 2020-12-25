import Loader from "./index.js";

export function Loading(msg) {
    return (target, name, descriptor) => {
        let func = descriptor.value;
        descriptor.value = async function() {
            let loadingId = Loader.Loading(msg);
            await func.apply(this, arguments);
            Loader.Close(loadingId);
        };
    };
}
