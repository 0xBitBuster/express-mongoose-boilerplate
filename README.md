# Node.js (Express) and MongoDB (Mongoose) Boilerplate

![Showcase Image](https://i.ibb.co/RTZsjyx/Screenshot-1.png)

This is a boilerplate project that provides a secure starting point for building web applications with Node.js (Express.js) and MongoDB (Mongoose). It also includes a Docker container for easy deployment and scalability, as well as Redis for rate limiting.

## Features
- [x] **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- [x] **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- [x] **Santizing**: sanitize request data against xss, query injections and HTTP parameter pollution using [xss-clean](https://www.npmjs.com/package/xss-clean), [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) & [hpp](https://www.npmjs.com/package/hpp)
- [x] **Rate Limiting**: prevent small DDOS and Brute-Force Attacks using [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)
- [x] **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- [x] **Error handling**: centralized and async error handling mechanism with a custom error class
- [x] **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- [x] **Logging**: using [morgan](https://github.com/expressjs/morgan)
- [x] **Docker support**: for easy deployment and scalability
- [x] **Best Practices**: Async catch handler, Directory Structure, Validation

## Getting Started
### Prerequisites
- Node.js (version 12 or higher)
- MongoDB Database
- Docker

### Installation
1. Clone the repository to your local machine:
```bash
git clone https://github.com/0xBitBuster/express-mongoose-boilerplate.git
```
2. Set environment variables in `docker-compose.dev.yaml` and `docker-compose.yaml`

### Usage
To start the server, run:
```bash
docker-compose up [-f docker-compose.dev.yaml]
```
By default, the server runs on `http://localhost:80`

## Contributing
Contributions are welcome! If you have a feature request or bug report, please open an issue. If you want to contribute code, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
