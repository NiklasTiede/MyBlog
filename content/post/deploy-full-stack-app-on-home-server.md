+++
title = "How to Cheaply Host Your Full-Stack Side-Project: Serving it From Home"
description = "How to deploy a full-stack application on a home server cheaply"
tags = [
    "java",
    "imdbclone",
    "react",
    "webdev",
    "devops",
]
date = "2023-05-25"
archives = "2023"
categories = [
    "Java",
    "React",
    "IMDbClone",
    "WebDev",
    "DevOps",
]
menu = "main"
+++

Heya fellows,

Frontend projects can be hosted for free. But when you're creating a full-stack app your provider needs to process requests, making database calls etc. No hosting provider offers this for free.


<p align="center">
    <img alt="diy" src="https://media4.giphy.com/media/XaAbmtzzz35IgW3Ntn/giphy.gif?cid=ecf05e47fyq4wkqmayqk6xuug7o8c7x9uh9baif795z3oiii&ep=v1_gifs_search&rid=giphy.gif&ct=g" />
</p>


So when no one offers this for free what else can we do? Build it ourselves!

## Content

1. [Hardware](#1-hardware)
2. [Docker](#2-docker)
3. [Dynamic DNS](#3-dynamic-dns)
4. [Port Forwarding](#4-port-forwarding)
5. [My Home Server Setup](#5-my-home-server-setup)

---

## 1. Hardware

To start, you'll need a computer that can act as a server. You don't necessarily need a powerful machine for this, especially if your app isn't too resource-intensive. An old desktop or a Raspberry Pi can work great for small-scale projects.

Make sure your server has a reliable internet connection. It should ideally be wired directly into your router to maximize uptime and minimize latency. Furthermore, you need a docker compatible OS. You can install it via a bootable USB stick.


<p align="center">
    <img alt="Building things" src="/img/hardware.png" />
</p>

---

## 2. Docker

Next, we're going to use Docker, an open-source platform that simplifies deploying applications within software containers. Containers package up the code, configs, and dependencies into isolated units, making the app easy to run on any platform that supports Docker.

To containerize our application we build a docker image using a `Dockerfile`.

```Dockerfile
FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

We deploy the container with a `docker run` command or using docker-compose.

---

## 3. Dynamic DNS

To make your server accessible from the internet, we deal with the public IP address that your ISP assigns, which changes regularly. The solution is Dynamic DNS (DDNS) - a service that keeps a DNS record up-to-date with your changing IP.

There are several DDNS providers to choose from. After selection, configure it by installing their software on your server to regularly check your public IP and inform the DDNS service if it has changed.

---

## 4. Port Forwarding

With a DDNS hostname pointing to your public IP, you'd want your app to be accessible via a user-friendly domain name. Purchase a domain, and set up a CNAME record pointing to your DDNS hostname.

The next step is port forwarding, a router feature that directs incoming traffic on specific ports to your server. For instance, if your app runs on port 8080, set up port forwarding to direct traffic coming in on this port to your server.

You've now got a home server hosting your full-stack app. Remember, this is a simplified guide - consider security, data safety, and home internet reliability when hosting critical applications at home.

<p align="center">
    <img alt="hooooray" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZThjYzIwOTM2YjY3ZTk2NDUyYjc4ZWM4YzU2OGMyN2ZhOTU2ZDAxNyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3ohzAu2U1tOafteBa0/giphy.gif" />
</p>


---

## 5. My Home Server Setup

To wrap things up, I want to share a real-life implementation of everything we've covered in this article. I have set up a home server (UM-560 Mini PC) running Ubuntu Server, and Docker, and deployed my [IMDb Clone project](https://github.com/NiklasTiede/imdb-clone) that you can access [here](https://imdb-clone.the-coding-lab.com).

Here's a quick overview of the setup:

- **UM560 Home Server**: This is a powerful, compact mini PC, which makes it an excellent choice for a home server. It runs Ubuntu Server, a robust, scalable, and secure platform for deploying applications.

<p align="center">
    <img alt="Building things" src="/img/my-hardware.jpg" />
</p>


- **IMDb Clone**: This is the application that's been hosted on the server. It's a full-fledged web application that gives users access to a vast database of movie information, just like the real IMDb. For more information visit [github.com/niklastiede/imdb-clone](https://github.com/niklastiede/imdb-clone)

<p align="center">
    <img alt="Building things" src="/img/imdb-clone.png" />
</p>


- **Docker**: I also tried docker-swarm but due to poor compatibility with ElasticSearch I stuck with Docker-Compose
- **DynDNS**: My domain provider NameCheap provides also dynamic DNS, I use ddclient as a DynDNS client on the server
- **Port Forwarding**: I have a FritzBox Router on which I opened port 443

---

Hosting this app on my home server was a journey full of learning and excitement. It required a fair amount of configuration and tweaking, but the end result was well worth the effort.

Remember, this didn't happen overnight. It required a good understanding of the technologies involved, a fair bit of troubleshooting, and a lot of patience. But once everything was up and running, the sense of accomplishment was immense.

I hope my story inspires you and reassures you that setting up your own home server for your side projects is entirely doable. Just take it one step at a time, keep learning, and most importantly, enjoy the process. :smiley:

