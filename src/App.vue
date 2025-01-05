<template>
  <div id="app">
    <!-- Render the tree -->
    <tree :groups="groups" />
  </div>
</template>

<script> 
import { useStore } from 'vuex';
import Tree from './components/HospitalTree.vue';

export default {
  name: 'App',
  components: {
    Tree
  },
  setup() {
    const store = useStore();
    const groups = store?.state.groups;

    return {
      groups
    };
  }
};
</script>
