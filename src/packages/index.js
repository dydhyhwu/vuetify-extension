import ConfirmDialog from "@/packages/confirm";
import Loader from "@/packages/loader";
import Notification from "@/packages/notification";
import PopNotification from "@/packages/popNotification";

export default function install(vue, vuetify) {
    ConfirmDialog.init(vue, vuetify);
    Loader.init(vue, vuetify);
    Notification.init(vue, vuetify);
    PopNotification.init(vue, vuetify);
}
