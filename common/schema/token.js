export class Token {
  static schema = {
    name: 'Token',
    properties: {
      access_token : { type: 'string' },
      //token_type   : { type: 'string' },
      //scope        : { type: 'string' },
      //created_at   : { type: 'date'   },
    }
  }
}

export class TokenInfo {
  static schema = {
    name: 'TokenInfo',
    properties: {
      resource_owner_id  : { type: 'int' },
      scope              : { type: 'list', ObjectType: 'string' },
      expires_in_seconds : { type: 'int' , optional: true },
      created_at         : { type: 'date' },
    }
  }
}
