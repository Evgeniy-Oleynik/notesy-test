export function createEntitiesIds(state: any, array: any[], keyName: string) {
  return array.reduce((acc, item) => {
    return {
      entities: {...acc.entities, [item[keyName]]: item},
      ids: state.ids.indexOf(item[keyName]) === -1 && acc.ids.indexOf(item[keyName]) === -1 ? [...acc.ids, item[keyName]] : acc.ids,
    };
  }, {entities: {...state.entities}, ids: [...state.ids]});
}
