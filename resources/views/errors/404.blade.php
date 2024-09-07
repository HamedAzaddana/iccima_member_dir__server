<!DOCTYPE html>
<html>
<?php
$font_family = iccima_get_sess_lang() == "Persian" ? "iran_sans" : "system-ui";
$direction = iccima_get_sess_lang() == "Persian" ? "rtl" : "ltr";
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{___elic("404.tab_title")}}</title>
    <link rel="shortcut icon" href="https://service.tccim.ir/css/favicon.png">
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet");

        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700");

        @font-face {
            font-family: "iran_sans";
            font-display: block;
            src: local("IRANSansWeb_Light"),
                url("/fonts/IRANSansWeb_Light.ttf") format("truetype"), url("/fonts/IRANSansWeb_Light.otf") format("opentype");
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            overflow: hidden;
            background-color: #f4f6ff;
        }

        .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "{{$font_family}}";
            position: relative;
            left: 6vmin;
            text-align: center;
        }

        .cog-wheel1,
        .cog-wheel2 {
            transform: scale(0.7);
        }

        .cog1,
        .cog2 {
            width: 40vmin;
            height: 40vmin;
            border-radius: 50%;
            border: 6vmin solid #f3c623;
            position: relative;
        }


        .cog2 {
            border: 6vmin solid #4f8a8b;
        }

        .top,
        .down,
        .left,
        .right,
        .left-top,
        .left-down,
        .right-top,
        .right-down {
            width: 10vmin;
            height: 10vmin;
            background-color: #f3c623;
            position: absolute;
        }

        .cog2 .top,
        .cog2 .down,
        .cog2 .left,
        .cog2 .right,
        .cog2 .left-top,
        .cog2 .left-down,
        .cog2 .right-top,
        .cog2 .right-down {
            background-color: #4f8a8b;
        }

        .top {
            top: -14vmin;
            left: 9vmin;
        }

        .down {
            bottom: -14vmin;
            left: 9vmin;
        }

        .left {
            left: -14vmin;
            top: 9vmin;
        }

        .right {
            right: -14vmin;
            top: 9vmin;
        }

        .left-top {
            transform: rotateZ(-45deg);
            left: -8vmin;
            top: -8vmin;
        }

        .left-down {
            transform: rotateZ(45deg);
            left: -8vmin;
            top: 25vmin;
        }

        .right-top {
            transform: rotateZ(45deg);
            right: -8vmin;
            top: -8vmin;
        }

        .right-down {
            transform: rotateZ(-45deg);
            right: -8vmin;
            top: 25vmin;
        }

        .cog2 {
            position: relative;
            left: -10.2vmin;
            bottom: 10vmin;
        }

        h1 {
            color: #142833;
        }

        .first-four {
            position: relative;
            left: 6vmin;
            font-size: 40vmin;
        }

        .second-four {
            position: relative;
            right: 18vmin;
            z-index: -1;
            font-size: 40vmin;
        }

        .wrong-para {
            font-family: "{{$font_family}}";
            position: absolute;
            bottom: 15vmin;
            padding: 3vmin 12vmin 3vmin 3vmin;
            font-weight: 600;
            color: #092532;
            text-align: center;
            direction: {{$direction}} !important;
        }

        body {
            background: #f9f390;
        }

        .link_home {
            color: white;
            text-decoration: none;
            font-size: 15px;
            background: #5677bc;
            padding: 8px;
            max-width: 20px;
            border-radius: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="first-four">4</h1>
        <div class="cog-wheel1">
            <div class="cog1">
                <div class="top"></div>
                <div class="down"></div>
                <div class="left-top"></div>
                <div class="left-down"></div>
                <div class="right-top"></div>
                <div class="right-down"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>

        <div class="cog-wheel2">
            <div class="cog2">
                <div class="top"></div>
                <div class="down"></div>
                <div class="left-top"></div>
                <div class="left-down"></div>
                <div class="right-top"></div>
                <div class="right-down"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
        </div>
        <h1 class="second-four">4</h1>
        <p class="wrong-para">
            {{___elic("404.title_1")}} <br>
            {{___elic("404.title_2")}}
            <br> <br>
            <a class="link_home" href="{{url('')}}">{{___elic("404.home")}}</a>
        </p>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js"></script>
    <script>
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();
        let t3 = gsap.timeline();

        t1.to(".cog1", {
            transformOrigin: "50% 50%",
            rotation: "+=360",
            repeat: -1,
            ease: Linear.easeNone,
            duration: 8
        });

        t2.to(".cog2", {
            transformOrigin: "50% 50%",
            rotation: "-=360",
            repeat: -1,
            ease: Linear.easeNone,
            duration: 8
        });

        t3.fromTo(".wrong-para", {
            opacity: 0
        }, {
            opacity: 1,
            duration: 1,
            stagger: {
                repeat: -1,
                yoyo: true
            }
        });
    </script>
</body>

</html>