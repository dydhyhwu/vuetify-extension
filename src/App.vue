<template>
  <v-app>
    <v-main>
      <div>
        <v-btn v-bind="btnProps" @click="confirm">confirm</v-btn>
        <v-btn v-bind="btnProps" @click="loader">loader</v-btn>
        <v-btn v-bind="btnProps" @click="notifier">notifier</v-btn>
        <v-btn v-bind="btnProps" @click="pop">pop</v-btn>
      </div>

      <div>
        <v-btn v-bind="btnProps" @click="confirmDecorator">confirmDecorator</v-btn>
        <v-btn v-bind="btnProps" @click="loaderDecorator">loaderDecorator</v-btn>
        <v-btn v-bind="btnProps" @click="notifierDecorator">notifierDecorator</v-btn>
      </div>

    </v-main>
  </v-app>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator';
import ConfirmDialog from "@/packages/confirm";
import Loader from "@/packages/loader";
import Notification from "@/packages/notification";
import PopNotification from "@/packages/popNotification";
import {Confirm} from "@/packages/confirm/decorator";
import {Loading} from "@/packages/loader/decorator";
import {Notice} from "@/packages/notification/decorator";

export default
@Component
class AppComponent extends Vue{
  confirm() {
    ConfirmDialog.Confirm('提示', '这是一段提示文字', '是', '否')
        .then(() => Notification.success('点击【是】'))
        .catch(() => Notification.error('点击【否】'));
  }

  @Confirm('提示(装饰器)','这是一段文字')
  async confirmDecorator() {

  }

  loader() {
    Loader.Loading('加载中');
  }

  @Loading('加载中')
  loaderDecorator() {}

  notifier() {
    Notification.success('提示信息');
  }

  @Notice('成功啦', '失败了！')
  notifierDecorator() {

  }

  pop() {
    PopNotification.success('这是一段提示信息', {
      horizontal: 'right',
      vertical: 'bottom'
    });
  }
  btnProps = {
    class: 'ma-2',
    color: 'primary',
  };
}
</script>
