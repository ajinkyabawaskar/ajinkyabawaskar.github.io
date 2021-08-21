---
layout: post
title: Comparison of MQTT Brokers
date:   2021-08-20 16:35:27 +0530
categories: Programming
---
There are various MQTT broker implementations out there & choosing one can be difficult. But the first thing we need to do is take a crisp look of your requirements. For the sake of this article, I will make some assumptions for you:
- Open source
- No restriction with regard to programming language
- Supports at least MQTT v3.1
- Support for authorization with atleast TLS

I have taken the candidates from this [list of MQTT brokers](https://github.com/mqtt/mqtt.org/wiki/server-support). Mosquitto is a really lightweight MQTT broker written in C. 