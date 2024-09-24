import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleLeads: Prisma.LeadsCreateInput[] = [
  {
    fullName: "Harvey Specter",
    emailAddress: "harvey.specter@example.com",
    checkbox: true,
    createdAt: new Date(),
  },
  {
    fullName: "Mike Ross",
    emailAddress: "mike.ross@example.com",
    checkbox: true,
    createdAt: new Date(),
  },
  {
    fullName: "Donna Paulsen",
    emailAddress: "donna.paulsen@example.com",
    checkbox: false,
    createdAt: new Date(),
  },
];

const sampleBookings: Prisma.BookingsCreateInput[] = [
  {
    fullName: "Rachel Zane",
    emailAddress: "rachel.zane@example.com",
    phoneNumber: "5559876543",
    date: new Date(2024, 9, 8, 12, 0, 0), // Oct 8, 2024, 12:00 PM GST
    timeSlot: "12:00 PM",
    callNotes: "Follow-up on legal documents",
    checkbox: true,
    createdAt: new Date(),
  },
  {
    fullName: "Louis Litt",
    emailAddress: "louis.litt@example.com",
    phoneNumber: "5551234567",
    date: new Date(2024, 9, 1, 10, 0, 0), // Oct 1, 2024, 10:00 AM GST
    timeSlot: "10:00 AM",
    callNotes: "Litigation strategy discussion",
    checkbox: true,
    createdAt: new Date(),
  },
  {
    fullName: "Jessica Pearson",
    emailAddress: "jessica.pearson@example.com",
    phoneNumber: "5559871111",
    date: new Date(2024, 9, 15, 16, 0, 0), // Oct 15, 2024, 4:00 PM GST
    timeSlot: "4:00 PM",
    callNotes: "Management meeting",
    checkbox: false,
    createdAt: new Date(),
  },
];

async function main() {
  console.log("Start seeding...");

  for (const lead of sampleLeads) {
    const newLead = await prisma.leads.create({
      data: lead,
    });
    console.log(`Created new lead with id: ${newLead.id}`);
  }

  for (const booking of sampleBookings) {
    const newBooking = await prisma.bookings.create({
      data: booking,
    });
    console.log(`Created new booking with id: ${newBooking.id}`);
  }

  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
