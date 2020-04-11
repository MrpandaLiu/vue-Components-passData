<template>
    <div>
        <c2 :temp="tempval" @tempfn="getVal" prop='$attrs不会传递child组件中定义的props值'></c2>
    </div>
</template>

<script>
import C2 from './C2'

export default {
    name: 'C1',
    data() {
        return {
            tempval: 'this is father'
        }
    },
    methods: {
        getVal() {
            this.tempval = this.tempval + ' ! ';
        }
    },
    components: {
        C2
    }
}
</script>

<style>

</style>