# MERN Library Project

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application that integrates a Google Books API search engine with a GraphQL API. The app allows users to search for books, save them to their personal list, and view or remove saved books. The project has been refactored from a RESTful API to use GraphQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [GraphQL API](#graphql-api)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

   `git clone https://github.com/Lrbenjamin/MERN_Library.git`

2. Navigate to the project directory:

   `cd MERN_Library`

3. Install the server dependencies:

   `npm install`

4. Navigate to the client directory:

   `cd client`

5. Install the client dependencies:

   `npm install`

6. Return to the root directory:

   `cd ..`

## Usage

1. To start the development server, run:

   `npm run develop`

   This command will start both the client and server concurrently.

2. To build the client for production, run:

   `npm run build --prefix client`

3. To start the server only, run:

   `npm run start`

## GraphQL API

### Queries

- **me**: Returns the authenticated user's information, including saved books.

### Mutations

- **login**: Authenticates a user with their email and password.
- **addUser**: Registers a new user.
- **saveBook**: Saves a book to the authenticated user's account.
- **removeBook**: Removes a saved book from the authenticated user's account.

## Deployment

### Deploying on Render

1. Set the root directory in Render settings to the project's root (`/`).
2. Set the build command to:

   `npm run build --prefix client`

3. Set the publish directory to:

   `client/dist`

4. Deploy the application.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

