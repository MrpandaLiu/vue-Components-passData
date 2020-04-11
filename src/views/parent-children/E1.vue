<template>
    <div>
        <!-- 类似于DOM中的设置Id -->
        <e2 ref="child"></e2>
        <button @click="change">改变喵</button>
    </div>
</template>

<script>
import E2 from './E2';

export default {
    name: 'E1',
    methods: {
        change() {
            // 获取子组件实例
            const child = this.$refs.child;
            child.getName();
        }
    },
    components: {
        E2
    }
}
</script>

<style>

</style>