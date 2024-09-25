# Fullstack Nextjs App | Flowspark 

Fullstack Nextjs app for generating leads features a dynamic booking system for the users to book call appointments and book demos.

[View Live Demo](https://mag-demo.vercel.app/)

![mag-light](https://github.com/user-attachments/assets/52cf805b-1911-4988-926e-c9ba28076fc8)

![mag-dark](https://github.com/user-attachments/assets/f3272b37-fb1d-4be4-b598-9895f41dd190)

![mag-booking](https://github.com/user-attachments/assets/69ff2109-43c0-49dc-9b59-77642848bddd)



## ⚙️Tech Stack
- Next.js
- Node.js
- TypeScript
- Vercel Postgres
- Prisma
- TailwindCSS
- Shadcn UI
- Zod
- React Hook Form
- Embla Carousel
- React Hot Toast

## 🚀 Project features 

👉 **Dynamic Booking System:** Users can book call appointments using a dynamic booking form constructed using react-hook-form and zod which validates booking information and stores thier booking details in Vercel Postgres.

👉 **Backend API Routes:** Implemented API routes to handle frontend request to create bookings and leads in the database and fetching booking details.

👉 **Disabling Time Slots:** Dynamically fetch bookings data and disable timeslots according to previous bookings avoids double booking call appointments.

👉 **Responsive UI:** Accessible, reusable UI components designed for various screen sizes and best practices.

👉 **Theme Toggle:** Switch between dark/light and system theme and store user preferences on local storage.

👉 **Interactive UI Components:** Implemeneted a interactive features section with an image carousel featuring unique set of images for each selected feature enabling users to seamlessly switch between featues and display progress of each feature


## Project Setup

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` and `.env.local` in the root of your project and add the following content:

.env
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

.env.local
```env
NEXT_PUBLIC_SERVER_URL=
```
Populate the env varaibles with your own keys from the relevant platforms.

**Database Setup with Prisma**

If you're using Prisma for managing the database, you'll need to run database migrations. First, ensure that Prisma is installed:

```bash
npx prisma
```

Run the following command to generate the Prisma client and apply the initial database migration:

```bash
npx prisma migrate dev --name init
```

For any future schema changes, you can apply new migrations using the same command:
```bash
npx prisma migrate dev
```

**Run the Development Server**

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

**Build for Production**

To build the project for production, run:

```bash
npm run build
```
