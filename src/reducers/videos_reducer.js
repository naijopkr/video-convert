import _ from 'lodash'
import {
  ADD_VIDEO,
  ADD_VIDEOS,
  REMOVE_VIDEO,
  REMOVE_ALL_VIDEOS,
  VIDEO_PROGRESS,
  VIDEO_COMPLETE
} from '../actions/types'

const INITIAL_STATE = {}

const videoComplete = (state, action) => ({
  ...state,
  [action.payload.path]: {
    ...action.payload,
    complete: true
  }
})

const videoProgress = (state, action) => ({
  ...state,
  [action.payload.path]: action.payload
})

const addVideos = (state, action) => {
  const keys = _.mapKeys(action.payload, 'path')
  return {
    ...state,
    ...keys
  }
}

const addVideo = (state, action) => ({
  ...state, 
  [action.payload.path]: action.payload
})

const removeVideo = (state, action) => _.omit(state, action.payload.path)

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIDEO_COMPLETE:
      return videoComplete(state, action)
    case VIDEO_PROGRESS:
      return videoProgress(state, action)
    case ADD_VIDEOS:
      return addVideos(state, action)
    case ADD_VIDEO:
      return addVideo(state, action)
    case REMOVE_VIDEO:
      return removeVideo(state, action)
    case REMOVE_ALL_VIDEOS:
      return INITIAL_STATE
    default:
      return state
  }
}
