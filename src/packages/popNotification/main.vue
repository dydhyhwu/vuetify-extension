<template>
    <v-expand-transition>
        <v-card
            v-show="visible"
            class="pop-message"
            :class="[this.horizontal]"
            :style="positionStyle"
            :width="width"
            :height="height"
            outlined
        >
            <v-card-actions :class="[color, titleTextClass]">
                {{ title }}
                <v-spacer></v-spacer>
                <v-btn small icon dark @click="close">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text>
                <strong>{{ message }}</strong>
            </v-card-text>
        </v-card>
    </v-expand-transition>
</template>

<script>
    export default {
        data() {
            return {
                width: '300px',
                height: '180px',
                message: '',
                color: '',
                title: '提示消息',
                titleColor: 'white',
                visible: true,
                horizontal: 'left',
                vertical: 'top',
                verticalOffset: 10,
                onClose: null,
            };
        },
        computed: {
            positionStyle() {
                return {
                    [this.vertical]: `${this.verticalOffset}px`,
                };
            },
            titleTextClass() {
                return `${this.titleColor}--text`;
            },
        },
        methods: {
            close() {
                this.visible = false;
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
                this.removeElement();
            },
            removeElement() {
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
        },
    };
</script>

<style scoped>
    .pop-message {
        position: fixed;
    }
    .right {
        right: 16px;
    }

    .left {
        left: 16px;
    }
</style>
