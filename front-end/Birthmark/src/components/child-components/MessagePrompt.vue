<template>
    <div class="container" :class="{ 'fadeIn': isSuccessful }">
      {{ msg }}
    </div>
  </template>
  
  <script>
  export default {
      name: "MessagePrompt",
      props: {
          msg: String,
          isSuccessful: Boolean
      }
  
  }
  </script>
  
  <style scoped>
      .container{
          position: absolute;
          z-index: 3;
          height: 150px;
          width: 800px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 30px;
          font-weight: bold;
          color:#000000;
          background: linear-gradient(#4f4fe86b, #2ff82f79);
          border-radius: 10px;
          /* display: none; */
      }
  
      .fadeIn{
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeAway 5s linear;
          z-index: 3;
      }
  
      @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
      }
  </style>