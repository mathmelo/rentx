<div align="center">
    <img src="./.github/logo.png" height="20"/>
</div>
<br>
<p align="center">🚀 Car Rental API</p>
<p align="center">
  <img alt="NPM" src="https://img.shields.io/github/license/mathmelo/rentx">
  <img alt="NPM" src="https://img.shields.io/github/issues/mathmelo/rentx">
  <img alt="NPM" src="https://img.shields.io/github/forks/mathmelo/rentx">
  <img alt="NPM" src="https://img.shields.io/github/stars/mathmelo/rentx">
</p>

<div align="center">
 <a href="#-objective">objective</a> •
 <a href="#-roadmap">roadmap</a> • 
 <a href="#-technologies">technologies</a> • 
 <a href="#-license">license</a> • 
 <a href="#-author">author</a>
</div>

---

## 💡 Objective
<p>RentX is a car rental API that uses a well-defined and highly modular architecture, it seeks to provide an efficient and reliable vehicle rental experience. With clear documentation provided by Swagger, RentX simplifies the rental process for users and developers.</p>

## 🎌 Roadmap

### Prerequisites
Before start to develop, you will need to have the following tools installed on your machine:
<ul>
  <li><a href="https://git-scm.com">Git</a></li>
  <li><a href="https://nodejs.org/en/">Node</a></li>
  <li><a href="https://docs.docker.com/engine/install/">Docker</a></li>
  <li><a href="https://yarnpkg.com/getting-started/install">Yarn</a></li>
</ul>

You can also use npm, but i recommend yarn.

Also it's nice to have an editor to work with the code like [VSCode](https://code.visualstudio.com/).

### Running the Back End (server)

**🚫 Important**
- A .env file must be created in the project's root folder containing all access keys, including  to the databases.
- The .env.exemple file can be used as an example

**Execute the commands**

```bash
# Clone this repository
$ git clone https://github.com/mathmelo/rentx

# Access the project folder in the terminal/cmd
$ cd rentx

# Execute to create all containers and run the application
$ docker-compose up

# Enter the docker container and run migrations
$ docker exec -it bin/bash rentx
$ npm run migration:run


# The server will start on port:3333 - go to <http://localhost:3333>
```
## 📝 Docs

```bash
https://localhost:3333/docs
```

## ✅ Requirements

Click **[here](Requirements.md)**


## 💜 Technologies
- Typescript
- NodeJS
- Express
- Postgres
- TypeORM
- Docker
- Swagger

## 📕 License

Read the license [here](https://github.com/mathmelo/rentx/blob/main/LICENSE).

## 🤓 Author

Informations about [me](https://github.com/mathmelo).
Send me a message! ;)

<h4 align="center"> 
	🚧  RentX 🚀 In construction...  🚧</br>
</h4>
