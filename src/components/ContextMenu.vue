<template>
  <div class="context-menu">
    <button @click="edit">Edit</button>
    <button @click="createChildGroup">Create Child Group</button>
    <button @click="deleteGroup">Delete</button>
  </div>
  
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    node: Object,
  },
  methods: {
    edit() {
      const newName = prompt('Enter new group name:', this.node.name);
      if (newName) {
        this.$emit('edit', newName);
      }
    },
    createChildGroup() {
      const newName = prompt('Enter child group name:', this.node.name);
      if (newName) {
        this.$emit('createChildGroup', newName);
      }
    },
    deleteGroup() {
      if (confirm('Are you sure you want to delete this group?')) {
        this.$emit('delete');
      }
    },
    onNodeClick(id) {
      this.$emit('node-click', id);  
    },
   
  },
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 5px;
}
</style>
