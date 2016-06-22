export class Work {
  static schema = {
    name: 'Work',
    properties: {
      id                  : { type: 'int' },
      title               : { type: 'string' },
      title_kana          : { type: 'string' },
      media               : { type: 'string' },
      media_text          : { type: 'string' },
      season_name         : { type: 'string' },
      season_name_text    : { type: 'string' },
      released_on         : { type: 'date' },
      released_on_about   : { type: 'date' },
      official_site_url   : { type: 'string' },
      wikipedia_url       : { type: 'string' },
      twitter_username    : { type: 'string' },
      twitter_hashtag     : { type: 'string' },
      episodes_count      : { type: 'int' },
      watchers_count      : { type: 'int' },
    }
  }
}
