export class Episode {
  static schema = {
    name: 'Episode',
    properties: {
      id            : { type: 'int' },
      number        : { type: 'int' },
      number_text   : { type: 'string' },
      sort_number   : { type: 'int' },
      title         : { type: 'string' },
      records_count : { type: 'int' },
      work          : { type: 'Work' },
      prev_episode  : { type: 'Episode', optional: true },
      next_episode  : { type: 'Episode', optional: true },
    }
  }
}
