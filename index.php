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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pixeden-stroke-7-icon@1.2.3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css">
    <!-- Font CSS -->
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
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
                        Blog
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
                            Hello World, I'm Ajinkya <div id="sayHi" class="pl-2">👋</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="bio">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7 d-flex align-items-center">
                        <div class="mb-4 px-4 px-sm-0 fs-half pr-6 pr-sm-6">
                            I am a Software Engineer based in <a href="https://goo.gl/maps/LX7jebuHv1BmzXp56" target="_blank" class="bioLink">
                                India</a>.
                            <br> Recently graduated in Computer Science and Engineering from <a href="http://www.sgbau.ac.in" target="_blank" class="bioLink">SGBA University</a>.
                            <br> Previously interned at <a href="http://www.demenew.com/" target="_blank" class="bioLink">DeMeNew</a> as Web Developer.
                            <br> I've worked on several projects with C, C++, Java, Python, PHP, JavaScript, HTML & CSS, and some that involve Arduino and Raspberry Pi.
                            <br> Focussed on consistently writing clean, scalable <a href="#projects" class="bioLink">code</a> that is well-documented, functional, responsive, and user-centric experiences.
                            <br>
                            <br>Currently: Working on Hexacopter UAV, Learning DSA from Coursera
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
                                    <button class="subsButton shadow-sm" id="connectBtn" onclick="goToConnect(this)">🔗 Connect </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        <section id="projects" class="sectionTitle">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 p-0 px-3 px-sm-0">
                        <div class="card border-0">
                            <div class="card-title p-2 px-3 mt-2 d-flex" id="projectsTitle">
                                Projects
                                <div class="mx-2" id="projectAnimate">💾</div>
                            </div>
                            <div class="card-body p-0 mt-2">
                                <div class="container-fluid">
                                    <div class="row ">
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Banko 🃏
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    A realtime multiplayer card game meant to cure boredom
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
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Corona Dashboard 🦠
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
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Expense Tracker 📈
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
                                        <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Crop Detector 👨‍🌾
                                                </div>
                                                <div class="projectDescription mb-3">
                                                    Detects presence of crop in given image using K means classification
                                                </div>
                                                <div class="projectDemo d-flex justify-content-between wrap">
                                                    <div class="d-flex">
                                                        <span id="python" class="techUsed">Python</span>
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
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
                                                <div class="title">
                                                    Internship Portal 👨‍🎓
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
                                        <!-- <div class="col-md-6 col-lg-4 mb-4">
                                            <div class="card p-3 px-3 customBorder2 h-100 d-flex justify-content-center">
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
                                        </div> -->

                                        <div class="col-md-6 col-lg-4 mb-4" id="morePro">
                                            <div class="card p-3 px-3 customBorder3 pl-4 h-100 d-flex justify-content-center">
                                                <div class="d-flex">
                                                    <div class="moreProjects w-100">
                                                        <div class="display-4 pb-2 fs-2" id="moreText">
                                                            More
                                                        </div>
                                                        <div class="projectDescription ">
                                                            Explore all projects
                                                        </div>
                                                    </div>
                                                    <div class="moreArrow d-flex justify-content-end align-items-center w-100">
                                                        <i class="pe-7s-right-arrow" id="arrow" style="font-size: 3rem; padding-right: 10px; color:#4640ff"></i>
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
            </div>
        </section>
        <section id="skills" class="sectionTitle">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 mb-3 p-0 px-3 px-sm-0">
                        <div class="card border-0 ">
                            <div class="card-title p-2 px-3 mt-2 d-flex" id="projectsTitle">
                                Skills
                                <div class="mx-2" id="skillsAnimate">🤹</div>
                            </div>
                            <div class="card-body p-0 pb-3 mt-2 ">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-3 mb-3" id="programmingCard">
                                            <div class="card p-3 customBorder4 h-100 d-flex ">
                                                <i class="pe-7s-box2 pe-lg pb-2"></i>
                                                <div class="skillText" id="programmingTitle">
                                                    Programming
                                                </div>
                                                <div id="programmingSkills" class="d-none">
                                                    C · C++ · Java · Python · PHP
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 mb-3">
                                            <div class="card p-3 customBorder4 h-100 d-flex" id="devopsCard">
                                                <i class="pe-7s-config pe-lg pb-2"></i>
                                                <div class="skillText" id="devopsTitle">
                                                    Tools and Services
                                                </div>
                                                <div id="devopsSkills" class="d-none">
                                                    Azure DevOps · AWS EC2 · Git
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 mb-3">
                                            <div class="card p-3 customBorder4 h-100 d-flex" id="communicationCard">
                                                <i class="pe-7s-micro pe-lg pb-2 "></i>
                                                <div class="skillText" id="communicationTitle">
                                                    Communication
                                                </div>
                                                <div id="communicationSkills" class="d-none">
                                                    Soft Skills · Public Speaking
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3 mb-3">
                                            <div class="card p-3 customBorder4 h-100 d-flex" id="designCard">
                                                <i class="pe-7s-graph1 pe-lg pb-2 "></i>
                                                <div class="skillText" id="designTitle">
                                                    Design
                                                </div>
                                                <div id="designSkills" class="d-none">
                                                    Figma · Canva · Filmora
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
        <section id="certificates" class="sectionTitle">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 mb-3 p-0 px-3 px-sm-0">
                        <div class="card border-0 ">
                            <div class="card-title p-2 px-3 mt-2 d-flex" id="projectsTitle">
                                Certificates
                                <div class="mx-2" id="certificatesAnimate">📜</div>
                            </div>
                            <div class="card-body p-0 pb-3 mt-2 ">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-sm-4 mb-3 certificatesCard" id="cert1">
                                            <div class="card p-3 h-100 d-flex customBorder3 customBg2">
                                                <div class="certitificateTitle">
                                                    Machine Learning, ML
                                                </div>
                                                <div class="certiticateInsti">
                                                    KTH Royal Institute of Technology, Sweden
                                                </div>
                                                <div class="certificateHint">
                                                    NPTEL Online Course · 57% · April 2019
                                                </div>
                                                <div class="certificateLink">
                                                    <a class="cetificateAnchor" href="https://nptel.ac.in/content/noc/NOC19/SEM1/Ecertificates/106/noc19-cs35/Course/NPTEL19CS35S61810143191135271.jpg" target="_blank">
                                                        View
                                                    </a>
                                                    <i class="pe-7s-right-arrow pe-va ml-1 swift"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 mb-3 certificatesCard" id="cert2">
                                            <div class="card p-3 h-100 d-flex customBorder3 customBg2">
                                                <div class="certitificateTitle">
                                                    Big Data Computing
                                                </div>
                                                <div class="certiticateInsti">
                                                    Indian Institute of Technology, Patna
                                                </div>
                                                <div class="certificateHint">
                                                    NPTEL Online Course · 69% · April 2019
                                                </div>
                                                <div class="certificateLink">
                                                    <a class="cetificateAnchor" href="https://nptel.ac.in/content/noc/NOC19/SEM1/Ecertificates/106/noc19-cs33/Course/NPTEL19CS33S41810083191135271.jpg" target="_blank">
                                                        View
                                                    </a>
                                                    <i class="pe-7s-right-arrow pe-va ml-1 swift"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 mb-3 certificatesCard" id="cert3">
                                            <div class="card p-3 h-100 d-flex customBorder3 customBg2 justify-content-center">
                                                <div class="d-flex">
                                                    <div class="moreProjects w-100">
                                                        <div class="display-4 pb-2 fs-2" id="moreText">
                                                            Other
                                                        </div>
                                                        <div class="certificateDescription">
                                                            Certificates & Achievements
                                                        </div>
                                                    </div>
                                                    <div class="moreArrow d-flex justify-content-end align-items-center w-100">
                                                        <i class="pe-7s-right-arrow" id="arrow" style="font-size: 3rem; padding-right: 10px; color:#4640ff"></i>
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
            </div>
        </section>
        <section id="connect" class="sectionTitle">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 p-0 px-3 px-sm-0 py-3" id="connectSection">
                        <div class="d-flex flex-column px-3 pb-4">
                            <div class="connectTitle py-1 text-center">
                                Connect
                                <br>
                                <div class="text-muted text-white fs-1">I'm always happy to chat. 🙋‍♂️</div>
                            </div>
                            <hr class="white-row" style="width:50%">
                            <!-- <div class="mx-2" id="projectAnimate">🔗</div> -->
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-4  mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="email">
                                            Email
                                            <!-- <small>ajinkyabawaskar2@gmail.com</small> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="linkedin">
                                            LinkedIn
                                        </div>
                                    </div>
                                    <div class="col-md-4  mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="whatsapp">
                                            WhatsApp
                                        </div>
                                    </div>
                                    <div class="col-md-4  mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="facebook">
                                            Facebook
                                        </div>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="twitter">
                                            Twitter
                                        </div>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <div class="card text-dark p-2 pb-4 rounded-xl " id="instagram">
                                            Instagram
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="white-row">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-white text-center">
                                            <i class="pe-7s-quote"></i>
                                            <div class="setup">
                                                Programming Joke
                                            </div>
                                            <div class="punchline">
                                                Punchline 😂
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
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <span id="ip"></span>
                </div>
                <div class="col-md-6">
                    Hi
                </div>
            </div>

            <span class="text-muted">

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
    $log = fopen("log.json", "r") or die("Unable to open file!");
    $json = fread($log, filesize("log.json"));
    echo "<script>console.log(" . $json . ".after.substr(0, 7))</script>";
    fclose($log);
    ?>
</body>

</html>