<template>
  <div>
      <h1>1.通过props/$emit通信</h1>
      <test-a></test-a>
      <h1>2.通过EventBus进行通信</h1>
      <test-b1></test-b1>
      <test-b2></test-b2>
      <h1>3.通过$attr/$listener进行通信</h1>
      <test-c></test-c>
      <h1>4.通过provide和inject进行通信</h1>
      <test-d></test-d>
      <h1>5.通过parent和children进行通信</h1>
      <test-e></test-e>
      <h1>6.通过vuex进行通信</h1>
      <test-f></test-f>
  </div>
</template>

<script>
import TestA from './props-$emit/A1';
import TestB1 from './eventBus/B1';
import TestB2 from './eventBus/B2';
import TestC from './attr-listener/C1';
import TestD from './provide-inject/D1';
import TestE from './parent-children/E1';
import TestF from './vuex/F1';

export default {
    name: 'Show',
    components: {
        TestA,
        TestB1,
        TestB2,
        TestC,
        TestD,
        TestE,
        TestF
    }
}
</script>

<style>

</style>