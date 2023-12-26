const { fork } = require('child_process');

const servers = ['server.js', 'server2.js', 'tariffs_server.js', 'billing_server.js', 'linking_server.js' /* добавьте другие файлы серверов по мере необходимости */];

const startServer = (serverFile) => {
  return new Promise((resolve, reject) => {
    const childProcess = fork(serverFile);

    childProcess.on('message', (message) => {
      if (message === 'listening') {
        resolve();
      }
    });

    childProcess.on('error', (error) => {
      reject(error);
    });
  });
};

const startAllServers = async () => {
  const promises = servers.map(startServer);
  await Promise.all(promises);
  console.log('All servers are running.');
};

startAllServers();
