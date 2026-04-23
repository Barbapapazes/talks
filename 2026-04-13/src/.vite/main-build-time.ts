const buildTime = '__BUILD_TIME__'

const app = document.querySelector('#app')

if (app) {
  app.innerHTML = `Built at ${buildTime}`
}
