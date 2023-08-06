import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Claudio',
    email: 'a@a.com',
    password: 'fdec5693709fe03f94b4aa28e4edc271f86d0ee1d0938bb16b91af0324caf94d8f3d796ae1522a787457691114bed9d53e7ff52b237e131556af21da20268ecf',
    salt: 'db6ed2d3855dbfe7ead9814ccf46c066',
    // posts: {
    //   create: [
    //     {
    //       title: 'Join the Prisma Slack',
    //       content: 'https://slack.prisma.io',
    //       published: true,
    //     },
    //   ],
    // },
  },
  {
    name: 'Miriam',
    email: 'miriam@prisma.io',
    password: 'fdec5693709fe03f94b4aa28e4edc271f86d0ee1d0938bb16b91af0324caf94d8f3d796ae1522a787457691114bed9d53e7ff52b237e131556af21da20268ecf',
    salt: 'db6ed2d3855dbfe7ead9814ccf46c066',
    // posts: {
    //   create: [
    //     {
    //       title: 'Follow Prisma on Twitter',
    //       content: 'https://www.twitter.com/prisma',
    //       published: true,
    //     },
    //   ],
    // },
  },
  {
    name: 'Clara',
    email: 'clara@prisma.io',
    password: 'fdec5693709fe03f94b4aa28e4edc271f86d0ee1d0938bb16b91af0324caf94d8f3d796ae1522a787457691114bed9d53e7ff52b237e131556af21da20268ecf',
    salt: 'db6ed2d3855dbfe7ead9814ccf46c066',
    // posts: {
    //   create: [
    //     {
    //       title: 'Ask a question about Prisma on GitHub',
    //       content: 'https://www.github.com/prisma/prisma/discussions',
    //       published: true,
    //     },
    //     {
    //       title: 'Prisma on YouTube',
    //       content: 'https://pris.ly/youtube',
    //     },
    //   ],
    // },
  },
]

// const productData: Prisma.ProductCreateInput[] = [
//   {
//     title: 'Product 1',
//     price: 100,
//     ownerId : 1
//   {
//     title: 'Product 2'
//   },
//   {
//     title: 'Product 3'
//   },
// ]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id} with password: a`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
