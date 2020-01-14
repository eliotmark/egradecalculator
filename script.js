function calculateCurrentGrade() {
    // Calculates averages of each category.
    var hwGrades = document.getElementById("homeworkGrades").value;
    var hwArray = convertToArray(hwGrades);
    var hwAvg = averageOfArray(hwArray);
    console.log(hwAvg);

    var cwGrades = document.getElementById("classworkGrades").value;
    var cwArray = convertToArray(cwGrades);
    var cwAvg = averageOfArray(cwArray);
    console.log(cwAvg);

    var tstGrades = document.getElementById("testGrades").value;
    var tstArray = convertToArray(tstGrades);
    var tstAvg = averageOfArray(tstArray);
    console.log(tstAvg);

    var participGrades = document.getElementById("participationGrades").value;
    var participArray = convertToArray(participGrades);
    var participAvg = averageOfArray(participArray);
    console.log(participAvg);

    var projGrades = document.getElementById("projectGrades").value;
    var projArray = convertToArray(projGrades);
    var projAvg = averageOfArray(projArray);
    console.log(projAvg);

    // Calculates weights of each category.
    var hwWeight = (parseInt(document.getElementById("homeworkWeight").value))/100;
    var cwWeight = (parseInt(document.getElementById("classworkWeight").value))/100;
    var tstWeight = (parseInt(document.getElementById("testWeight").value))/100;
    var participWeight = (parseInt(document.getElementById("participationWeight").value))/100;
    var projWeight = (parseInt(document.getElementById("projectWeight").value))/100;
    var finWeight = (parseInt(document.getElementById("finalWeight").value))/100;
    var sumOfAllWeights = hwWeight + cwWeight + tstWeight + participWeight + projWeight + finWeight;

    // Checks to see if the weights add up to 1 and if there are only numbers inserted.
    var message = "";
    if(sumOfAllWeights != 1 || isNaN(finWeight)) {
        message = "The percents you inserted do not add up to 100% or the weight you inserted is not a number. Please enter valid numbers.";
        document.getElementById("currentGrade").innerHTML = message;
        document.getElementById("finalGradeNeeded").innerHTML = message;
    }else{
        // Calculates end grade of each category.
        var endHw = hwAvg * hwWeight;
        var endCw = cwAvg * cwWeight;
        var endTst = tstAvg * tstWeight;
        var endParticip = participAvg * participWeight;
        var endProj = projAvg * projWeight;

        // Calculates the total grade.
        var numberOfCurrentGrade = ((endHw + endCw + endTst + endParticip + endProj)/(100 - (finWeight*100))) * 100;
        if(isNaN(numberOfCurrentGrade)) {
            message = "The percents you inserted do not add up to 100% or the grade you inserted is not a number. Please enter valid numbers.";
            document.getElementById("currentGrade").innerHTML = message;
        }else {
            // Rounds to 2 decimal places.
            numberOfCurrentGrade = numberOfCurrentGrade.toFixed(2);
            console.log(numberOfCurrentGrade);
            document.getElementById("currentGrade").innerHTML = "Your current grade is " + numberOfCurrentGrade + "."
        }
    }
    return numberOfCurrentGrade;
}

// Converts string of numbers to an array.
function convertToArray(str) {
    var arr = str.split(",");
    for(var i=0; i<arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    console.log(arr);
    return arr;
}

// Finds the average of the array of numbers.
function averageOfArray(arr) {
    var total = 0;
    for(var i=0; i<arr.length; i++) {
        total = total + arr[i];
    }
    var average = total/(arr.length);
    return average;
}

// Calculates the final exam grade needed.
function calculateFinalExamGrade() {
    var message = "";
    // FORMULA: 𝐹=𝐺−((1−𝑤)×𝐶)/𝑤
    var C = calculateCurrentGrade();
    var G = parseInt(document.getElementById("desiredGrade").value);
    var w = (parseInt(document.getElementById("finalWeight").value))/100;

    // The next 4 lines calculate the final exam grade needed to reach the user's goal in the class.
    var first = 1-w;
    var second = first*C;
    var third = G-second;
    var fourth = third/w;

    var finalGrade = fourth;
    finalGrade = finalGrade.toFixed(2);

    if(determineCorrectWeights() != 1) {
        var message = "The percents you inserted do not add up to 100% or the weight you inserted is not a number. Please enter valid numbers.";
        document.getElementById("finalGradeNeeded").innerHTML = message;
    }else {
        document.getElementById("finalGradeNeeded").innerHTML = "You need to get a " + finalGrade + "% on your final " +
            "exam to get a " + G + "% in your class. Good luck!"
    }
}

// Calculates weights of each category.
function determineCorrectWeights() {
    var hwWeight = (parseInt(document.getElementById("homeworkWeight").value))/100;
    var cwWeight = (parseInt(document.getElementById("classworkWeight").value))/100;
    var tstWeight = (parseInt(document.getElementById("testWeight").value))/100;
    var participWeight = (parseInt(document.getElementById("participationWeight").value))/100;
    var projWeight = (parseInt(document.getElementById("projectWeight").value))/100;
    var finWeight = (parseInt(document.getElementById("finalWeight").value))/100;
    var sumOfAllWeights = hwWeight + cwWeight + tstWeight + participWeight + projWeight + finWeight;

    return sumOfAllWeights;
}

// Resets all the information.
function reset() {
    var inputs = document.getElementsByTagName("input");
    console.log(inputs);
    for(var i=0; i<inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("finalGradeNeeded").innerHTML = '';
    document.getElementById("currentGrade").innerHTML = '';
}