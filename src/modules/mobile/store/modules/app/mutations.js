import {
  START_LOADING,
  FINISH_LOADING
} from './mutation-types'

const mutations = {
  [START_LOADING] (state) {
    state.loading = true
  },
  [FINISH_LOADING] (state) {
    state.loading = false
  }
}
export default mutations
