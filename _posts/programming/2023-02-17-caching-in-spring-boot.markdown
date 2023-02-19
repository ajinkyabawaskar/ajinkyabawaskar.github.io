---
layout: post
title: Awesome annotations in Spring Boot - @EnableCaching
date:   2023-02-17 00:12:00 +0530
categories: Programming
---

The Spring Framework is one of the most widely used backend frameworks in companies of all sizes, from startups to enterprises.
At first glance it seems that the framework revolves around simple controller - service - repository model. But it has a lot to offer.

Spring Boot is an opinionated framework, meaning it autoconfigures a lot of things out of the box. Which means the framework enables and disables certain aspects of the way your application behaves. We will look into enabling some of those features in this blog post.


The abilities of this framework are uncovered as one discovers the `@Enable` series of annotations. In this series of blog posts, we will take a brief look of those annotations: `@EnableCaching`, `@EnableScheduling`, `@EnableAsync`, etc. This post focuses on former.

---

#### @EnableCaching
As the name suggests, this annotation enables caching in your spring application. For the uninitated, caching means storing the results of an operation to be used later on, avoiding the need to perform the same operation over and over again. While that sounds like a significant performace enhancement, please be very thoughtful where you want to implement caching, as it can result in inconsistent behaviour if not configured correctly.

Having given a fair warning, let us look at some use-cases where caching can be very useful.

Consider you are working on a stock trading application, where one of the requirements is to display the status of portfolio of an user on a weekly basis. This is likely to be a heavy operation on your database as you might be performing joins or reading data across tables. 
Caching makes sense here as it will directly improve performace in this particular use-case as well as others - since you essentially reduced some load on your database.

```java
// status of portfolio
public class PortfolioDto {
    private List<StockDto> stocks;
}

public class StockDto {
    private String scrip;
    private Float change;
}

@Service 
public class PortfolioService {
    public PortfolioDto getPortfolio(String userId) {
        PortfolioDto portfolio = new Portfolio();
        // heavy operation to calculate portfolio here
        return portfolio;
    }
}
```

Given above is pseudo code for the use case mentioned above. It is safe to use caching, since the status of portfolio calculated for previous week does not change, and is immutable in a sense. Now let us see how we can implement it.

1. Adding dependency to `pom.xml`

    ```xml
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-cache</artifactId>
    </dependency>
    ```

2. Add `@EnableCaching` to your configuration class

    ```java
    @EnableCaching
    @Configuration
    public class ApplicationConfig {
        ...
    }
    ```

3. Using `@Cacheable` to create a cache with name `weekly_portfolios`

    ```java
    @Cacheable("weekly_portfolios")
    public PortfolioDto getPortfolio(String userId) {
        PortfolioDto portfolio = new Portfolio();
        // heavy operation to calculate portfolio here
        return portfolio;
    }
    ```

4. From the previous step, we can say that the result of method `getPortfolio()` is cached, but if you take a closer look, every cache is esentially a key-value pair. But when we created the `weekly_porfolios` cache, we never supplied what key is to be used for storing the output whenever this method is invoked. We can configure that by passing `key` parameter to `@Cacheble`. If no key is configured, then spring will autoconfigure a key for us using the hashcode of parameters of a method. While this works, I recommend that we create the key ourselves to make sure we are caching things the way we want to.

    ```java
    @Cacheable("weekly_portfolios", key = "#userId")
    public PortfolioDto getPortfolio(String userId) {
        PortfolioDto portfolio = new Portfolio();
        // heavy operation to calculate portfolio here
        return portfolio;
    }
    ```
    The value of `key` is a SpEL expression, thus begins with a `#`. We will keep it short here since SpEL is out of scope for this post.


Whenever the method `getPortfolio()` will be called for the first time, it will be executed and the results of execution, i.e. the `PortfolioDto` will be stored in `weekly_portfolios` cache, against key `userId` for which the portfolio was calculated. 
For subsequent invokations, spring will use the value in cache if it exists. If it does not exist in cache then the method will be executed and the results will be stored in the cache.


So far so good, but what if the current week gets over and new week starts? In this case, all the outputs of `getPortfolio` will be different from that of the last week. Basically meaning we need to invalidate all of our cache. We can do so by using `@CacheEvict`:

```java
@CacheEvict(value = "weekly_portfolios")
public void evictPortfolioCaches() {

}
```
Invoking the `evictPortfolioCaches()` method will evict all the caches just like we wanted and new values will be populated eventually.

Sometimes, you might want to cache selected users instead of all of them. Or you might want to enable or disable caching based on the environment your application is running. It can be achieved with conditional caching. Here's an example:

```java
@Cacheable("weekly_portfolios", key = "#userId", condition="#userId.contains('007')")
public PortfolioDto getPortfolio(String userId) {
    PortfolioDto portfolio = new Portfolio();
    // heavy operation to calculate portfolio here
    return portfolio;
}
```

In the above example, we check if the user is James Bond, and if it is, then we do not cache the portfolio. (You don't want to be in trouble with James Bond)

And with that, we have a brief overview of caching in spring boot, and how we can easily set up caching using various annotations. There are multiple other use-cases where you'd want to populate or evict multiple caches, etc. You might want to use a different cache manager like redis instead of the abstracted cache manager registered automatically. There are multiple ways and parameters in which you can control the caching behaviour of your application, and links to those references can be found in the footer of this post.



#### References:
- [A Guide To Caching in Spring](https://www.baeldung.com/spring-cache-tutorial) - Baeldung Blog 
- [Cache Abstraction](https://docs.spring.io/spring-framework/docs/5.0.13.RELEASE/spring-framework-reference/integration.html#cache) - Spring Documentation