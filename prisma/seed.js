import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const testUser = await prisma.user.create({
        data: {
            email: "coyote@kickflip.gov",
            username: "coyote",
            pwdhash: "",
            crews: {
                create: [
                    {
                        name: "DEADDROP",
                        guid: "",
                        inventories: {
                            create: [
                                {
                                    name: "Bathsheba",
                                    items: {
                                        create: [
                                            {
                                                name: "Militech XR-83",
                                                type: 11,
                                                count: 1,
                                                quality: 2,
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
                                                name: "Sandevistan",
                                                type: 4,
                                                count: 1,
                                                quality: 3,
                                                fields: {
                                                    create: [
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
                                                name: "Severed Cyberear",
                                                type: 1,
                                                count: 1,
                                                quality: 1,
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
                                                name: "Militech XR-83",
                                                type: 11,
                                                count: 1,
                                                quality: 2,
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
                                                type: 25,
                                                count: 1,
                                                quality: 3,
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