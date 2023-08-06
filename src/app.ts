import buildServer from './server'

const server = buildServer()

async function main() {
  try {
    await server.listen({ port: 5003 })

    console.log(`Server ready at http://localhost:5003`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
