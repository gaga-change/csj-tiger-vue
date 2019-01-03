import _  from 'lodash';
const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
    cachedViewsQuery:[]
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)){
        state.visitedViews.find(v => v.path === view.path).query=view.query;
        if (!view.meta.noCache) {
          let index=state.cachedViewsQuery.findIndex(v=>view.name===v.name);
          if(index>=0){
            if(view.query.time!==state.cachedViewsQuery[index].query.time){
              state.cachedViews.splice(index,1)    
              state.cachedViewsQuery.splice(index,1) ;
              setTimeout(() => {
                state.cachedViews.push(view.name)
                state.cachedViewsQuery.push({name:view.name, query:view.query})
              }, 1000);
            }
          }
        }
        return
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name',
        query:view.query
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
        state.cachedViewsQuery.push({name:view.name, query:view.query})
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          state.cachedViewsQuery.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          state.cachedViewsQuery = state.cachedViewsQuery.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
      state.cachedViewsQuery = []
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
