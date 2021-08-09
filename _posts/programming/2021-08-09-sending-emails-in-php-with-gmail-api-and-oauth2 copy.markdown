---
layout: post
title: Sending emails using PHP with GMail API & OAuth2
date:   2021-08-09 00:05:07 +0530
categories: Programming
---

If one ever writes an application that faces the end user, then one requirement is common across such apps, i.e. sending emails to verify email, order confirmation, notifications & updates, the list goes on. 

If using PHP, then one is presented with the inbuilt [mail()](https://www.php.net/manual/en/function.mail.php) function, to send emails. Again there are downsides to using this (outside the scope of this article) so one moves on to [PHPMailer](https://github.com/PHPMailer/PHPMailer) which is an excellent library that will help one in a long way, but there's a catch:

I used my email & password with SMTP authentication to send emails using PHPMailer, and everything was working just fine. But when I deployed the app to server, the script failed. I had turned on `Less Secure App Access` from my Google account settings and also clicked on `Yes, it was me` button when Google sent a notification to my device asking if it was me who tried to sign in from the server. But still no emails were being sent. The reason behind this is that, I had already logged in to the email from the browser of my development machine & hence I had no issues with authorization. Since I hadn't logged in from server (why would I? & if I wanted to, how would I?) - thus blocking my sign in attempt.

This was the time when I finally decided to let go of PHPMailer and explore the [GMail API](https://developers.google.com/gmail/api). Here's how I did it:
##### Prerequisite:
- PHP 5.4 or greater with the command-line interface (CLI) and JSON extension installed
- The [Composer](https://getcomposer.org/) dependency management tool
- A Google Cloud Platform project with the [API](https://developers.google.com/workspace/guides/create-project) enabled.

##### Sample Code:
Available here- [https://github.com/ajinkyabawaskar/send-email-google-api-oauth2](https://github.com/ajinkyabawaskar/send-email-google-api-oauth2)

##### Concept:
In Layman's language, this is the OAuth2 concept:
1. You ask the user to authorize your application to access their data.
2. The user logs into their Google account and 'Approves' your application.
3. Google then gives you a 'access_token' & a 'refresh_token'
4. You have to use the 'access_token' as an authorization while calling Google APIs.
5. But 'access_token' is short-lived and is useless after it expires so you need new 'access_token'
6. So, you can send your 'refresh_token' & keep asking for more 'access_tokens'
7. User doesn't need to authorize again and again until something changes, i.e either you want more data from their account or they change their Google account password, or remove access to your app from their account settings.

##### Client Library:
To make the above process easy for you to implement, Google provides client libraries that provide an interface for above steps. In case of PHP, the client library is [google-api-php-client](https://github.com/googleapis/google-api-php-client). 

From inside your project directory, run 

```bash
 composer require google/apiclient:^2.0
```


Doing so will add the library to your `composer.json` and install it in `vendor` directory.

##### Credentials:
- Log in to Google Cloud Console > API & Services > [Credentials](https://console.cloud.google.com/apis/credentials) page and create new `OAuth Client ID`.
- Download the Client ID as json and put it in your project directory, renaming it as `credentials.json`
- Enter [http://localhost/project-path/](http://localhost/project-path) as redirect URI when creating the credentials.
- DO NOT CREATE `token.json` - it is automatically created by the library.

#### Finally, code:

{% highlight php %}
<?php
// Refer: https://developers.google.com/gmail/api/quickstart/php
// Filename: send_email.php

$autoloadPath = "./vendor/autoload.php";
// remember keep credentials & token files outside public_html when deploying
$credentialsPath = "credentials.json";
$tokenPath = "token.json";

require $autoloadPath;

if (php_sapi_name() != 'cli') {
    throw new Exception('This application must be run on the command line.');
}

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Gmail API PHP Send Email');
    $client->setScopes(Google_Service_Gmail::GMAIL_SEND);
    $client->setAuthConfig($credentialsPath);
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}


// Get the API client and construct the service object.
$client = getClient();
$service = new Google_Service_Gmail($client);

//The special value **me** can be used to indicate the authenticated user.
$user = "me";

$subject = "Test mail using GMail API";
$rawMessage = "From: Sender Name <senderemail@gmail.com>\r\n";
$rawMessage .= "To: Receiver Name <receiveremail@gmail.com>\r\n";
$rawMessage .= "Subject: =?utf-8?B?" . base64_encode($subject) . "?=\r\n";
$rawMessage .= "MIME-Version: 1.0\r\n";
$rawMessage .= "Content-Type: text/html; charset=utf-8\r\n";
$rawMessage .= "Content-Transfer-Encoding: quoted-printable" . "\r\n\r\n";
$rawMessage .= "You got this!";

// The message needs to be encoded in Base64URL
$mime = rtrim(strtr(base64_encode($rawMessage), '+/', '-_'), '=');

$msg = new Google_Service_Gmail_Message();
$msg->setRaw($mime);
$service->users_messages->send($user, $msg);
?>
{% endhighlight %}

Next, create another file in your project directory that will enable you to collect the authorization code sent by Google upon successful user authentication. Google will send this code to the redirect URI you entered while creating the credentials.
```php
// Filename: index.php
<?php>
echo $_GET['code'];
?>
```
Note that this script runs from the command line & will need modifications to be running as a webpage. Execute this script using:
```bash
php send_email.php
```

When you run the script for the first time, you'll get an authorization link from CLI. Open this link on the browser of your choice & log in to the account you want to send emails from. Remember, this account needs to be the same as the one you entered in the `From: ` field of your email earlier. After logging in & clicking "Approve" you'll be sent to redirect URI & the code will be displayed on http://localhost/project-path/ assuming you followed above steps.

Paste this code on the CLI & two things will happen:
1. A `token.json` file will be created at the `$tokenPath` location
2. The emails are sent.

From the next time onwards you execute the script, you won't have to follow the same login process again. The `access_token` and `refresh_token` will be used by the client library for authorization.

On ending notes, you can also try out PHPMailer [Using Gmail with XOAuth2](https://github.com/PHPMailer/PHPMailer/wiki/Using-Gmail-with-XOAUTH2) to combine mail utilities offered by PHPMailer with OAuth from Google API Client.
