import { EXPORT, UNSYNC, NOOP } from '../actions/export';

function status(state = 'Unsynched', action) {
	switch (action.type) {
		case EXPORT:
      if(state === 'Synchronize') {
        state = 'Synching';
        return state;
      }
			else if(state !== 'Synched') {
				state = 'Synchronize';
				return state;
			}
			else {
				return state;
			}
    case NOOP: 
      return state
    case UNSYNC:
      state = 'Unsynched'
      return state;
		default:
			return state;
			
	}
}

export default status;
/*
extractImages = (ae) => {
  var assets = [];
  result.project.items.forEach((item) => {
      if(item.typeName === 'Footage') {
        item.items.forEach((footage) => {
          assets.push(image.name);
        });
      }
  });
  assets.forEach((asset) => {
    //asset.replace('/^/', );
  });
}
*/

/*
replacer(match, pIndent, pKey, pVal, pEnd) {
  const key = '<span class=json-key>';
  const val = '<span class=json-value>';
  const str = '<span class=json-string>';
  let r = pIndent || '';
  if (pKey)
     r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
  if (pVal)
     r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
  return r + (pEnd || '');
}

prettyPrint(obj) {
  const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
  return JSON.stringify(obj, null, 3)
     .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
     .replace(/</g, '&lt;').replace(/>/g, '&gt;')
     .replace(jsonLine, this.replacer);
}
*/