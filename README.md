# Message.ly

Message.ly is a secure and user-friendly user-to-user private messaging web application built using Express.js. The application focuses on implementing robust authentication and authorization patterns to ensure user privacy and security.

## Features

### User Authentication and Authorization

- **Registration**: Users can create a new account by registering with a unique username and password along with additional personal details like first name, last name, and phone number.
- **Login**: Existing users can securely log in to their accounts using their registered credentials.
- **Token-based Authentication**: The application uses JSON Web Tokens (JWTs) for authentication, providing a secure mechanism for user authorization.

### Messaging Functionality

- **Send Messages**: Authenticated users can send messages to other users registered within the application.
- **Message List**: Users have access to view all messages, both incoming and outgoing, providing a comprehensive overview of their communication history.
- **Message Detail View**: Detailed view of individual messages, displaying the sender, recipient, message body, sent time, and read status.
- **Mark as Read**: Recipients can mark received messages as read, ensuring better message tracking and user interaction.

### Frontend Interface

- **Simple UI**: The frontend interface offers a clean and intuitive design with pages for registration, login, message listing, message details, and composing new messages.
- **AJAX Requests**: The application utilizes AJAX requests to communicate with the server, providing seamless updates to the user interface without refreshing the entire page.

### Additional Integration

- **Twilio Integration**: Upon message creation, the application sends SMS notifications to recipients, alerting them about new messages. This feature enhances real-time communication and user engagement.

## Setup Instructions

- Clone the repository.
- Install dependencies using `npm install`.
- Set up the database by creating the ***messagely*** database and importing the schema from ***data.sql***.
- Set up environmental variables in a ***.env*** file, including a ***SECRET_KEY*** for security.

## Getting Started

- Run the server using `npm start` or `node server.js`.
- Access the application through the defined port (default: 3000) in a web browser.

## Further Improvements

- Writing comprehensive test suites for routes and functionalities.
- Enhancing the frontend UI with more interactive elements and design improvements.
- Implementing additional features like message search, user profiles, or message deletion.

Feel free to explore the application, interact with its features, and contribute to its improvement.
