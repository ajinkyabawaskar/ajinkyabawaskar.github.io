---
layout: post
title: Building for half a million requests
date:   2022-02-02 12:12:00 +0530
categories: Programming
---

It was the month of March 2020, and the entire nation was wondering about the novel coronavirus. And when everyone was locked down in their homes, me and my college friend were discussing about a business idea around affiliate marketing. The idea was simple: have digital goods up for sale on a website, and anyone who refers someone to buy the digital goods get a high (75-80%) commission for doing so. This is a feasible business model because the margin in selling digital goods is more than the commission distributed. The next challenge was fairly technical, to build the platform.

At the time of writing this blog, the first commit was around 2 years back, when I didn't exactly follow the best development practices, as evident from the commit messages in this screenshot:

![FirstCommit]({{ "/assets/img/first_commit.png" | relative_url }}?style=centerme){:height="100%" width="100%"}

<br>

Since then, I feel that I have evolved a bit as a developer and as of today we serve around **200K HTTP requests** in a typical day, and sometimes around **500K HTTP requests/day** when we run offers and promote them. I am putting a screenshot from our Cloudflare account's analytics page:

<br>

![FirstCommit]({{ "/assets/img/cloudflare_24hours.png" | relative_url }}?style=centerme){:height="100%" width="100%"}


<br>

Now that I have stated about stats about performance of our infra at GrowPartner, let me dig a bit deeper into how we achieve it.

We use core PHP on the backend, written in OOP style with PDO for accessing MySQL databases. This backend manages business logic around affiliate marketing, including dashboards for affiliates, referral links, payment gateway and a mini-LMS which has trainings around sales and marketing. We use `apache2` with `mod_php` module as web server with various configurations optimised for CPU utilization. Deployed at [https://affiliate.growpartner.in/](https://affiliate.growpartner.in/)

There's another PHP dashboard made for admins and GrowPartner team for customer support and back-office activities like managing payouts, courses, trainings and webinars on the mini-LMS provided to affiliates amongst other stuff.

We recently launched another platform, devoted entirely to improving the learning experience of our students. We made this platform as a SPA built in Angular 13 with Angular Material as the design library. For layout, spacing and other utilites we use Bootstrap 5 with specific SCSS mixins. Deployed at [https://app.growpartner.in/](https://app.growpartner.in/) and on the backend, we use Python with django REST framework with OAuth - your typical access token and refresh token mechanism. We use `nginx` as HTTP server for serving Angular builds for frontend, and as reverse proxy for backend. Again, we configured `nginx` to use as little CPU as possible. 

Besides the affiliate dashboards and the learning platform, we also have a landing page developed in WordPress which is deployed at [https://growpartner.in/](https://growpartner.in/) which has it's own MySQL instance. We used `nginx` to proxy the landing page, served using `FastCGI` for wordpress PHP processing, but the `php-fpm` processes took over entire CPU and would bring down every other server process on the EC2 machine. We then shifted WordPress to use `apache2` and configured maximum processes so as to limit CPU usage of WordPress.

Earlier, we were trying to squeeze all the above mentioned applications (along with Jenkins for CD) on a single t2.micro EC2 instance with 1GB of RAM and some swap memory, but after observing `top` results, we understood that one process or another would fight for CPU and once CPU utilization reached 100%, the EC2 instance would simply stop responding and rebooting the instance was the only way to regain access and pull everything up.

So we decided to move to a (vaguely) microservices architecture where we run `apache2` + `php` + `MySQL` stack on one instance (affiliate dashboard, admin dashboard and WordPress landing page) and second instance to run `nginx` for LMS platform. We also have continuous delivery setup using `Jenkins` for Angular and Django builds on the second instance. 

We use Cloudflare to mask our servers behind their network, for DNS, caching, and to mitigate DDoS attacks. We also use `uptimerobot.com` to monitor status of our servers and uptime along with AWS Cloudwatch to analyse CPU usage among other metrics. For our MySQL requirements, we had a self-managed instance on the EC2 machine, but we gave AWS RDS a try. Even after a paying for the service and making lots of configurations, we experienced issues like the database going to hibernating mode, where first request after some idle time would result in ridiculously high response times. We just found self-managed MySQL more flexible so we gave up on AWS RDS and went back to our old installation of MySQL. We also use AWS S3 to store documents and images used across applications. 

To summarize here's a diagram of how our architecture looks like:

![Architecture]({{ "/assets/img/growpartner_arch.png" | relative_url }}?style=centerme){:height="100%" width="100%"}

We are trying to do a lot of things, and we are probably doing a few of them the wrong way. And that is exactly where learning occurs. With every new user, every new feature request, every new bug reported, we get an opportunity to improve, to work on stuff that excites us and to work on ourselves. For me, personally this is one of the reasons why I am associated with GrowPartner.

If you have any suggestions, or would like to work with us, feel free to reach out. 