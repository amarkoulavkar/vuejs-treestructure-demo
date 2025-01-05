import { createStore } from 'vuex';

export const store = createStore({
  state: {
    groups: [
      {
        id: 1,
        name: 'Hospital A',
        level: 0,
        children: [
          {
            id: 3,
            name: 'Shoulder',
            children: [],
            collapsed: false,
            level: 1,
          },
          {
            id: 4,
            name: 'Knee',
            children: [],
            collapsed: false,
            level: 1,
          },
          {
            id: 4,
            name: 'Stomack',
            children: [
              
            ],
            collapsed: false,
            level: 1,
          }
        ],
        collapsed: false
      },
      {
        id: 2,
        name: 'Hospital B',
        children: [
        
        ],
        collapsed: false,
        level: 0
      }
    ]
  },
  mutations: {
    addNewGroup(state, { parentId, name }) {
      const parent = findGroupById(state.groups, parentId);
      if (parent) {
        const newGroup = { id: Date.now(), name, children: [], collapsed: false };
        parent.children.push(newGroup);
      }
    },
    editGroup(state, { id, name }) {
      const group = findGroupById(state.groups, id);
      if (group) {
        group.name = name;
      }
    },
    deleteGroup(state, id) {
      const parentGroup = findParentGroup(state.groups, id);
      if (parentGroup) {
        const groupIndex = parentGroup.children.findIndex(group => group.id === id);
        if (groupIndex !== -1) {
          parentGroup.children.splice(groupIndex, 1);
        }
      }
    }
  },
  actions: {
    addNewGroup({ commit }, payload) {
      commit('addNewGroup', payload);
    },
    editGroup({ commit }, payload) {

      commit('editGroup', payload);
    },
    deleteGroup({ commit }, id) {
      commit('deleteGroup', id);

    }
  }
});

function findGroupById(groups, id) {
  for (let group of groups) {
    if (group.id === id) return group;
    const foundInChildren = findGroupById(group.children, id);
    if (foundInChildren) return foundInChildren;
  }
  
  return null;
}

function findParentGroup(groups, id) {
  for (let group of groups) {
    const child = group.children.find(c => c.id === id);
    if (child) return group;
    const foundInChildren = findParentGroup(group.children, id);

    if (foundInChildren) return foundInChildren;
  }
  return null;
}
