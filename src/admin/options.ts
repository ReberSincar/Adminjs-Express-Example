import { AdminJSOptions } from 'adminjs';
import passwordsFeature from '@adminjs/passwords';
import argon2 from 'argon2';

import componentLoader from './component-loader.js';
import { User } from '../entities/user.entity.js';
import datasource from '../db/datasource.js';
import { Book } from '../entities/book.entity.js';

const usersNavigation = {
  name: 'Users',
  icon: 'User',
};

const booksNavigation = {
  name: 'Books',
  icon: 'Book',
};

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        navigation: usersNavigation,
        sort: {
          direction: 'asc',
          sortBy: 'createdAt',
        },
        properties: {
          password: {
            isVisible: {
              edit: true,
              show: false,
              filter: false,
              list: false,
            },
          },
        },
        actions: {
          myCustomAction: {
            actionType: 'record',
            component: false,
            handler: (request, response, context) => {
              const { record, currentAdmin } = context;
              return {
                record: record.toJSON(currentAdmin),
                msg: 'Hello world',
              };
            },
          },
        },
      },
      features: [
        passwordsFeature({
          componentLoader,
          properties: { encryptedPassword: 'password' },
          hash: argon2.hash,
        }),
      ],
    },
    {
      resource: Book,
      options: {
        navigation: booksNavigation,
        sort: {
          direction: 'asc',
          sortBy: 'createdAt',
        },
      },
    },
  ],
  databases: [datasource],
};

export default options;
