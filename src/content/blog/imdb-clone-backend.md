---
title: "Here is the backend to my IMDb Clone!"
description: "Exploring the Spring Boot backend for an IMDb clone with MySQL, Elasticsearch, accounts, ratings, and watchlists."
pubDatetime: 2023-04-10
slug: "imdb-clone-backend"
tags:
  - "spring boot"
  - "IMDb Clone"
categories:
  - "spring boot"
  - "IMDb Clone"
draft: false
---

Heya fellows!

As someone who graduated in chemistry and had never any contact with software development in an professional environment I had to grasp all knowledge I could get from open-source projects on Github to become a professional developer.

And for me it was not that easy to find projects from which I could learn. People often suggest building a movie database app but I was not able to find a good real-world example on Github. So here I present a nice [IMDb Clone](https://github.com/NiklasTiede/IMDb-Clone)!

What does this project differentiate from other real-world example apps? It comes with the original IMDb dataset of ~9 million movies shipped!

## Contents

1. [What Functionality does this Backend provide?](#1-what-functionality-does-this-backend-provide)
2. [How to Rebuild this Project](#2-how-to-rebuild-this-project)
3. [Testing some Endpoints](#3-testing-some-endpoints)
4. [What's the Data Model under the Hood?](#4-whats-the-data-model-under-the-hood)
5. [Topics to learn from this Project](#5-topics-to-learn-from-this-project)

---

## 1. What Functionality does this Backend provide?

- user can search for movies from the original IMDb dataset (with Elasticsearch as Search Engine and images saved with MinIO!)
- user registration with email confirmation and JWT security
- user can rate movies (CRUD by MySQL)
- user can add movies to their watchlist
- user can comment movies and have conversations

---

## 2. How to Rebuild this Project

The best way to learn is to get our hands on. Firstly, we just have to download and build the repository:

```bash
git clone https://github.com/NiklasTiede/imdb-clone.git
```

Before we can run the application we have to pull and run the docker image of the data base. This saves us the extra effort of adding credentials to config files, creating database schemes, importing the dataset and indexing the table.

```bash
cd infrastructure/deployment/development
docker-compose up -d
```

Be aware: the docker containers need 5-20 min before you can connect to it, because the MySQL container has to import the data from the `.csv` file first! You can also remove the `-d` (detach) flag to see when the container is ready. Then we can load our gradle project, let it download dependencies if not already done and run it!

---

## 3. Testing some Endpoints

I added `.http`-[files](https://github.com/NiklasTiede/IMDb-Clone/tree/master/src/main/resources/api-calls) which make it very simple to execute requests against the endpoints! Here's an example if we want to search for a movie (substring search).

![Movie Search request](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2yj51400nkgg56sx0y03.jpeg)

We get a paged reponse back.

```json
{
  "content": [
    {
      "id": 2872718,
      "primaryTitle": "Nightcrawler",
      "originalTitle": "Nightcrawler",
      "startYear": 2014,
      "endYear": null,
      "runtimeMinutes": 117,
      "movieGenre": [
        "THRILLER",
        "DRAMA",
        "CRIME"
      ],
      "movieType": "MOVIE",
      "imdbRating": 7.8,
      "imdbRatingCount": 528339,
      "adult": false,
      "rating": null,
      "ratingCount": 0
    }
  ],
  "page": 0,
  "size": 1,
  "totalElements": 30,
  "totalPages": 30,
  "last": false
}
```

If we want to access secured endpoints we have to create an account. The first account created will automatically have Admin role permissions.

![registration request](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kii2o0xqy97ydjhf1ywq.jpeg)

Email confirmation is not necessary, it is turned off by default. But you can activate it by setting the following property from `false` to `true`.

```properties
spring.mail.properties.mail.smtp.starttls.enable=false
```

Now we can login.

![login request](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u7bhowatz28wwkzq1iyf.jpeg)

A Json Web Token will be returned which we then use to authenticate if necessary.

```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjY2NTQxNTEyLCJleHAiOjE2NjkxMzm1MTJ9.HKlIagNPjHH-GITb_hMzcS4bH0jSMZGrjolw_buneIpm7MIYiN-42nLMqkj7ulRYqXv4LFfWwsNEMGFIJim30w",
  "tokenType": "Bearer"
}
```

Now lets make a request to a secured endpoint. Only users can rate movies. So lets rate a movie.

![movie rating request](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/atnuq9k7fqzt254bq6h7.jpeg)

The rating of the movie is stored in database.

![DB entry screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/15urcyq9i74lv4ynsb78.jpeg)

You can go on and check out also some other endpoints!

---

## 4. What's the Data Model under the Hood?

Here's an UML diagram of the underlying data model.

![Data Model](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/50pky5q5gehfw60oq5bd.png)

The two most important tables of the data model are the `account`- and `movie`-table. The `watchlist` and `rating` tables are using a composite primary key: each user can rate or put a movie an his watchlist only once. For the email confirmation and the password reset we need a verification token which is persisted in the `verification_token` table.

---

## 5. Topics to Learn from this Project

I learned a lot by writing this project. Here are some interesting topics you can find in this project.

- handling Exceptions with [@ControllerAdvice](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/exception/RestControllerExceptionHandler.java#L15)
- mapping with [Mapstruct](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/payload/mapper/AccountMapper.java)
- validation with [javax constraints](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/payload/MovieRequest.java)
- multiple Enums: [Bitvalue](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/enums/MovieGenreEnum.java) vs. [extra Table](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/entity/Role.java)
- entities based on [Composite Primary Key](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/entity/WatchedMovie.java)
- scheduling [Jobs](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/job/ScheduledTasks.java#L42)
- spring boot [Profiles](https://github.com/NiklasTiede/IMDb-Clone/tree/master/src/main/resources/config)
- custom [Validation Annotations](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/validation/ValidPassword.java)
- Entity-Relationship [Models](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/entity/Account.java#L38)
- [importing Data](https://github.com/NiklasTiede/IMDb-Clone/blob/master/infrastructure/database/docker-image-creation/init.sql#L102) (csv-file) into MySQL
- configure [CORS](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/java/com/thecodinglab/imdbclone/config/WebMvcConfig.java) Policy
- column [Indexing](https://github.com/NiklasTiede/IMDb-Clone/blob/master/src/main/resources/sql/schema.sql#L91)

...and many more! Feel free to fork/clone the repository and discover it!

---

I put a lot of effort into this project and will continue working on it. I would really appreciate if you give my [Github repository](https://github.com/NiklasTiede/IMDb-Clone) a star! 😃

I wish you all a nice day!
