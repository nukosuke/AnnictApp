export class User {
  static schema = {
    name: 'User',
    properties: {
      name: { type: 'string' },

      /**
       * works cache
       */
      watching      : { type: 'list', objectType: 'Work' },
      watched       : { type: 'list', objectType: 'Work' },
      wanna_watch   : { type: 'list', objectType: 'Work' },
      on_hold       : { type: 'list', objectType: 'Work' },
      stop_watching : { type: 'list', objectType: 'Work' },

      /**
       * watching episodes head
       */
      episodes_head : { type: 'list', objectType: 'Episode' },

      /**
       * records cache
       */
      recent_records : { type: 'RecordList' },
    }
  }
}
