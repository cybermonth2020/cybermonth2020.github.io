(window.onload = function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" class="radiobtn${questionNumber}" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
      
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
        resultsContainer.innerHTML = '';
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'none';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        checkAnswer.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
      else{
        nextButton.style.display = 'none';
        checkAnswer.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }

    function showIfCorrect() {
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        checkAnswer.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        checkAnswer.style.display = 'none';
        submitButton.style.display = 'none';
      }
      var radios = document.getElementsByName('question' + currentSlide);
      for( i = 0; i < radios.length; i++ ) {
        radios[i].disabled = true;
        }

        const answerContainers = quizContainer.querySelectorAll('.answers');

        const answerContainer = answerContainers[currentSlide];
        const selector = `input[name=question${currentSlide}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === myQuestions[currentSlide].correctAnswer){
          // color the answers green
          answerContainers[currentSlide].style.color = 'green';
          switch(currentSlide) {
            case 0: explanationText='Way to go! This one was easy.\nIn this case the longest password is for sure the safest, the fact that it\'s not an easily guessable word also helps.';
              break;
            case 1: explanationText='That\'s correct! In general for two password that are of the same lenght the stronger password is the one with more charsets. In this case letters + digits is better than only letters.';
              break;
            case 2: explanationText='Good job! This one wasn\'t so easy.\nWhile we said before that letters + digits is better than letters only it is way better than using a common password followed by some digits. Always avoid common words.\nWhat are the common words? If it came to your mind in less than 1 minute it is a common word.\nAlso \'loveisstrong\' is a common password, love themed ones are one of the most used.';
              break;
            case 3: explanationText='Nice, you got it right!\nUppercase letters count as a different charset and as uppercase letters are 26 while digits only 10 it\'s way better to use lowercase + uppercase than lowercase + digits (better use all three in fact :D)';
              break;
            case 4: explanationText='Great! You got this one.\n Even if \'a\' seems way more complex (because it has more charsets) it\'s way shorter and it takes a shorter time to be hacket. This should make you reflect that strong passwords hasn\'t be random. You can create a strong password by concatenating some uncorrelated words together in order to make a long password easy to remember.\n MayTheForceBeWithYou is less safe because it is not a sequence of random words but a famous movie quote.';
              break;
            case 5: explanationText='Congratulations! \n This password is the one that uses all 4 charsets (lowecase, uppercase, digits, symbols) and is long enough to be considered safe.';
              break;
            default: explanationText='';
          }
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[currentSlide].style.color = 'red';
          switch(currentSlide) {
            case 0: explanationText='Wrong answer.\nIn this case the longest password is for sure the safest, the fact that it\'s not an easily guessable word also helps.';
              break;
            case 1: explanationText='Too bad, the right answer was a. In general for two password that are of the same lenght the stronger password is the one with more charsets. In this case letters + digits is better than only letters.';
              break;
            case 2: explanationText='Mmh... not quire right, the right answer is b.\nWhile we said before that letters + digits is better than letters only it is way better than using a common password followed by some digits. Always avoid common words.\nWhat are the common words? If it came to your mind in less than 1 minute it is a common word.\nAlso \'loveisstrong\' is a common password, love themed ones are one of the most used.';
              break;
            case 3: explanationText='Not quite right, the right answer is a.\nUppercase letters count as a different charset and, as uppercase letters are 26 while digits only 10, it\'s way better to use lowercase + uppercase than lowercase + digits (better use all three in fact :D)';
              break;
            case 4: explanationText='This was tricky, but the right answer is c.\n Even if \'a\' seems way more complex (because it has more charsets) it\'s way shorter and it takes a shorter time to be hacket. This should make you reflect that strong passwords hasn\'t be random. You can create a strong password by concatenating some uncorrelated words together in order to make a long password easy to remember.\n MayTheForceBeWithYou is less safe because it is not a sequence of random words but a famous movie quote.';
              break;
            case 5: explanationText='Wrong answer, you should have chosen c.\nThis password is the one that uses all 4 charsets (lowecase, uppercase, digits, symbols) and is long enough to be considered safe.';
              break;
            default: explanationText='';
          }
        }
        resultsContainer.innerHTML = explanationText;
    }
    
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "banana",
          b: "conciousness",
          c: "fantastic"
        },
        correctAnswer: "b"
      },
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "promise49",
          b: "clarity",
          c: "frequency"
        },
        correctAnswer: "a"
      },
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "loveisstrong",
          b: "ghixnzmaeton",
          c: "password1234",
          d: "387295729405"
        },
        correctAnswer: "b"
      },
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "steveTXUO",
          b: "steve1452",
          c: "1452steve",
        },
        correctAnswer: "a"
      },
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "aV5xSO3!4x43",
          b: "MayTheForceBeWithYou",
          c: "CoralMuseumLanternCrow",
        },
        correctAnswer: "c"
      },
      {
        question: "What is the strongest password between these?",
        answers: {
          a: "1234567890",
          b: "zaq12wsxcde345",
          c: "Zebra!394eaD",
          d: "Password......."
        },
        correctAnswer: "c"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const checkAnswer = document.getElementById("check")
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    checkAnswer.addEventListener("click", showIfCorrect);
    nextButton.addEventListener("click", showNextSlide);
  })();
  