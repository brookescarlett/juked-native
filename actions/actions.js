export let AddSong = obj => {
  return {
    type: "ADD_SONG",
    payload: obj
  }
}

export let RemoveSong = obj => {
  return {
    type: "REMOVE_SONG",
    payload: obj
  }
}

export let UpdateSong = obj => {
  return {
    type: "UPDATE_SONG",
    payload: obj
  }
}

export let SetPlaylistId = string => {
  return {
    type: "ADD_PLAYLISTID",
    payload: string
  }
}

export let SetDJ = bool => {
  return {
    type: "SET_DJ",
    payload: bool
  }
}

export let SetChatroom = string => {
  return {
    type: "SET_CHATROOM",
    payload: string
  }
}

export let SetName = string => {
  return {
    type: "SET_NAME",
    payload: string
  }
}

export let SetQuery = string => {
  return {
    type: "SET_QUERY",
    payload: string
  }
}

export let SetCurrentSong = obj => {
  return {
    type: "SET_CURRENT_SONG",
    payload: obj
  }
}

export let ToggleModal = (bool) => {
  return {
    type: "TOGGLE_MODAL",
    payload: bool
  }
}

export let SetPlayPauseState = (bool) => {
  return {
    type: "SET_PLAY_PAUSE",
    payload: bool
  }
}

export let SetVolume = (num) => {
  return {
    type: "SET_VOLUME",
    payload: num
  }
}

export let AddSongForRecs = (uri) => {
  return {
    type: "GET_RECS",
    payload: uri
  }
}
