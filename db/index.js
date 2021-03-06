require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PSQL_DB_NAME, process.env.PSQL_USERNAME, process.env.PSQL_PASSWORD, {
  host:  process.env.PSQL_HOSTNAME,
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  twitch_sub: {
    type: Sequelize.BOOLEAN
  },
  mod_status: {
    type: Sequelize.BOOLEAN
  },
  color: {
    type: Sequelize.STRING
  }
});

const Chat = sequelize.define('chats', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  video_timestamp: {
    type: Sequelize.STRING
  },
  chat: {
    type: Sequelize.TEXT
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  },
  video_id: {
    type: Sequelize.INTEGER
  }
});

User.hasMany(Chat);

const grabUsernameFromDb = (id) => {
  return User.findByPk(id)
    .then((foundUser) => {
      console.log('my user = ', foundUser.dataValues);
      const username = foundUser.dataValues;
      return username;
    })
    .catch((err)=> {
      console.error('from db', err);
    });
};
const createUserRecord = (data) => {
  console.log('data:', data);
  return User.create({username: 'flipfloop', twitch_sub: true, mod_status: false, color: 'pink' })
    .then((data) => {
      console.log('my user = ', data.dataValues);
      //return user.dataValues;
    })
    .catch((err)=> {
      console.error('from db', err);
    });
};

const updateUsernameFromDb = (id) => {
  return User.update({username: 'flopflink', twitch_sub: true, mod_status: false, color: 'ostrich cream' },
    {where: {
      id: id
    }
    })
    .then((foundUser) => {
      console.log('user updated ');
    })
    .catch((err)=> {
      console.error('from db', err);
    });
};

const deleteUsernameFromDb = (id) => {
  return User.destroy({
    where: {
      id: id
    }
  })
    .then((foundUser) => {
      console.log('user deleted ');
    })
    .catch((err)=> {
      console.error('from db', err);
    });
};


module.exports = deleteUsernameFromDb;
module.exports = createUserRecord;
module.exports = updateUsernameFromDb;
module.exports = grabUsernameFromDb;
