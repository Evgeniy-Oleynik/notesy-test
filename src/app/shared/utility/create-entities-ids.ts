export function createEntitiesIds<A, T extends { entities: { [key: number]: A }; ids: number[] }>(
  array: A[],
  state: { entities: { [key: number]: A }; ids: number[] } = {entities: {}, ids: []},
  keyName: string = 'id'
) {
  return array.reduce((acc, item) => {
    return {
      entities: {...acc.entities, [item[keyName]]: item},
      ids: state.ids.indexOf(item[keyName]) === -1 && acc.ids.indexOf(item[keyName]) === -1 ? [...acc.ids, item[keyName]] : acc.ids,
    };
  }, {entities: {...state.entities}, ids: [...state.ids]});
}
