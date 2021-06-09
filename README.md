# vuetify-extension

项目基于**vueitfy**UI库，参考**ElementUI**类库并实现了其中常用的`弹框`、`确认框`、`加载框`、`提示框`工具类。而且提供了相对应的**装饰器**供大家更灵活的使用！

## 安装
```
npm i vuetify-extension
```

### 初始化
```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import install from "vuetify-extension";

Vue.config.productionTip = false;

// 使用install方法将Vue与vuetify注入至库中，以确保和项目中保持一致。
install(Vue, vuetify);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

```

### 使用

目前有4个工具类、1个api、3个装饰器。

api：

- [`install(vue, vuetify)`](#install)

class:

- [`Loader`](#Loader)
- [`Notification`](#Notification)
- [`ConfirmDialog`](#ConfirmDialog)
- [`PopNotification`](#PopNotification)

decorators:

- [`Loading`](#Loading)
- [`Confirm`](#Confirm)
- [`Notice`](#Notice)



### <a id="install"></a>install(vue, vuetify)

初始化扩展库，将vue,vueitfy 注入进库中。保证库的行为与项目一致。

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import install from "vuetify-extension";

Vue.config.productionTip = false;

// 使用install方法将Vue与vuetify注入至库中，以确保和项目中保持一致。
install(Vue, vuetify);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
```



### <a id="Loader"></a>Loader

```typescript
class Loader {
    static Loading(text: string, options?: object): string;
    static Close(id: string);
    static CloseAll();
}
```

#### Loading

开启一个遮罩层

| 参数名  | 类型    | 说明             | 必需 |
| ------- | ------- | ---------------- | ---- |
| text    | string  | 加载中显示的文字 | 是   |
| options | object? | 配置项           | 否   |

配置项结构：

| 属性   | 类型   | 说明                        | 默认值   |
| ------ | ------ | --------------------------- | -------- |
| text   | string | 遮罩层的文字                | '加载中' |
| size   | int    | `v-progress-circular`的属性 | 100      |
| width  | int    | `v-progress-circular`的属性 | 8        |
| color  | string | `v-progress-circular`的属性 | '#fff'   |
| zIndex | int    | 遮罩层的`z-index`           | 5        |



| 返回值类型 | 说明                         |
| ---------- | ---------------------------- |
| string     | 此次遮罩层的id，用于手动关闭 |

#### Close

关闭一个遮罩层

| 参数名 | 类型   | 说明       | 必需 |
| ------ | ------ | ---------- | ---- |
| id     | string | 遮罩层的Id | 是   |

#### CloseAll

关闭所有遮罩层

### <a id="Notification"></a>Notification

```typescript
class Notification {
    static notify(options: any);
    static success(text: string);
    static error(text: string);
    static primary(text: string);
    static warn(text: string);
}
```

#### notify

弹出提示框

| 参数名  | 类型   | 说明   | 必需 |
| ------- | ------ | ------ | ---- |
| options | object | 配置项 | 是   |

配置项结构：

| 属性      | 类型    | 说明                           | 默认值 |
| --------- | ------- | ------------------------------ | ------ |
| message   | string  | 提示框文字                     | ''     |
| duration  | int     | `v-snackbar`的属性，显示多少秒 | 3000   |
| closeable | boolean | 是否显示关闭的按钮             | false  |
| color     | string  | `v-snackbar`的属性             | ''     |

#### success

弹出提示框，颜色跟随主题的`success`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |

#### error

弹出提示框，颜色跟随主题的`error`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |

#### primary

弹出提示框，颜色跟随主题的`primary`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |

#### warn

弹出提示框，颜色跟随主题的`warn`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |

### <a id="ConfirmDialog"></a>ConfirmDialog

```typescript
class ConfirmDialog{
    static Confirm(title: string, context: string, yesText: string, noText: string): Promise<any>;
}
```

#### Confirm

弹出确认框

| 参数名  | 类型   | 说明                         | 必需 |
| ------- | ------ | ---------------------------- | ---- |
| title   | string | 确认框的标题                 | 是   |
| context | string | 确认框的文本                 | 是   |
| yesText | string | 确认按钮的文字 | 是   |
| noText  | string | 取消按钮的文字） | 是   |

### <a id="PopNotification"></a>PopNotification

```typescript
class PopNotification{
    static notify(options: object);
    static success(text: string, options?: object);
    static error(text: string, options?: object);
    static primary(text: string, options?: object);
    static warn(text: string, options?: object);
}
```

#### notify

弹出提示框

| 参数名  | 类型   | 说明   | 必需 |
| ------- | ------ | ------ | ---- |
| options | object | 配置项 | 是   |

配置项结构：

| 属性       | 类型   | 说明           | 默认值  |
| ---------- | ------ | -------------- | ------- |
| message    | string | 提示框文字     | ''      |
| width      | string | 提示框宽度     | '300px' |
| height     | string | 提示框高度     | '180px' |
| color      | string | 标题的背景色   | ''      |
| title      |        |                |         |
| titleColor | string | 标题的文字颜色 | 'white' |
| horizontal | string | 水平方向位置   | 'left'  |
| vertical   | string | 垂直方向位置   | 'top'   |

#### success

弹出提示框，颜色跟随主题的`success`

| 参数名  | 类型   | 说明     | 必需 |
| ------- | ------ | -------- | ---- |
| text    | string | 提示内容 | 是   |
| options | object | 配置项   | 否   |

#### error

弹出提示框，颜色跟随主题的`error`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |
| options | object | 配置项   | 否   |

#### primary

弹出提示框，颜色跟随主题的`primary`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |
| options | object | 配置项   | 否   |

#### warn

弹出提示框，颜色跟随主题的`warn`

| 参数名 | 类型   | 说明     | 必需 |
| ------ | ------ | -------- | ---- |
| text   | string | 提示内容 | 是   |
| options | object | 配置项   | 否   |

### <a id="Loading"></a> Loading

加载遮罩层的装饰器。

在函数执行前打开遮罩，并在函数结束后关闭遮罩。

**在函数执行出现异常时，也将会自动关闭遮罩**

| 参数名 | 类型   | 说明       |
| ------ | ------ | ---------- |
| msg    | string | 遮罩层文字 |

### <a id="Confirm"></a> Confirm

确认框的装饰器。

在函数执行前弹出确认框，只有确认才可以进行函数中。

| 参数名  | 类型   | 说明                         | 必需 |
| ------- | ------ | ---------------------------- | ---- |
| title   | string | 确认框的标题                 | 是   |
| context | string | 确认框的文本                 | 是   |
| yesText | string | 确认按钮的文字（默认为“是”） | 否   |
| noText  | string | 取消按钮的文字（默认为“否”） | 否   |



### <a id="Notice"></a> Notice

提示框的装饰器。

在函数执行成功后，将弹出设置的成功提示信息，否则将弹出设置的失败提示信息。

| 参数名     | 类型   | 说明                     | 必须 |
| ---------- | ------ | ------------------------ | ---- |
| successMsg | string | 函数执行成功时的提示信息 | 是   |
| errorMsg   | string | 函数执行失败时的提示信息 | 否   |



## 计划

- [ ] typescript重构
- [ ] 加入`VNode`与`html`片段的内容支持
- [ ] 回补单元测试

## 关于

halo, 我是若羽，如果这个库能对你有所帮助那是最好的。
如果使用过程中有什么问题欢迎随意提出`issues`，或者直接邮箱联系。

欢迎大家贡献代码，不断完善它。

## License

MIT License