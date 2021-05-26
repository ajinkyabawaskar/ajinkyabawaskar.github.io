---
title: How I Set Up My Blog
categories: Personal
---
![Programming]({{ "/assets/img/blog.svg" | relative_url }} ){:height="400px" width="400px"}

In this post, I write about how I set up this blog.
To summarize, this blog is a static website, which means that no back-end processing is required in order to serve any of the webpages that you might see. All the pages of this blog are generated at the time of building the application. 

Why would someone want a website, moreover, a blogging website without a backend? One of the biggest factors for me is that there are no costs involved in hosting such a website. Neither do you have to spend a dime for the domain name. So, how does this work? Let's get in to it right away!


What technologies are used? [Jekyll](https://jekyllrb.com/) to develop and [Github Pages](https://pages.github.com/) to host.

How did I set this up?
1. Install Ruby: This is fairly straightforward. You can [install](https://www.ruby-lang.org/en/documentation/installation/#installers) Ruby on the platform you're working on. Run `ruby -v` to make sure Ruby is installed properly. 
2. Install Jekyll: Run `gem install jekyll bundler` to install Jekyll. Run `jekyll -v` to make sure Jekyll is installed correctly.
3. Create a new project: Navigate to the desired directory and run `jekyll new myblog` where myblog is obviously name of your blog. And navigare to (`cd myblog`) the same.
4. Build: Run `bundle exec jekyll serve` to build your basic jekyll website and serve it on localhost, port 4000 by default.    
5. That's it: Hit the browser of your choice and go to `localhost:4000` to see your Jekyll website up and running.
6. Deploying: Assuming familiarity with Git, just push your project directory to a repo on GitHub and enable GitHub pages under the Settings tab. And you're done!

Isn't it easy? Anyways, if you try this out and face any difficulties, get in touch via the email in footer and I'll try my best to get back at the earliest.