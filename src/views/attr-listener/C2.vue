<template>
    <div>
        <!-- 子组件通过$attrs和$listeners向更深层的组件通信 -->
        <c3 v-bind="$attrs" v-on="$listeners"></c3>
    </div>
</template>

<script>
import C3 from './C3'

export default {
    name: 'C2',
    props: ['prop'],
    mounted() {
        console.log(this.$attrs);
        // 触发事件
        this.$emit('tempfn');
    },
    components: {
        C3
    }
}
</script>

<style>

</style>