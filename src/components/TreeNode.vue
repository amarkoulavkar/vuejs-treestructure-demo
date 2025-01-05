<template>
  <ul class="list-group p-0 pb-2">
    <li class="list-group-item " v-for="group in groups" :key="group.id" @node-click="onNodeClick">
      <div   :class="group.children && group.children.length ? 'pb-2' : ''">
        <!---- Toggle Collapse  Icon ------->
  
        <i  v-if="group.children && group.children.length"
          class="fa-regular me-3" 
          :class="group.collapsed ? 'fa-square-plus' : 'fa-square-minus'" 
          @click="toggleTreeCollapse(group)"
        ></i>

        <span >
        <i  v-if="group.level === 0" class="fa-regular fa-hospital pe-2"></i>
       <i v-if="group.level !== 0" class="fa-regular fa-circle-user pe-2"></i>
          

            {{ group.name }}
        </span>
    
        
      

        <!----------- Context Menu Button ------>
        <button @click="toggleContextMenu(group.id)" class="ps-3 border-0 bg-transparent" ><i class="fa-solid fa-ellipsis-vertical p-0"></i></button>

       
         <!---------- Context menu ------------->
      <div  v-if="activeGroupId === group.id && contextMenuVisible" class="context-menu">
      <ul class="context-menu-list">
        <li @click="addChildGroup(group.id)" class="d-flex align-content-center align-items-center px-0"><i class="fa-solid fa-plus me-3"></i> Create Child Group</li>
        <li @click="editGroup(group.id)" class="d-flex align-content-center align-items-center px-0"><i class="fa-solid fa-pencil me-3"></i>Edit Group</li>
        <li  @click="deleteGroup(group.id)" class="d-flex align-content-center align-items-center px-0"><i class="fa-solid fa-trash me-3"></i> <span>Remove Group</span></li>
     
      </ul>
    </div>
      </div>

     
      <div v-if="!group.collapsed">
        <!-- Recursively render children -->
        <tree-node v-if="group.children && group.children.length" :groups="group.children" />
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
 import { onMounted, onUnmounted } from 'vue';

export default {
  name: 'TreeNode',
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  setup() {
    const store = useStore();
    const activeGroupId = ref(null);
    const contextMenuVisible = ref(false);  // State to control context menu visibility


onMounted(() => {
  const closeContextMenu = (event) => {
    if (!event.target.closest('.context-menu') && !event.target.closest('button')) {
      contextMenuVisible.value = false;
      activeGroupId.value = null;
    }
  };
  
  document.addEventListener('click', closeContextMenu);

  onUnmounted(() => {
    document.removeEventListener('click', closeContextMenu);
  });



});


    // Show/hide the context menu
    const toggleContextMenu = (id) => {
      
      if (activeGroupId.value === id) {
        // If  open close it
        contextMenuVisible.value = !contextMenuVisible.value;
      } else {
        //open the context menu for the selected group
        activeGroupId.value = id;
        contextMenuVisible.value = true;
      }
    };

    // add new group
    const addChildGroup = (parentId) => {
      contextMenuVisible.value = false;
      const groupName = prompt('Enter new group name:');
      if (groupName) {
        store.dispatch('addNewGroup', { parentId, name: groupName });
      }
    };

    // Edit group
    const editGroup = (id) => {
       contextMenuVisible.value = false;
      const groupName = prompt('Enter new name for the group:');
      if (groupName) {
        store.dispatch('editGroup', { id, name: groupName });
      }
    };

    const onNodeClick = (id) => {
    this.$emit('node-click', id);  
  };
 

    // Delete group
    const deleteGroup = (id) => {
      if (confirm('Are you sure you want to delete this group?')) {
        store.dispatch('deleteGroup', id);
      }
    };

    // expand node
    const toggleTreeCollapse = (group) => {
      group.collapsed = !group.collapsed;
    };

    return {
      activeGroupId,
      contextMenuVisible,
      toggleContextMenu,  
      addChildGroup,
      editGroup,
      deleteGroup,
      onNodeClick,
      toggleTreeCollapse,  
    };
  }
};
</script>

<style scoped>
.context-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 10;   
}
 
.context-menu {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  z-index: 1000;
}

.context-menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.context-menu-list li {
  padding: 8px 16px;
  cursor: pointer;
}

.context-menu-list li:hover {
  background-color: #f0f0f0;
}

.tree-node {
  list-style-type: none;
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

.tree-node .children > .tree-node::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -18px;
  width: 2px;
  height: 10px;
  background-color: #ccc;
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
</style>
