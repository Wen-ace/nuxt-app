
import { MutationTree, ActionTree } from 'vuex'

type State = ReturnType<typeof state>

export const state = () => ({
  currentSession: {},
  sessionList: [],
})

export const actions: ActionTree<StaticRange, any> = {

} 


export const mutations: MutationTree<State> = {
  
}

