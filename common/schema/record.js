export class Record {
  static schema = {
    name: 'Record',
    properties: {
      id             : { type: 'int'    },
      comment        : { type: 'string' },
      rating         : { type: 'float', optional: true },
      is_modified    : { type: 'bool'   },
      likes_count    : { type: 'int'    },
      comments_count : { type: 'int'    },
      created_at     : { type: 'date'   },
      //user: {},
      work           : { type: 'Work'    },
      episode        : { type: 'Episode' },
    }
  }
}

export class RecordList {
  static schema = {
    name: 'RecordList',
    properties: {
      records     : { type: 'Record' },
      total_count : { type: 'int' },
      next_page   : { type: 'int', optional: true },
      prev_page   : { type: 'int', optional: true },
    }
  }
}
