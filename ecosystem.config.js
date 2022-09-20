module.exports = {
  apps : [{
    script: './backend/index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '51.38.234.101',
      ref  : 'origin/master',
      repo : 'git@github.com:Peacepad/Portfolio.git',
      path : '/home/ubuntu/portfolio',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
