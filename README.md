# Maps App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The Maps App integrates mapping functionalities using Leaflet and Apollo Client for GraphQL data fetching.

## Table of Contents

- [Project Description](#project-description)
- [Getting Started](#getting-started)
- [Running with Docker](#running-with-docker)
- [Mounted Files](#mounted-files)
- [Stopping the Application](#stopping-the-application)
- [Troubleshooting](#troubleshooting)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Project Description

The Maps App allows users to visualize data on a map using Leaflet. It fetches data from a GraphQL API using Apollo Client and provides an interactive user experience. The application is designed to be easily deployable using Docker.

## Getting Started

To get started with the Maps App, follow these steps:

1. **Clone the Repository**: If you haven't already, clone the repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/maps-app.git
   cd maps-app
   ```

2. **Install Dependencies**: If you are running the app locally without Docker, install the necessary dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the Development Server**: Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker

To run the application using Docker, follow these steps:

1. **Ensure Docker is Installed**: Make sure you have [Docker](https://www.docker.com/) installed on your machine.

2. **Create a `.env` File**: In the root of your project, create a `.env` file and add the necessary environment variables. Here’s an example of what your `.env` file might look like:

   ```env
   NEXT_PUBLIC_API_BASE_URL='https://hopeful-bluegill-63.hasura.app/v1/graphql'
   NEXT_PUBLIC_HASURA_ADMIN_SECRET='kTUP5nQ2ejh2eEn8KJq4TBWzjP3FN9JKb8nDLUG6nXigcN1IcvKTAtZ2mUF35d8a'
   ```

3. **Prepare Audio and Image Files**: Ensure that your audio files are placed in the `audio` directory and your image files are in the `image` directory.

4. **Build the Docker Image**: Use the following command to build the Docker image:

   ```bash
   npm run docker:build
   ```

5. **Start the Docker Container**: Use the following command to start the Docker container:

   ```bash
   npm run docker:up
   ```

6. **Access the Application**: Once the application is running, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mounted Files

The following files and directories are mounted from your host machine into the Docker container:

- **`.env`**: The environment variables file is mounted to `/app/.env` in the container. This allows the application to access the necessary configuration.
  
- **`audio/`**: The local `audio` directory is mounted to `/app/public/audio` in the container. This directory should contain all audio files that the application needs to access.

- **`image/`**: The local `image` directory is mounted to `/app/public/image` in the container. This directory should contain all image files that the application needs to access.

## Stopping the Application

To stop the application, you can use `CTRL + C` in the terminal where the Docker Compose command is running. Alternatively, you can run:

```bash
docker-compose down
```


This command will stop and remove the containers.

## Troubleshooting

- If you encounter any issues, ensure that the paths in your `docker-compose.yml` file are correct and that the necessary files exist in the specified directories.
- Check the logs for any error messages by running:

  ```bash
  docker-compose logs
  ```

- Ensure that your Docker daemon is running and that you have sufficient permissions to run Docker commands.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
