import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'
import config from './app/config'

let server: Server

async function main() {
  await mongoose.connect(config.database_url as string)

  server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}

main().catch((err) => console.log(err))

// handle sync and async errors
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected, shutting down....🚫')

  //if server is running then shut down the server then stop process
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }

  process.exit(1)
})

process.on('uncaughtException', () => {
  console.warn('uncaughtException is detected, shutting down....🚫')

  process.exit(1)
})
