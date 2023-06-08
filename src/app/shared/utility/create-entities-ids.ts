export function createEntitiesIds(state: any, array: any[], keyName: string = 'id') {
  return array.reduce((acc, item) => {
    return {
      entities: {...acc.entities, [item[keyName]]: item},
      ids: [...acc.ids, item[keyName]],
    };
  }, {entities : {}, ids: []});
}
