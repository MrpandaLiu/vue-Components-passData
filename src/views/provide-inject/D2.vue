<template>
    <div :style="{ color: theme.color }">
        hhh
    </div>
</template>

<script>
export default {
    name: 'D2',
    inject: {
        // 接收对象
        theme: {
            default: () => ({})
        }
    },
    mounted() {
        console.log(this.theme);
    }
}
</script>

<style>

</style>