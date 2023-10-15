import buildServer from './server'

const server = buildServer()

async function main() {
  try {
    await server.listen({ port: 5050 })

    console.log(`Server ready at http://localhost:5050`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
