// backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Hasheamos una contraseña de ejemplo
  const passwordHash = await bcrypt.hash("123456", 10)

  // Ejemplo: crea un usuario "Alice"
  await prisma.user.upsert({
    where: { email: "alice@dale.app" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@dale.app",
      password: passwordHash,
      isDriver: true
    }
  })

  console.log("✅ Seed completed")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
