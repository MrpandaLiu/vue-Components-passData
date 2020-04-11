<template>
    <div>
        <!-- 获取从上一级组件传递的数据 -->
        {{ $attrs.temp }}
    </div>
</template>

<script>
export default {
    name: 'C3',
    mounted() {
        // 触发事件
        this.$emit('tempfn');
    }
}
</script>

<style>

</style>