<template>
    <div>
        <d2></d2>
        <button @click="changeColor">改变颜色</button>
    </div>
</template>

<script>
import D2 from './D2';
import Vue from 'vue';

export default {
    name: 'D1',
    data() {
        return {
            color: 'blue'
        }
    },
    // 普通的provide返回的数据是不可响应的
    provide() {
        this.theme = Vue.observable({   // observable优化响应式
            color: this.color
        });
        return {
            theme: this.theme
        }
    },
    methods: {
        changeColor() {
            console.log(this.theme.color);
            this.theme.color = 'pink';
        }
    },
    components: {
        D2
    }
}
</script>

<style>

</style>