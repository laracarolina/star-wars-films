export default function searchBar(state = { searchKey: 'films', searchValue: '', searchBtn: false }, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH_VALUE':
      return { ...state, searchValue: action.value }
    case 'CHANGE_SEARCH_KEY':
      return { ...state, searchKey: action.value };
    case 'CHANGE_SEARCH_BTN':
      return { ...state, searchBtn: !state.searchBtn };
    default:
      return state;
  }
}
