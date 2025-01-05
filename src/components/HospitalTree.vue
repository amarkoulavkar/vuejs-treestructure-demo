<template>
 <div class="tree-container">
    <ul class="tree">
      <tree-node :groups="groups"  @node-click="handleNodeClick" />
    </ul>
  </div>
</template>

<script> 
import { useStore } from 'vuex';
import TreeNode from './TreeNode.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tree',
  components: { TreeNode },
  setup() {
    const store = useStore();

    // Get groups from store
    const groups = store?.state.groups;
    const handleNodeClick = (nodeId) => {
      this.$router.push({ name: 'GroupDetail', params: { id: nodeId } });
    }
    return {
      groups,
      handleNodeClick
    };
  }


};


</script>

<style scoped>
.tree-container {
  font-family: 'Arial', sans-serif;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tree {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.tree::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 2px;
  background-color: #ccc;
}

.tree-node {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-left: 20px;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.tree-node:hover {
  background-color: #e3f2fd;
  transform: translateX(5px);
}

.tree-node .icon {
  font-size: 18px;
  margin-right: 10px;
  color: #00796b;
}

.tree-node .expand-icon {
  font-size: 18px;
  margin-right: 15px;
  cursor: pointer;
}

.tree-node .node-label {
  font-size: 16px;
  color: #333;
}

.tree-node .children {
  padding-left: 15px;
  margin-top: 10px;
  position: relative;
}

.tree-node .children::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -18px;
  width: 2px;
  height: 10px;
  background-color: #ccc;
}

.tree-node .children > .tree-node::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -18px;
  width: 2px;
  height: 10px;
  background-color: #ccc;
}
</style>
