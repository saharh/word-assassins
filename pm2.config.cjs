module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'word-assassins',
      script: 'npm',
      args: 'run start',
      log_file: '/home/sahar/.pm2/logs/word-assassins.comb.log',
      out_file: 'NULL',
      error_file: '/home/sahar/.pm2/logs/word-assassins.err.log',
      env_production: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'sahar',
      host: 'wa.master-mind.co.il',
      ref: 'origin/main',
      repo: 'https://github.com/saharh/word-assassins.git',
      path: '/var/node/word-assassins-server',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart pm2.config.cjs --env production'
    },
  },
};
