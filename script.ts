import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createClub(nimi, asukoht, asutamisaasta, riik) {
    const klubi = await prisma.club.create({
        data: {
            name: nimi,
            location: asukoht,
            foundedYear: asutamisaasta,
            country: riik
        }
    });
    return klubi;
}

async function createPlayer(klubiID, eesnimi, perekonnanimi) {
    const mangija = await prisma.player.create({
        data: {
            clubID: klubiID,
            firstName: eesnimi,
            lastName: perekonnanimi
        }
    });
    return mangija;
}

async function main() {
    const klubi = await createClub("GerteniKlubi", "Kohtla-Järve", 1999, "Eesti");
        await createPlayer(klubi.id, "Gerten", "Pilv");
}

main()
    .catch(e => { console.error(e.message); })
    .finally(async () => { await prisma.$disconnect(); });
