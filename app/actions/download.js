export const DOWNLOAD = 'DOWNLOAD';

export function download(downloadState) {
	return {
		type: DOWNLOAD,
		state: downloadState
	};
}

export function setDownloadState(downloadState) {
	return (dispatch) => {
		dispatch(download(downloadState));
	};
}
