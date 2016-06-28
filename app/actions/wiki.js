export const WIKI = 'WIKI';

export function showWiki(wikiPage) {
  return {
    type: WIKI,
    state: wikiPage
  };
}

export function setWiki(wikiPage) {
  return (dispatch) => {
    dispatch(showWiki(wikiPage));
  };
}
