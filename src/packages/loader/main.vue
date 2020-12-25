<template>
    <v-overlay :value="loading" :z-index="zIndex">
        <v-row justify="center" align="center">
            <v-progress-circular
                :size="size"
                :width="width"
                :color="color"
                class="mb-4"
                indeterminate
            ></v-progress-circular>
        </v-row>
        <v-row justify="center" align="center">
            <p>{{ text }}</p>
        </v-row>
    </v-overlay>
</template>

<script>
    export default {
        methods: {
            Close() {
                this.loading = false;
                this.removeElement();
            },

            removeElement() {
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
        },
        data() {
            return {
                text: '加载中',
                size: 100,
                width: 8,
                color: '#fff',
                loading: true,
                zIndex: 5,
            };
        },
    };
</script>
