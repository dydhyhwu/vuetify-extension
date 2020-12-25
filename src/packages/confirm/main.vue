<template>
    <v-dialog :value="visibleDialog" max-width="300px" persistent>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>{{ content }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" depressed dark @click="confirm">
                    {{ yesText }}
                </v-btn>
                <v-btn color="error" depressed dark @click="cancel">
                    {{ noText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        methods: {
            confirm() {
                if (typeof this.OnConfirm === 'function') {
                    this.OnConfirm();
                }
            },
            cancel() {
                if (typeof this.OnCancel === 'function') {
                    this.OnCancel();
                }
            },
            Show() {
                this.visibleDialog = true;
            },
            Hide() {
                this.visibleDialog = false;
            },
            RemoveElement() {
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
        },
        data() {
            return {
                title: '提示',
                content: '',
                yesText: '确认',
                noText: '取消',
                visibleDialog: true,
                OnConfirm: null,
                OnCancel: null,
            };
        },
    };
</script>
