import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const testUser = await prisma.user.create({
        data: {
            email: "coyote@kickflip.gov",
            inventories: {
                create: [
                    {
                        name: "Bathsheba",
                        items: {
                            create: [
                                {
                                    name: "Militech XR-83",
                                    type: "Heavy Ranged Weapon",
                                    count: 1,
                                    fields: {
                                        create: [
                                            {
                                                name: "Damage",
                                                value: "3d6"
                                            },
                                            {
                                                name: "Magazine Size",
                                                value: "8"
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: "Arasaka Smart Shotgun",
                                    type: "Heavy Ranged Weapon",
                                    count: 1,
                                    fields: {
                                        create: [
                                            {
                                                name: "Damage",
                                                value: "3d6"
                                            },
                                            {
                                                name: "Magazine Size",
                                                value: "4"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: "Dumpster on 12th & Main",
                        items: {
                            create: [
                                {
                                    name: "Militech XR-83",
                                    type: "Heavy Ranged Weapon",
                                    count: 1,
                                    fields: {
                                        create: [
                                            {
                                                name: "Damage",
                                                value: "3d6"
                                            },
                                            {
                                                name: "Magazine Size",
                                                value: "8"
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: "Arasaka Smart Shotgun",
                                    type: "Heavy Ranged Weapon",
                                    count: 1,
                                    fields: {
                                        create: [
                                            {
                                                name: "Damage",
                                                value: "3d6"
                                            },
                                            {
                                                name: "Magazine Size",
                                                value: "4"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })
}

try {
    await seed();
    await prisma.$disconnect();
}
catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}