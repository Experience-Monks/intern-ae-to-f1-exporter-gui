export const SET_COMPOSITION_DOWNLOAD = 'SET_COMPOSITION_DOWNLOAD';

export function setCompDownloads(state) {
    return {
        type: SET_COMPOSITION_DOWNLOAD,
        state
    };
}

export function setCompositionDownloads(state) {
  return (dispatch) => {
    dispatch(setCompDownloads(state));
  };
}
