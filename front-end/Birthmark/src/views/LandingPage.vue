<template>
    <div class="main-landing-container">
        <!-- <HeaderSection /> -->
        <header>
            <header-section />
        </header>

        <!-- >>>> first container <<<< -->
        <div class="first-container">
            <div class="first-info">
                <h1>Birthday cards...</h1>
                <h2>a piece of cake!</h2>
            </div>
            <div class="design-first-1 landing-page-element">
            </div>
            <div class="design-first-2 landing-page-element"></div>
        </div>

        <div class="button-container">
            <div class="btn outlined animated landing" @click="checkLoggedinStatus('')">
                <p>Make Them Smile!</p>
            </div>
            <div class="btn outlined pro" @click="checkLoggedinStatus('pro')">
                <p>Do more with pro! <span> 🜲</span></p>
            </div>
        </div>

        <div class="border"></div>

        <!-- >>>>>>>>>>>>>>>> Second container <<<<<<<<<<<<<<<<<<< -->

        <div class="second-container">

            <div class="first-vid-container second-vid-containers">
                <div class="second-vid-info">
                    <h2>You Mark...</h2>
                </div>
                <div class="first-vid"></div>
            </div>

            <div class="third-vid-container second-vid-containers">
                <div class="third-vid">
                    <div class="second-vid-info">
                        <h2>We"ll send...</h2>
                    </div>
                    <video autoplay muted loop id="myVideo">
                        <source src="../../public/second_landing_vid3.mp4" type="video/mp4">
                    </video>
                </div>
            </div>

            <div class="second-vid-container second-vid-containers">
                <div class="second-vid">
                    <div class="second-vid-info">
                        <h2>the"ll love you...</h2>
                    </div>
                    <video autoplay muted loop id="myVideo">
                        <source src="../../public/second_landing_vid1_mp4.mp4" type="video/mp4">
                    </video>
                </div>
            </div>

            <div class="second-design-circle"></div>

            <div class="second-info-container">
                <div class="second-info">
                    <h2>
                        AS easy as 1 2 3!
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
export default {
    name: "LandingPage",
    components: {
        HeaderSection
    },
    data() { return { token: localStorage.getItem("token") } },
    methods: {
        checkLoggedinStatus(stat) {
            const token = stat ? this.proToken : this.token;
            if (token) {
                this.$router.push('/input')
            } else {
                this.$router.push(`/login`)
            }
        }
    }

}
</script>

<style scoped>
.main-landing-container {
    display: flex;
    flex-direction: column;
    height: 1132px;
    width: 100%;
}

.first-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    background: url(../../public/kids_colered_nobg.svg);
    background-size: cover;
    background-position: 185px;
    overflow-x: hidden;
    position: relative;
}

.landing-page-element {
    height: 100vh;
}

.first-info {
    font-family: 'Audiowide', sans-serif;
    font-size: 25px;
    font-weight: 50px;
    background-color: #666666;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: rgba(255, 255, 255, 0.5) 0px 3px 3px;
    position: absolute;
    left: 40px;
    top: 200px;
    z-index: 3;
    color: #653434;
}

.first-info h1 {
    font-size: 60px;
}

.design-first-1 {
    position: absolute;
    height: 600px;
    width: 600px;
    z-index: -1;
    border-radius: 50%;
    background: #ff7676c6;
    right: -260px;
    top: 130px;
}

.design-first-2 {
    background-color: #7fffe174;
    z-index: -1;
    position: absolute;
    height: 1000px;
    width: 1000px;
    left: -100px;
    top: 20px;
    border-radius: 50%;
}

.button-container {
    height: 400px;
    width: 1000px;
    border-radius: 50%;
    padding: 2rem;
    position: absolute;
    top: 85%;
    left: 170px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    transition: 0.3s all ease-in;
}


/* >>>>>>>>>>>>>>buttons<<<<<<<<<<<< */
.btn {
    overflow: hidden;
    position: relative;
    z-index: 0;
    text-decoration: none;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 17px;
    min-width: 13ch;
    padding: 15px 44px;
    border-radius: 2em;
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0.1, 1), transform 0.3s cubic-bezier(0.2, 0, 0.1, 1), box-shadow 0.5s ease, color 0.5s ease, background 0.5s ease;
    will-change: box-shadow, color, transform, opacity, background;
    background: #0981a5;
    box-shadow: inset 0 0 0 0.1em #0981a5, 0 0 0 rgba(124, 56, 216, 0);
}

.btn:hover {
    cursor: pointer;
}

.btn.outlined {
    display: inline-flex;
    background: none;
    color: #170b39;
}

.btn:after,
.btn:before {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none;
    top: 0;
    right: -50%;
    left: -50%;
    height: 0;
    padding-bottom: 200%;
    border-radius: 39%;
    border: unset;
    transition: transform 0s cubic-bezier(0.2, 0, 0.1, 1) 0.5s, opacity 0.5s cubic-bezier(0.2, 0, 0.1, 1);
    opacity: 0;
}

.btn:before {
    transform: translate3d(-10%, 4.8em, 0) rotate(330deg);
    background: linear-gradient(25deg, #02b8a9, rgba(150, 56, 216, 0));
}

.btn:after {
    transform: translate3d(10%, 4.8em, 0) rotate(0deg);
    background: linear-gradient(70deg, #9638d880, rgba(124, 56, 216, 0));
}

.btn.animation.landing::before,
.btn.animation.landing::after {
    height: 20px;
    background: url("../../public/arrow1.svg") center/89px no-repeat;
    content: "";
}

.btn:hover,
.btn:focus {
    transition: opacity 0.3s cubic-bezier(0.2, 0, 0.1, 1), transform 0.3s cubic-bezier(0.2, 0, 0.1, 1), box-shadow 2s ease, color 1.5s ease, background 1s ease 0.75s;
    background: #02b8a9;
    box-shadow: inset 0 0 0 0.1em #02b8a9, 0 0 1.75em #9638d880;
}

.btn:hover.outlined,
.btn:focus.outlined {
    color: white;
}

.btn:hover:before,
.btn:hover:after,
.btn:focus:before,
.btn:focus:after {
    transition: transform 2s ease 0s, opacity 0.2s ease;
    opacity: 1;
}

.btn:hover:before,
.btn:focus:before {
    transform: translate3d(-10%, -1em, 0) rotate(100deg);
}

.btn:hover:after,
.btn:focus:after {
    transform: translate3d(10%, -1em, 0) rotate(180deg);
}


.pro span {
    font-size: 20px;
}

.pro {
    padding: 15px 27px;
}

/* <<<<<<<<<<<<<<<< second- container >>>>>>>>>>>>>>>>>>> */

.second-container {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
    font-family: 'Audiowide', sans-serif;
    background: #7fffe174;
    text-shadow: 2px -2px 21px #cbced1, 1px 2px 4px #c6c6c6;


}

.border {
    width: 1250px;
    height: 50px;
    position: absolute;
    top: 99vh;
    /* background: yellow; */
    backdrop-filter: blur(10px);
}

.second-vid-info {
    text-align: center;
}

.second-info-container {
    width: 1250px;
    height: 1250px;
    background: #7fffe14e;
    border: 300px solid #7fffe18a;
    z-index: -1;
    position: absolute;
    top: -600px;
    right: -600px;
    border-radius: 50%;
    display: flex;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
}

.second-info {
    background: lightgreen;
    height: 200px;
    width: 100px;
    padding: 10px;
}

.second-vid-containers {
    height: 280px;
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border-radius: 50%;
    position: absolute;
    box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px rgb(172, 251, 233);
}

.first-vid-container {
    background-color: #ff7676;
    top: 10px;
    left: 0;

}

.first-vid {
    height: 150px;
    width: 210px;
    background: url(../../public/second_landing_vid1.gif);
    background-size: cover;
    border-radius: 50%;

}

.second-vid-container {
    background-color: #4cbde6;
    top: 57px;
    left: 411px;

}

.second-vid video {
    border-radius: 50%;
    height: 150px;
    width: 210px;
}


.third-vid-container {
    /* background-color: #ffd542; */
    background-color: #d9ebe1;
    top: 320px;
    left: 218px;

}


.third-vid video {
    border-radius: 50%;
    height: 150px;
    width: 210px;
}

.second-design-circle {
    position: absolute;
    bottom: -300px;
    left: -200px;
    height: 700px;
    width: 700px;
    border-radius: 50%;
    box-shadow: inset -4px -4px 6px -1px white, inset 2px 2px 8px -1px rgba(72, 79, 96, 0.5);
    border-color: rgba(255, 255, 255, 0);
    background: #02b8a954;
    z-index: -1;

}
</style>