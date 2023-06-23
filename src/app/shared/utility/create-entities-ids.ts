export function createEntitiesIds<T>(array: T[], keyName: string = 'id') {
  return array.reduce((acc, item) => {
    return {
      entities: {...acc.entities, [item[keyName]]: item},
      ids: [...acc.ids, item[keyName]],
    };
  }, {entities : {}, ids: []});
}
