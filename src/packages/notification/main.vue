<template>
    <v-snackbar
        v-model="visible"
        :timeout="duration"
        :color="color"
        :style="positionStyle"
        @input="closeBar"
        top
    >
        {{ message }}
        <v-spacer></v-spacer>
        <v-btn v-if="closeable" icon dark @click="closeBar">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'message',
        data() {
            return {
                message: '',
                duration: 3000,
                color: '',
                closeable: false,
                visible: true,
                verticalOffset: 10,
                onClose: null,
            };
        },
        computed: {
            positionStyle() {
                return {
                    top: `${this.verticalOffset}px`,
                };
            },
        },
        methods: {
            closeBar() {
                this.visible = false;
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            },
          Close() {
            this.removeElement();
          },

          removeElement() {
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
          },
        },
    };
</script>
