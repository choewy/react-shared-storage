export const makeNumberValue = (idx: number, subfix: string) => {
  return {
    id: [subfix, idx].join('_'),
    value: idx,
  };
};

export const makeStringValue = (idx: number, subfix: string) => {
  return {
    id: [subfix, idx].join('_'),
    value: ['string', idx].join('_'),
  };
};

export const makeObjectValue = (idx: number, subfix: string) => {
  return {
    id: [subfix, idx].join('_'),
    value: {
      key: ['key', idx].join('_'),
      name: ['name', idx].join('_'),
    },
  };
};
