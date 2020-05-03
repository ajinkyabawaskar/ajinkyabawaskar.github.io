<?php $starttime = microtime(true); ?>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Page Title Icon -->
    <link rel="shortcut icon" href="favicon.svg" type="image/svg">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- FontAwesome CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Font CSS -->
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <title>Ajinkya Bawaskar</title>
</head>

<body>
    <header class="sticky-top" id="navHeader">
        <!-- Fixed navbar -->
        <nav class="shadow-sm bg-white">
            <div class="container d-flex pr-4">
                <a class="ml-4 ml-sm-0" href="#">
                    <img src="favicon.svg" alt="Ajinkya Bawaskar" class="mr-4 py-3" width="24px">
                </a>
                <div class="d-flex align-items-center justify-content-end flex-fill">
                    <div class="">
                        <a href="" class="anchorText">About</a>
                    </div>
                    <div class="ml-4">
                        Work
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <main role="main">
        <section class="" id="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7">
                        <div class="mb-4 px-4 px-sm-0 display-6 d-flex">
                            Hey, I'm Ajinkya <div id="sayHi" class="pl-2">👋</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="bio">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7 d-flex align-items-center">
                        <div class="mb-4 px-4 px-sm-0 fs-half">
                            I am a Software Engineer based in <a href="https://goo.gl/maps/LX7jebuHv1BmzXp56" target="_blank" class="bioLink">
                                India</a>.
                            <br> Recently graduated in Computer Science and Engineering from <a href="http://www.sgbau.ac.in" target="_blank" class="bioLink">SGBA University</a>.
                            <br> Previously interned at <a href="http://www.demenew.com/" target="_blank" class="bioLink">DeMeNew</a> as Web Developer.
                            <br> I've worked on several projects with C, C++, Java, Python, PHP, JavaScript, HTML & CSS, and some that involve Arduino and Raspberry Pi.
                            <br> Focussed on consistently writing clean, scalable <a href="#projects" class="bioLink">code</a> that is well-documented, functional, responsive, and user-centric.
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-5 mb-3">
                        <div class=" px-4 px-sm-0">
                            <div class="card-img-top-bg shadow-lg">
                                <div class="card-holder d-none d-md-block">
                                    <img src="https://avatars0.githubusercontent.com/u/24762467?s=460&u=d11c5cea21731839ff28be521016e3255c6b1024&v=4" class="img-fluid rounded-circle profile" width="100px">
                                </div>
                                <div class="card-body  pt-md-0 ">
                                    <p class="card-text">
                                        I'd love to listen from you!
                                    </p>
                                    <button class="subsButton shadow-sm" id="connectBtn">🔗 Connect </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </section>
        <section id="projects" style="padding-top:60px">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 mb-3 p-0 px-3 px-sm-0">
                        <div class="card border-0">
                            <div class="card-title p-2 px-3 mt-2 d-flex" id="projectsTitle">
                                Projects
                                <div class="mx-2" id="projectAnimate">💾</div>
                            </div>
                            <div class="card-body p-0 pb-3 mt-2">
                                <div class="container-fluid">
                                    <div class="row ">
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Banko
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    A realtime multiplayer card game,
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="js" class="techUsed mr-2">JavaScript</span>
                                                        <span id="ajax" class="techUsed">Ajax</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a href="https://bankogame.online" target="_blank">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/BankoPHP?files=1">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2">
                                                <div class="title">
                                                    Corona Dashboard
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    One of the earliest coronavirus spread tracking websites specific to India.
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="python" class="techUsed mr-2">Python</span>
                                                        <span id="json" class="techUsed">JSON</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a class="offline">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/coronavirus-mohfw?files=1">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2">
                                                <div class="title">
                                                    Expense Tracker
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    Web based expense tracker with visualisation of expenditures.
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="php" class="techUsed mr-2">PHP</span>
                                                        <span id="js" class="techUsed">JavaScript</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a href="" class="">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/coronavirus-mohfw">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2">
                                                <div class="title">
                                                    Internship Portal
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    Web application for students to facilitate internship applications in college.
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="php" class="techUsed mr-2">PHP</span>
                                                        <span id="mySQL" class="techUsed">MySQL</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a href="" class="">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/coronavirus-mohfw">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2">
                                                <div class="title">
                                                    Quiz Mania
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    Platform to organise quizes based on multiple choice questions.
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="php" class="techUsed mr-2">PHP</span>
                                                        <span id="mySQL" class="techUsed">MySQL</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a href="" class="">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/coronavirus-mohfw">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2">
                                                <div class="title">
                                                    Crop Detector
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    Platform to organise quizes based on multiple choice questions.
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="php" class="techUsed mr-2">PHP</span>
                                                        <span id="mySQL" class="techUsed">MySQL</span>
                                                    </div>
                                                    <div class="d-flex">
                                                        <div id="projectLink" class="px-2">
                                                            <a href="" class="">
                                                                <i class="fa fa-hand-pointer-o" style="padding-right: 4px"></i> Demo
                                                            </a>
                                                        </div>
                                                        <div id="projectDemo" class="px-2">
                                                            <a href="https://github.com/ajinkyabawaskar/coronavirus-mohfw">
                                                                <i class="fa fa-code" style="padding-right: 4px"></i> Code
                                                            </a>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="card p-3 px-3 customBorder2">
                                                <?php
                                                    $log = fopen("log.json", "r") or die("Unable to open file!");
							echo "<pre>";
echo fread($log, filesize("log.json"));
echo "</pre>";
                                                    fclose($log);
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    </main>

    <footer class="footer mt-auto py-3">
        <div class="container text-center">
            <span class="text-muted">
                If you're reading this, you've reached the end of page. Thank you for stopping by! ❤
            </span>
        </div>
    </footer>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
    <?php
    $date = date("h:i:sa - d M Y, D");
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    $page_load =  number_format(microtime(true) - $starttime, 2);
    $server = ($_SERVER['SERVER_SOFTWARE']);
    $data = compact("date", "ip", "page_load", "server");
    echo '<script>console.log(' . json_encode($data) . ');</script>';
    ?>
</body>

</html>
