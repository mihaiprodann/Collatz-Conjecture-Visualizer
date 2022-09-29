var pressed = false;


const generateCollatzNumber = () => {
    var number = Number(document.querySelector('input').value);
    if(pressed == false && Number.isInteger(number))
    {
        pressed = true;
        document.getElementById("btnAction").innerText = "Reset";
        document.getElementById("collatzNumber").disabled = true;
    }
    else if(pressed == true && Number.isInteger(number)) {
        location.reload();
    }

    var parity = "", algorithm_applied = "";
    var yCurrentVal = 0;
    var steps = 0, lastNumber = number;
    var initialNumber = number;
    var xValues = [0];
    var yValues = [number];
    if(number < 1)
    {
        return;
    }

    if(!Number.isInteger(number))
    {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Only integer numbers are allowed!',
        })
        return;
    }

    var table = document.getElementById("numbers_table");

    while(number != 1)
    {
        steps++;
        lastNumber = number;
        if(number % 2 == 0)
        {
            parity = "Even";
            algorithm_applied = number + " / 2 = " + number / 2;
            number /= 2;
        }
        else
        {
            parity = "Odd";
            algorithm_applied = number + " * 3 + 1 = "; 
            number = number * 3 + 1;
            algorithm_applied += number;
        }
        if(lastNumber > number && yCurrentVal > 0)
            xValues.push(--yCurrentVal);
        else if(yCurrentVal == 0 && lastNumber > number)
            xValues.push(0);
        else
            xValues.push(++yCurrentVal);
        yValues.push(number);

        var new_row = table.insertRow(steps);
        var step_cell = new_row.insertCell(0);
        var number_cell = new_row.insertCell(1);
        var parity_cell = new_row.insertCell(2);
        var algorithm_cell = new_row.insertCell(3);

        step_cell.innerText = steps;
        number_cell.innerText = lastNumber;
        parity_cell.innerText = parity;
        algorithm_cell.innerText = algorithm_applied;

    }

    var steps_text = "Using Collatz algorithm, you reach 1 from "+initialNumber+" in "+steps+" steps.";

    document.getElementById("steps-text").innerText = steps_text;
    document.getElementById("steps").classList.remove("hidden");
    document.getElementById("numbers_table").classList.remove("hidden");
    
    new Chart("context", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,255,255,1.0)",
                borderColor: "rgba(255,255,255,0.1)",
                data: yValues
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        display: false
                    }
                }],
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: false
                }
            }
        }
    });
    
}


