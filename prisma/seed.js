import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Ajouter les skins
    const skins = [
      {
        name: 'Skin A',
        price: 100,
        description: 'Un skin cool pour votre avatar.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYqjmiREzUMKLg_ODLYLxzxbE6QLi4F2n2g&s',
      },
      {
        name: 'Skin B',
        price: 200,
        description: 'Un skin épique avec des effets spéciaux.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJQjZTMpVJiGW3d_UfzDhJwvzLBa8M0Vn-Q&s',
      },
      {
        name: 'Skin C',
        price: 150,
        description: 'Un skin rare et très demandé.',
        image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1t6tPmc9pnTeGJDHGDmc3MFPNGZcr7Bos5Q&s',
      },
    ];

    for (const skin of skins) {
      const existingSkin = await prisma.skin.findUnique({
        where: { name: skin.name },
      });
      if (!existingSkin) {
        await prisma.skin.create({
          data: skin,
        });
        console.log(`Skin "${skin.name}" ajouté avec succès.`);
      } else {
        console.log(`Skin "${skin.name}" existe déjà, pas besoin de le recréer.`);
      }
    }

    // Ajouter un utilisateur test avec beaucoup d'argent
    const testUser = {
      username: 'rich_user',
      email: 'richuser@example.com',
      password: await bcrypt.hash('securepassword', 10),
      money: 1000000,
    };

    const existingUser = await prisma.user.findUnique({
      where: { email: testUser.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: testUser,
      });
      console.log('Utilisateur test ajouté avec succès.');
    } else {
      console.log('Utilisateur test existe déjà, pas besoin de le recréer.');
    }
  } catch (error) {
    console.error('Erreur lors de l’ajout des données:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();